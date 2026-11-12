interface SectionHeadingProps {
  eyebrow?: string
  title: string
  text?: string
  center?: boolean
  light?: boolean
  eyebrowClassName?: string
  titleClassName?: string
}

export default function SectionHeading({ eyebrow, title, text, center = true, light = false, eyebrowClassName, titleClassName }: SectionHeadingProps) {
  return (
    <div className={center ? 'text-center max-w-3xl mx-auto' : ''}>
      {eyebrow && <div className={light ? 'section-eyebrow !text-gold-400' : `section-eyebrow ${eyebrowClassName ?? ''}`}>{eyebrow}</div>}
      <h2 className={light ? 'section-title text-white' : `section-title ${titleClassName ?? ''}`}>{title}</h2>
      {text && <p className={light ? 'mt-5 text-white/80 leading-relaxed' : 'mt-5 text-gray-600 leading-relaxed'}>{text}</p>}
    </div>
  )
}
