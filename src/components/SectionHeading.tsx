interface SectionHeadingProps {
  eyebrow: string
  title: string
  subtitle?: string
  align?: 'left' | 'center'
  dark?: boolean
}

export default function SectionHeading({
  eyebrow,
  title,
  subtitle,
  align = 'center',
  dark = false,
}: SectionHeadingProps) {
  return (
    <div
      className={`reveal max-w-2xl ${align === 'center' ? 'mx-auto text-center' : ''}`}
    >
      <p
        className={`text-xs font-semibold uppercase tracking-[0.22em] ${
          dark ? 'text-leaf-300' : 'text-brand-500'
        }`}
      >
        {eyebrow}
      </p>
      <h2
        className={`mt-3 font-display text-3xl font-bold leading-tight sm:text-4xl ${
          dark ? 'text-cream' : 'text-brand-950'
        }`}
      >
        {title}
      </h2>
      {subtitle && (
        <p
          className={`mt-4 text-base leading-relaxed ${
            dark ? 'text-brand-200' : 'text-brand-700/80'
          }`}
        >
          {subtitle}
        </p>
      )}
    </div>
  )
}
