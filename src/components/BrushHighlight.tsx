import type { ReactNode } from 'react'

/** Surligneur brush `tache-1-highlight.svg` (titres home / badge DBC DEAL). */
export function BrushWord({
  children,
  className = '',
}: {
  children: ReactNode
  className?: string
}) {
  return (
    <span
      className={`relative inline-block ${className}`}
      style={{ isolation: 'isolate' }}
    >
      <span className="relative z-[2]">{children}</span>
      <span
        aria-hidden="true"
        data-brush-variant="title"
        className="pointer-events-none absolute"
        style={{
          zIndex: 1,
          top: '-5%',
          left: '-10px',
          right: '-10px',
          width: 'calc(100% + 20px)',
          height: '110%',
          backgroundImage: "url('/assets/taches/tache-1-highlight.svg')",
          backgroundSize: '100% 100%',
          backgroundRepeat: 'no-repeat',
          backgroundPosition: 'center',
        }}
      />
    </span>
  )
}

export function DealBadge() {
  return (
    <span
      data-featured-deal-badge="true"
      className="absolute top-0 left-0 z-10 inline-flex h-[19px] w-fit min-w-[76px] max-w-[88px] items-center justify-center px-1.5 font-display text-[10px] leading-none font-extrabold tracking-[0.035em] text-[#034638] uppercase whitespace-nowrap sm:h-[21px]"
      style={{
        backgroundImage: "url('/assets/taches/tache-1-highlight.svg')",
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
        backgroundSize: '100% 100%',
      }}
    >
      DBC DEAL
    </span>
  )
}
