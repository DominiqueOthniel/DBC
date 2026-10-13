import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type MouseEvent,
  type ReactNode,
} from 'react'

export const ROUTES = {
  home: '/',
  smartphones: '/smartphones',
  product: (slug: string) => `/p/${encodeURIComponent(slug)}`,
} as const

type RoutingValue = {
  path: string
  navigate: (to: string) => void
}

const RoutingContext = createContext<RoutingValue | null>(null)

export function RoutingProvider({ children }: { children: ReactNode }) {
  const [path, setPath] = useState(() =>
    typeof window === 'undefined' ? '/' : window.location.pathname,
  )

  useEffect(() => {
    const onPop = () => setPath(window.location.pathname)
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  const navigate = useCallback((to: string) => {
    const url = to.startsWith('/') ? to : `/${to}`
    if (url === window.location.pathname) {
      window.scrollTo({ top: 0 })
      return
    }
    window.history.pushState({}, '', url)
    setPath(url)
    window.scrollTo({ top: 0 })
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])

  return (
    <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
  )
}

export function useRouting() {
  const ctx = useContext(RoutingContext)
  if (!ctx) {
    throw new Error('useRouting requires RoutingProvider')
  }
  return ctx
}

type LinkProps = {
  to: string
  className?: string
  children: ReactNode
  ariaLabel?: string
  onNavigate?: () => void
  'data-track'?: string
  'data-zone'?: string
}

export function Link({
  to,
  className,
  children,
  ariaLabel,
  onNavigate,
  ...rest
}: LinkProps) {
  const { navigate } = useRouting()

  function onClick(e: MouseEvent<HTMLAnchorElement>) {
    if (
      e.defaultPrevented ||
      e.button !== 0 ||
      e.metaKey ||
      e.ctrlKey ||
      e.shiftKey ||
      e.altKey
    ) {
      return
    }
    e.preventDefault()
    navigate(to)
    onNavigate?.()
  }

  return (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      onClick={onClick}
      {...rest}
    >
      {children}
    </a>
  )
}

/** Lien interne sûr: jamais dbcstore.fr. Chemins connus ou ancre locale. */
export function stayLocal(href: string): string {
  if (!href) return '#'
  if (href.startsWith('/') || href.startsWith('#')) return href
  if (href.startsWith('tel:') || href.startsWith('mailto:')) return href
  try {
    const u = new URL(href, 'https://dbc-trouver.netlify.app')
    if (u.hostname.endsWith('dbcstore.fr')) {
      if (u.pathname.includes('/smartphones')) return ROUTES.smartphones
      if (u.pathname.includes('/trouver') || u.pathname === '/fr' || u.pathname === '/fr/') {
        return ROUTES.home
      }
      return '#'
    }
  } catch {
    return '#'
  }
  // Réseaux sociaux et hors DBC: on bloque aussi les sorties accidentelles vers le site.
  if (/dbcstore\.fr/i.test(href)) return '#'
  return href
}

export function parseProductSlug(path: string): string | null {
  const m = path.match(/^\/p\/([^/]+)\/?$/)
  return m?.[1] ? decodeURIComponent(m[1]) : null
}
