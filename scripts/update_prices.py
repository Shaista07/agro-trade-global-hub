#!/usr/bin/env python3
"""
GTW Fresh — daily price & history updater.

Downloads the daily P.T.R. (price trend report) PDFs from APMC Azadpur (Delhi)
and produces two files at the repo root:

1. prices.json  — latest Maximum wholesale rate per commodity (base rate).
   The website computes customer prices from it via quantity-tier margins
   (see src/data/pricing.ts: 0–10 kg +30%, 10–20 +20%, 20–50 +15%, 50+ +10%).

2. history.json — per-commodity daily series of {date, max rate, arrival
   tonnage} for the last 45 report days, used by the website's "Mandi Bhav"
   trends chart and its volume-weighted moving-average forecast.

Commodities missing from a day's report keep their previous values; nothing
is ever deleted. On any failure the script exits non-zero and leaves both
files untouched, so the site keeps the last good data.
"""

import json
import re
import sys
import time
from datetime import date, datetime
from pathlib import Path

import requests
import urllib3

urllib3.disable_warnings()

BASE = "https://www.apmcazadpurdelhi.com"
LIST_URL = f"{BASE}/Home/current_bazar_rates"
DOWNLOAD_URL = f"{BASE}/Home/DownloadFile1"
ROOT = Path(__file__).resolve().parent.parent
PRICES_OUT = ROOT / "prices.json"
HISTORY_OUT = ROOT / "history.json"
HISTORY_DAYS = 45
POLITE_DELAY = 0.4  # seconds between PDF downloads during backfill

# our item id -> possible APMC commodity names
MAPPING: dict[str, list[str]] = {
    "potato": ["POTATO"],
    "onion": ["ONION"],
    "tomato": ["TOMATO"],
    "garlic": ["GARLIC", "LEHSUN"],
    "ginger": ["M.GINGER", "GINGER", "ADRAK"],
    "green-chilli": ["GREEN CHILLY", "GREEN CHILLI", "CHILLY", "HARI MIRCH"],
    "okra": ["LADY FINGER", "LADYFINGER", "BHINDI"],
    "bottle-gourd": ["GOURD", "BOTTLE GOURD", "LAUKI", "B.GOURD"],
    "bitter-gourd": ["BITTER GOURD", "KARELA"],
    "brinjal": ["BRINJAL", "BAINGAN"],
    "cauliflower": ["CAULIFLOWER", "CAULI FLOWER"],
    "cabbage": ["CABBAGE"],
    "carrot": ["CARROT", "GAJAR"],
    "green-peas": ["PEAS", "GREEN PEAS", "MATAR"],
    "spinach": ["SPINACH", "PALAK"],
    "coriander": ["CORIANDER", "DHANIYA"],
    "lemon": ["LEMON", "NIMBU"],
    "cucumber": ["CUCUMBER", "KHEERA"],
    "capsicum": ["CAPSICUM", "SHIMLA"],
    "pumpkin": ["PUMPKIN", "KADDU"],
    "french-beans": ["BEANS", "FRENCH BEANS"],
    "radish": ["RADISH", "MOOLI"],
    "ridge-gourd": ["TORI", "TORAI", "RIDGE GOURD", "RIDGEGOURD"],
    "beetroot": ["BEETROOT", "BEET ROOT", "CHUKANDAR"],
    "turnip": ["TURNIP", "SHALGAM"],
    "sweet-potato": ["SWEET POTATO", "SHAKARKANDI"],
    "arbi": ["ARBI", "COLOCASIA", "ARUM", "TARO"],
    "pointed-gourd": ["PARWAL", "POINTED GOURD"],
    "ivy-gourd": ["TINDORA", "IVY GOURD", "KUNDRU"],
    "drumstick": ["DRUMSTICK", "DRUM STICK", "SAHJAN"],
    "methi": ["METHI", "FENUGREEK"],
    "banana": ["BANANA", "KELA"],
    "apple": ["APPLE"],
    "mango": ["MANGO", "AAM"],
    "papaya": ["PAPAYA", "PAPITA"],
    "pomegranate": ["POMEGRANATE", "ANAR", "ANAAR"],
    "orange": ["ORANGE", "SANTRA", "MOSAMBI"],
    "guava": ["AMROOD", "GUAVA"],
    "grapes": ["GRAPES", "ANGOOR"],
    "watermelon": ["WATERMELON", "TARBOOJ"],
    "muskmelon": ["MUSKMELON", "KHARBUJA"],
    "pineapple": ["PINE APPLE", "PINEAPPLE"],
    "chikoo": ["CHIKOO", "CHICKOO", "SAPOTA", "CHEEKU"],
    "pear": ["PEAR", "NASHPATI"],
    "plum": ["PLUM", "ALOO BUKHARA"],
    "peach": ["PEACH", "AADU"],
    "litchi": ["LITCHI", "LYCHEE"],
    "kinnow": ["KINNOW"],
    "strawberry": ["STRAWBERRY"],
    "custard-apple": ["CUSTARD APPLE", "SITAPHAL", "SHARIFA"],
}

HEADERS = {"User-Agent": "Mozilla/5.0 (GTWFresh price bot)"}


