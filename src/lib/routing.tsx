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
  trouver: '/trouver',
  products: '/products',
  smartphones: '/products/smartphones',
  laptops: '/products/laptops',
  tablets: '/products/tablets',
  smartwatches: '/products/smartwatches',
  audio: '/products/audio',
  accessories: '/accessories',
  offres: '/offres',
  reprise: '/reprise',
  reparation: '/reparation',
  stores: '/stores',
  quality: '/quality',
  about: '/about',
  contact: '/contact',
  help: '/help',
  faq: '/faq',
  shipping: '/shipping',
  refund: '/refund',
  cgv: '/cgv',
  privacy: '/privacy',
  legal: '/legal',
  cookies: '/cookies',
  cart: '/cart',
  account: '/account',
  product: (slug: string) => `/p/${encodeURIComponent(slug)}`,
} as const

/** Ancien chemin listing smartphones → alias. */
export const LEGACY_SMARTPHONES = '/smartphones'

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
    const [pathname, search = ''] = url.split('?')
    const full = search ? `${pathname}?${search}` : pathname
    if (
      pathname === window.location.pathname &&
      (search ? `?${search}` : '') === window.location.search
    ) {
      window.scrollTo({ top: 0 })
      return
    }
    window.history.pushState({}, '', full)
    setPath(pathname)
    window.scrollTo({ top: 0 })
  }, [])

  const value = useMemo(() => ({ path, navigate }), [path, navigate])

  return (
    <RoutingContext.Provider value={value}>{children}</RoutingContext.Provider>
  )
}

export function useRouting() {
  const ctx = useContext(RoutingContext)
  if (!ctx) throw new Error('useRouting hors RoutingProvider')
  return ctx
}

export function Link({
  to,
  className,
  children,
  onNavigate,
  ariaLabel,
  onClick,
  ...rest
}: {
  to: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
  ariaLabel?: string
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void
} & Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  'href' | 'className' | 'children' | 'onClick'
>) {
  const { navigate } = useRouting()
  return (
    <a
      href={to}
      className={className}
      aria-label={ariaLabel}
      onClick={(e) => {
        onClick?.(e)
        if (e.defaultPrevented) return
        if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey || e.button !== 0)
          return
        e.preventDefault()
        navigate(to)
        onNavigate?.()
      }}
      {...rest}
    >
      {children}
    </a>
  )
}

const FR_PATH_MAP: Record<string, string> = {
  '/fr': ROUTES.home,
  '/fr/': ROUTES.home,
  '/en': ROUTES.home,
  '/en/': ROUTES.home,
  '/fr/trouver': ROUTES.trouver,
  '/fr/products': ROUTES.products,
  '/fr/products/smartphones': ROUTES.smartphones,
  '/fr/products/laptops': ROUTES.laptops,
  '/fr/products/tablets': ROUTES.tablets,
  '/fr/products/smartwatches': ROUTES.smartwatches,
  '/fr/products/audio': ROUTES.audio,
  '/fr/accessories': ROUTES.accessories,
  '/fr/offres': ROUTES.offres,
  '/fr/reprise': ROUTES.reprise,
  '/fr/reparation': ROUTES.reparation,
  '/fr/stores': ROUTES.stores,
  '/fr/quality': ROUTES.quality,
  '/fr/about': ROUTES.about,
  '/fr/contact': ROUTES.contact,
  '/fr/help': ROUTES.help,
  '/fr/faq': ROUTES.faq,
  '/fr/shipping': ROUTES.shipping,
  '/fr/refund': ROUTES.refund,
  '/fr/cgv': ROUTES.cgv,
  '/fr/privacy': ROUTES.privacy,
  '/fr/legal': ROUTES.legal,
  '/fr/cookies': ROUTES.cookies,
  '/fr/cart': ROUTES.cart,
  '/fr/account': ROUTES.account,
}

/** Résout les liens vers des chemins internes du site. */
export function stayLocal(href: string): string {
  if (!href) return '#'
  if (href.startsWith('#') || href.startsWith('tel:') || href.startsWith('mailto:'))
    return href
  if (href.startsWith('/')) {
    if (href.startsWith('/fr/') || href === '/fr') {
      const pathOnly = href.split('?')[0] ?? href
      if (FR_PATH_MAP[pathOnly]) return FR_PATH_MAP[pathOnly]
      if (pathOnly.includes('/products/smartphones')) return ROUTES.smartphones
      if (pathOnly.includes('/exclusivites/')) return ROUTES.offres
      return ROUTES.home
    }
    return href
  }
  try {
    const u = new URL(href, 'https://dbc-trouver.netlify.app')
    if (u.hostname.endsWith('dbcstore.fr') || u.hostname.includes('netlify.app')) {
      const pathOnly = u.pathname.replace(/\/$/, '') || '/'
      const key = pathOnly.startsWith('/fr') ? pathOnly : `/fr${pathOnly === '/' ? '' : pathOnly}`
      if (FR_PATH_MAP[key] || FR_PATH_MAP[`${key}/`]) {
        return FR_PATH_MAP[key] ?? FR_PATH_MAP[`${key}/`]!
      }
      if (pathOnly.includes('/smartphones')) return ROUTES.smartphones
      if (pathOnly.includes('/trouver')) return ROUTES.trouver
      if (pathOnly.includes('/exclusivites')) return ROUTES.offres
      if (pathOnly === '/' || pathOnly === '/fr' || pathOnly === '/en')
        return ROUTES.home
      return ROUTES.home
    }
  } catch {
    return '#'
  }
  if (/dbcstore\.fr/i.test(href)) return '#'
  return href
}

export function parseProductSlug(path: string): string | null {
  const m = path.match(/^\/p\/([^/]+)\/?$/)
  return m?.[1] ? decodeURIComponent(m[1]) : null
}

export function pathMatches(path: string, route: string) {
  return path === route || path.startsWith(`${route}/`) || path.startsWith(`${route}?`)
}
