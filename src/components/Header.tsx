import {
  ArrowLeftRight,
  ChevronRight,
  Menu,
  Search,
  ShoppingCart,
  Smartphone,
  Store,
  Wrench,
  X,
} from 'lucide-react'
import { useEffect, useState, type MouseEvent, type ReactNode } from 'react'
import { createPortal } from 'react-dom'
import { Link, ROUTES } from '../lib/routing'
import { Logo } from './Logo'
import { Marquee } from './Marquee'

const NAV = [
  { label: 'Smartphones', href: ROUTES.smartphones },
  { label: 'PC Portables', href: '#' },
  { label: 'Tablettes', href: '#' },
  { label: 'Consoles', href: '#' },
  { label: 'Montres', href: '#' },
  { label: 'Audio', href: '#' },
  { label: 'Qualité', href: '#' },
]

const MENU_CATEGORIES = [
  { label: 'Smartphones', href: ROUTES.smartphones },
  { label: 'PC Portables', href: '#' },
  { label: 'Tablettes', href: '#' },
  { label: 'Consoles', href: '#', soon: true },
  { label: 'Montres', href: '#' },
  { label: 'Audio', href: '#' },
]

const MENU_LINKS = [
  { label: 'Standard DBC Labs', href: '#' },
  { label: 'Notre impact', href: '#' },
  { label: 'Nos adresses', href: '#' },
  { label: 'Contact', href: '#' },
  { label: 'FAQ', href: '#' },
  { label: 'Accessoires', href: '#' },
]

const BON_A_SAVOIR = [
  {
    title: 'Trouver mon téléphone',
    subtitle: '3 questions, on vous le met de côté',
    href: ROUTES.home,
    Icon: Smartphone,
  },
  {
    title: 'Revendre',
    subtitle: "Gagnez de l'argent avec votre ancien appareil",
    href: '#',
    Icon: ArrowLeftRight,
  },
  {
    title: 'Réparation',
    subtitle: 'Écran, batterie… estimez le prix',
    href: '#',
    Icon: Wrench,
  },
  {
    title: 'Disponibilité magasin',
    subtitle: 'Vérifiez en temps réel la dispo près de chez vous',
    href: '#',
    Icon: Store,
  },
]

function LocalNavLink({
  href,
  className,
  children,
  onNavigate,
  ariaLabel,
}: {
  href: string
  className?: string
  children: ReactNode
  onNavigate?: () => void
  ariaLabel?: string
}) {
  if (href.startsWith('/') && href !== '#') {
    return (
      <Link
        to={href}
        className={className}
        ariaLabel={ariaLabel}
        onNavigate={onNavigate}
      >
        {children}
      </Link>
    )
  }
  return (
    <a
      href="#"
      className={className}
      aria-label={ariaLabel}
      onClick={(e: MouseEvent<HTMLAnchorElement>) => {
        e.preventDefault()
        onNavigate?.()
      }}
    >
      {children}
    </a>
  )
}

function SearchTrigger({ className = '' }: { className?: string }) {
  return (
    <Link
      to={ROUTES.smartphones}
      className={`flex h-10 w-full items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-white ${className}`}
      ariaLabel="Rechercher un produit"
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">Rechercher un produit</span>
    </Link>
  )
}