def list_reports() -> list[tuple[str, str]]:
    """Return [(iso_date, file_id)] newest-first from the rates page."""
    html = requests.get(LIST_URL, verify=False, timeout=30, headers=HEADERS).text
    pairs = re.findall(
        r"(\d{2}/\d{2}/\d{4})[^0-9]{0,400}?DownloadFile\((\d+)\)", html
    )
    seen, out = set(), []
    for d, fid in pairs:
        iso = datetime.strptime(d, "%d/%m/%Y").date().isoformat()
        if iso not in seen:
            seen.add(iso)
            out.append((iso, fid))
    if not out:
        raise RuntimeError("no report links found on rates page")
    return out


def download_pdf(file_id: str) -> bytes:
    r = requests.post(
        DOWNLOAD_URL,
        data={"FileId": file_id},
        verify=False,
        timeout=60,
        headers=HEADERS,
    )
    r.raise_for_status()
    if "pdf" not in (r.headers.get("Content-Type") or "").lower():
        raise RuntimeError(f"unexpected content type: {r.headers.get('Content-Type')}")
    return r.content


def parse_report(pdf_bytes: bytes) -> dict[str, dict]:
    """{commodity: {"max": rate, "arr": arrival_tonnes}} from one P.T.R. PDF.

    Columns: S.No | Commodity | Arrival | Minimum | Maximum | Modal
    """
    import io

    import pdfplumber

    def num(cell) -> float:
        try:
            return float((cell or "").replace(",", "").strip())
        except (ValueError, AttributeError):
            return 0.0

    out: dict[str, dict] = {}
    with pdfplumber.open(io.BytesIO(pdf_bytes)) as pdf:
        for page in pdf.pages:
            for table in page.extract_tables():
                for row in table:
                    if not row or not row[0] or not row[0].strip().isdigit():
                        continue
                    name = re.sub(r"\s+", " ", (row[1] or "").strip().upper())
                    rate = num(row[4] if len(row) > 4 else None) or num(
                        row[5] if len(row) > 5 else None
                    )
                    if name and rate > 0:
                        out[name] = {
                            "max": rate,
                            "arr": num(row[2] if len(row) > 2 else None),
                        }
    return out


def map_day(report: dict[str, dict]) -> dict[str, dict]:
    """Map one day's APMC report onto our item ids."""
    day: dict[str, dict] = {}
    for item_id, names in MAPPING.items():
        hit = next((report[n] for n in names if n in report), None)
        if hit and 1 <= hit["max"] <= 1000:
            day[item_id] = {"max": round(hit["max"]), "arr": round(hit["arr"], 1)}
    return day


def load_json(path: Path, default):
    try:
        return json.loads(path.read_text())
    except Exception:  # noqa: BLE001
        return default


def main() -> int:
    try:
        reports = list_reports()
        print(f"{len(reports)} daily reports listed; latest = {reports[0][0]}")

        # ── history: download only the days we don't have yet ────────────
        history = load_json(HISTORY_OUT, {"items": {}}).get("items", {})
        have_dates = set()
        for series in history.values():
            have_dates.update(e["d"] for e in series)

        wanted = reports[:HISTORY_DAYS]
        missing = [(d, fid) for d, fid in wanted if d not in have_dates]
        print(f"history: {len(have_dates)} days cached, {len(missing)} to fetch")

        days: dict[str, dict] = {}  # iso_date -> {item_id: {max, arr}}
        for i, (d, fid) in enumerate(missing):
            try:
                rep = parse_report(download_pdf(fid))
                days[d] = map_day(rep)
                print(f"  [{i + 1}/{len(missing)}] {d}: {len(days[d])} items")
            except Exception as e:  # noqa: BLE001
                print(f"  [{i + 1}/{len(missing)}] {d}: skipped ({e})")
            time.sleep(POLITE_DELAY)

        if not days and not history:
            raise RuntimeError("no report data could be parsed at all")

        for d, day in days.items():
            for item_id, vals in day.items():
                series = history.setdefault(item_id, [])
                series.append({"d": d, "max": vals["max"], "arr": vals["arr"]})

        for item_id in list(history):
            series = {e["d"]: e for e in history[item_id]}
            history[item_id] = [series[d] for d in sorted(series)][-HISTORY_DAYS:]

        HISTORY_OUT.write_text(
            json.dumps({"updated": date.today().isoformat(), "items": history})
        )
        print(f"wrote history.json ({len(history)} items)")

        # ── prices.json from the newest available day ────────────────────
        latest_iso, latest_fid = wanted[0]
        if latest_iso in days:
            latest = days[latest_iso]
        else:
            latest = map_day(parse_report(download_pdf(latest_fid)))
        if len(latest) < 8:
            raise RuntimeError("latest report too sparse — refusing to update prices")

        previous = load_json(PRICES_OUT, {}).get("prices", {})
        prices: dict[str, dict] = {}
        for item_id in MAPPING:
            if item_id in latest:
                prices[item_id] = {"price": latest[item_id]["max"], "available": True}
            elif item_id in previous:
                prices[item_id] = previous[item_id]

        PRICES_OUT.write_text(
            json.dumps(
                {
                    "date": date.today().isoformat(),
                    "source": "APMC Azadpur maximum wholesale rates (base for tier margins)",
                    "prices": prices,
                },
                indent=2,
            )
        )
        print(f"wrote prices.json ({len(prices)} items, report date {latest_iso})")
        return 0
    except Exception as e:  # noqa: BLE001
        print(f"ERROR: {e}")
        return 1


if __name__ == "__main__":
    sys.exit(main())
