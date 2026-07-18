import riceImg from '../assets/rice.jpg'
import cashewImg from '../assets/cashew.jpg'
import spicesImg from '../assets/spices.jpg'
import pulsesImg from '../assets/pulses.jpg'
import teakImg from '../assets/teak.jpg'

export interface ProductVariety {
  name: string
  detail: string
}

export interface ProductCategory {
  id: string
  name: string
  short: string
  description: string
  image: string
  varieties: ProductVariety[]
  packaging: string
}

export const PRODUCT_CATEGORIES: ProductCategory[] = [
  {
    id: 'rice',
    name: 'Premium Rice',
    short: 'Export-grade rice from the finest paddy belts of India.',
    description:
      'Sourced from trusted mills across the Indo-Gangetic plains, our rice is cleaned, sortex-graded and packed to retain its natural aroma and grain length through the longest voyages.',
    image: riceImg,
    varieties: [
      { name: 'Basmati Rice (All Types)', detail: 'Extra-long fragrant grain — 1121, 1509, Pusa and traditional varieties' },
      { name: 'IR64 Parboiled Rice', detail: 'Premium long-grain, 5% broken, excellent cooking quality' },
      { name: 'Swarna Rice', detail: 'Aromatic medium-grain, ideal for everyday consumption' },
      { name: 'Sona Masoori Rice', detail: 'Light, fluffy medium-grain, a South Indian favourite' },
    ],
    packaging: '25 kg / 50 kg PP & jute bags, or buyer-branded retail packs',
  },
  {
    id: 'cashew',
    name: 'Raw Cashew Nuts',
    short: 'Machine-dried RCN from certified plantations.',
    description:
      'Our raw cashew nuts are procured from certified plantations, sun and machine dried to optimal moisture, and calibrated by size so processors get consistent outturn on every lot.',
    image: cashewImg,
    varieties: [
      { name: 'Grade W-180', detail: 'The "King of Cashews" — large, whole, premium kernels' },
      { name: 'Grade W-210', detail: 'Medium whole kernels for premium retail and gifting' },
      { name: 'Grade W-240', detail: 'Standard whole kernels with excellent taste and value' },
      { name: 'Cashew Splits', detail: 'Cost-effective grade for food processing and confectionery' },
    ],
    packaging: '80 kg jute bags (RCN) or 2 × 25 lb vacuum tins (kernels)',
  },
  {
    id: 'spices',
    name: 'Spices & Condiments',
    short: 'Bold, sun-cured Indian spices with full traceability.',
    description:
      'From high-curcumin turmeric to bold cardamom, every lot is cleaned, machine-dried and lab-tested for purity, volatile oil content and microbial safety before it leaves our warehouse.',
    image: spicesImg,
    varieties: [
      { name: 'Turmeric', detail: 'Fingers and powder — high curcumin, Erode & Sangli origin' },
      { name: 'Cumin Seeds', detail: 'Sortex-cleaned, 99% purity, bold grain' },
      { name: 'Green Cardamom', detail: '8 mm bold pods, rich green, high volatile oil' },
      { name: 'Black Pepper & Dry Red Chilli', detail: 'Bold pepper garbled; Guntur & Byadgi chillies, stemless on request' },
    ],
    packaging: '25 kg / 50 kg PP bags; consumer packs on request',
  },
  {
    id: 'pulses',
    name: 'Pulses & Lentils',
    short: 'Protein-rich dals, cleaned and sortex-graded.',
    description:
      'Machine-cleaned, sortex-graded pulses from central and northern India — uniform in size, low in moisture, and polished or unpolished as your market prefers.',
    image: pulsesImg,
    varieties: [
      { name: 'Chana Dal & Kabuli Chana', detail: 'Bold calibre, machine-cleaned, low admixture' },
      { name: 'Toor (Arhar) Dal', detail: 'Oiled or plain, premium unpolished available' },
      { name: 'Moong Dal & Whole Green Gram', detail: 'Bright, uniform grains for retail and processing' },
      { name: 'Masoor Dal & Whole Masoor', detail: 'Football and split varieties, rich colour' },
    ],
    packaging: '25 kg / 50 kg PP bags; retail pouches on request',
  },
  {
    id: 'teak',
    name: 'Teak Wood',
    short: 'Responsibly sourced timber for construction and furniture.',
    description:
      'We supply responsibly sourced teak with complete legal documentation — seasoned, graded and cut to specification for furniture makers, builders and importers.',
    image: teakImg,
    varieties: [
      { name: 'Teak Logs', detail: 'Selected girths and lengths, legally felled with transit permits' },
      { name: 'Sawn Timber & Planks', detail: 'Kiln-seasoned, uniform moisture, cut to order' },
      { name: 'Cut Sizes', detail: 'Custom dimensions for joinery, flooring and decking' },
      { name: 'Plantation Teak', detail: 'Sustainable plantation-grown timber with consistent grain' },
    ],
    packaging: 'Container loads, bundled and strapped; fumigation on request',
  },
]