function MobileMenu({ onClose }: { onClose: () => void }) {
  useEffect(() => {
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [])

  return createPortal(
    <div
      className="fixed inset-0 z-[9999] bg-white lg:hidden"
      role="dialog"
      aria-modal="true"
      aria-label="Menu"
    >
      <div className="flex h-dvh flex-col">
        <div className="flex shrink-0 items-center justify-between border-b border-gray-100 px-5 py-3">
          <div className="h-10 w-10" aria-hidden="true" />
          <span className="text-[17px] font-bold text-gray-900" />
          <button
            type="button"
            className="flex h-10 w-10 items-center justify-center rounded-full border border-gray-200"
            aria-label="Fermer"
            onClick={onClose}
          >
            <X className="h-5 w-5 text-gray-700" aria-hidden="true" />
          </button>
        </div>

        <div className="relative min-h-0 flex-1 overflow-hidden">
          <div className="absolute inset-0 overflow-y-auto">
            <nav className="px-5 pt-4 pb-8">
              <p className="mb-3 text-[13px] font-medium uppercase tracking-wide text-gray-400">
                Bon à savoir
              </p>
              <div className="mb-5 flex flex-col gap-3">
                {BON_A_SAVOIR.map(({ title, subtitle, href, Icon }) => (
                  <LocalNavLink
                    key={title}
                    href={href}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                    onNavigate={onClose}
                  >
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
                      <Icon
                        className="h-4 w-4 text-gray-600"
                        aria-hidden="true"
                      />
                    </div>
                    <div>
                      <p className="text-[15px] font-semibold text-gray-900">
                        {title}
                      </p>
                      <p className="text-[13px] text-gray-500">{subtitle}</p>
                    </div>
                  </LocalNavLink>
                ))}
              </div>

              <div className="mb-1 border-t border-gray-100" />

              {MENU_CATEGORIES.map((item) =>
                item.soon ? (
                  <button
                    key={item.label}
                    type="button"
                    disabled
                    className="flex w-full cursor-not-allowed items-center justify-between py-4 text-left opacity-50"
                  >
                    <span className="flex items-center gap-2 text-[17px] font-semibold text-gray-900">
                      {item.label}
                      <span className="rounded-full bg-gray-100 px-2 py-0.5 text-[11px] font-medium text-gray-500">
                        Bientôt
                      </span>
                    </span>
                  </button>
                ) : (
                  <LocalNavLink
                    key={item.label}
                    href={item.href}
                    className="flex w-full items-center justify-between py-4 text-left"
                    onNavigate={onClose}
                  >
                    <span className="flex items-center gap-2 text-[17px] font-semibold text-gray-900">
                      {item.label}
                    </span>
                    <ChevronRight
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </LocalNavLink>
                ),
              )}

              <div className="my-3 border-t border-gray-100" />

              {MENU_LINKS.map((link) => (
                <LocalNavLink
                  key={link.label}
                  href={link.href}
                  className="block py-4 text-[17px] font-semibold text-gray-900"
                  onNavigate={onClose}
                >
                  {link.label}
                </LocalNavLink>
              ))}
            </nav>
          </div>
        </div>

        <div className="shrink-0 border-t border-gray-100 px-5 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-5">
              <a
                href="https://www.instagram.com/dbcelectronicsfrance/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Instagram"
                className="text-gray-800 hover:text-gray-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  className="h-5 w-5"
                >
                  <rect x="2" y="2" width="20" height="20" rx="5" />
                  <circle cx="12" cy="12" r="5" />
                  <circle
                    cx="17.5"
                    cy="6.5"
                    r="1.5"
                    fill="currentColor"
                    stroke="none"
                  />
                </svg>
              </a>
              <a
                href="https://www.tiktok.com/@dbcfrance"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="TikTok"
                className="text-gray-800 hover:text-gray-500"
              >
                <svg
                  viewBox="0 0 24 24"
                  fill="currentColor"
                  className="h-5 w-5"
                >
                  <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
                </svg>
              </a>
            </div>
            <LocalNavLink
              href="#"
              className="text-sm font-medium text-gray-900 hover:text-gray-500"
              onNavigate={onClose}
            >
              Mon compte
            </LocalNavLink>
          </div>
        </div>
      </div>
    </div>,
    document.body,
  )
}

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="sticky top-0 z-40 bg-white shadow-sm transition-all duration-300"
      style={{ paddingTop: 'var(--sat)' }}
    >
      <div
        className="pointer-events-none absolute inset-x-0 top-0 z-50 bg-primary"
        style={{ height: 'var(--sat)' }}
      />
      <Marquee />
      <header className="relative border-b border-gray-200/50 transition-colors duration-300">
        <div className="mx-auto max-w-7xl px-4">
          <div className="flex h-16 items-center justify-between gap-3 lg:h-20 lg:gap-6">
            <div className="flex items-center lg:hidden">
              <button
                type="button"
                className="p-2.5 text-gray-900 transition-colors hover:text-gray-500"
                aria-label="Menu"
                onClick={() => setMenuOpen(true)}
              >
                <Menu className="h-6 w-6" aria-hidden="true" />
              </button>
            </div>

            <Link
              to={ROUTES.home}
              className="absolute left-1/2 flex shrink-0 -translate-x-1/2 items-center lg:relative lg:left-auto lg:translate-x-0"
              ariaLabel="DBC"
            >
              <Logo className="h-6 w-auto text-primary transition-colors duration-300 lg:h-8" />
              <span className="sr-only">DBC</span>
            </Link>

            <div className="hidden flex-1 justify-center lg:flex">
              <SearchTrigger className="max-w-xl" />
            </div>

            <div className="flex items-center gap-1 lg:gap-2">
              <LocalNavLink
                href="#"
                className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-900 transition-all hover:border-gray-900 hover:shadow-sm lg:flex"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
                Revendre
              </LocalNavLink>
              <LocalNavLink
                href="#"
                className="relative p-2.5 text-gray-900 transition-colors hover:text-gray-500"
                ariaLabel="Panier"
              >
                <ShoppingCart
                  className="h-6 w-6 lg:h-5 lg:w-5"
                  aria-hidden="true"
                />
              </LocalNavLink>
            </div>
          </div>

          <div className="pb-3 lg:hidden">
            <SearchTrigger />
          </div>

          <div className="hidden border-t border-gray-200/50 transition-colors duration-300 lg:flex lg:justify-center lg:py-1.5">
            <nav className="flex items-center gap-0.5">
              {NAV.map((item) => (
                <LocalNavLink
                  key={item.label}
                  href={item.href}
                  className="whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-gray-600 transition-all hover:text-gray-900"
                >
                  {item.label}
                </LocalNavLink>
              ))}
              <Link
                to={ROUTES.home}
                className="whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-primary transition-all hover:text-primary/80"
              >
                Trouver mon téléphone
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
    </div>
  )
}
