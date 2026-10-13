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
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Logo } from './Logo'
import { Marquee } from './Marquee'

const NAV = [
  { label: 'Smartphones', href: 'https://dbcstore.fr/fr/products/smartphones' },
  { label: 'PC Portables', href: 'https://dbcstore.fr/fr/products/laptops' },
  { label: 'Tablettes', href: 'https://dbcstore.fr/fr/products/tablets' },
  { label: 'Consoles', href: 'https://dbcstore.fr/fr/products/consoles' },
  { label: 'Montres', href: 'https://dbcstore.fr/fr/products/smartwatches' },
  { label: 'Audio', href: 'https://dbcstore.fr/fr/products/audio' },
  { label: 'Qualité', href: 'https://dbcstore.fr/fr/quality' },
]

const MENU_CATEGORIES = [
  {
    label: 'Smartphones',
    href: 'https://dbcstore.fr/fr/products/smartphones',
  },
  { label: 'PC Portables', href: 'https://dbcstore.fr/fr/products/laptops' },
  { label: 'Tablettes', href: 'https://dbcstore.fr/fr/products/tablets' },
  {
    label: 'Consoles',
    href: 'https://dbcstore.fr/fr/products/consoles',
    soon: true,
  },
  { label: 'Montres', href: 'https://dbcstore.fr/fr/products/smartwatches' },
  { label: 'Audio', href: 'https://dbcstore.fr/fr/products/audio' },
]

const MENU_LINKS = [
  { label: 'Standard DBC Labs', href: 'https://dbcstore.fr/fr/quality' },
  { label: 'Notre impact', href: 'https://dbcstore.fr/fr/about' },
  { label: 'Nos adresses', href: 'https://dbcstore.fr/fr/stores' },
  { label: 'Contact', href: 'https://dbcstore.fr/fr/contact' },
  { label: 'FAQ', href: 'https://dbcstore.fr/fr/faq' },
  { label: 'Accessoires', href: 'https://dbcstore.fr/fr/accessories' },
]

const BON_A_SAVOIR = [
  {
    title: 'Trouver mon téléphone',
    subtitle: '3 questions, on vous le met de côté',
    href: '/',
    Icon: Smartphone,
  },
  {
    title: 'Revendre',
    subtitle: "Gagnez de l'argent avec votre ancien appareil",
    href: 'https://dbcstore.fr/fr/reprise',
    Icon: ArrowLeftRight,
  },
  {
    title: 'Réparation',
    subtitle: 'Écran, batterie… estimez le prix',
    href: 'https://dbcstore.fr/fr/reparation',
    Icon: Wrench,
  },
  {
    title: 'Disponibilité magasin',
    subtitle: 'Vérifiez en temps réel la dispo près de chez vous',
    href: 'https://dbcstore.fr/fr/stock-magasin',
    Icon: Store,
  },
]

function SearchTrigger({ className = '' }: { className?: string }) {
  return (
    <a
      href="https://dbcstore.fr/fr"
      className={`flex h-10 w-full items-center gap-2.5 rounded-full border border-gray-200 bg-gray-50 px-4 text-sm text-gray-500 transition-colors hover:border-gray-300 hover:bg-white ${className}`}
      aria-label="Rechercher un produit"
    >
      <Search className="h-4 w-4 shrink-0" aria-hidden="true" />
      <span className="truncate">Rechercher un produit</span>
    </a>
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
                  <a
                    key={title}
                    href={href}
                    className="flex items-center gap-3 rounded-xl bg-gray-50 p-4 transition-colors hover:bg-gray-100"
                    onClick={onClose}
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
                  </a>
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
                  <a
                    key={item.label}
                    href={item.href}
                    className="flex w-full items-center justify-between py-4 text-left"
                    onClick={onClose}
                  >
                    <span className="flex items-center gap-2 text-[17px] font-semibold text-gray-900">
                      {item.label}
                    </span>
                    <ChevronRight
                      className="h-5 w-5 text-gray-400"
                      aria-hidden="true"
                    />
                  </a>
                ),
              )}

              <div className="my-3 border-t border-gray-100" />

              {MENU_LINKS.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  className="block py-4 text-[17px] font-semibold text-gray-900"
                  onClick={onClose}
                >
                  {link.label}
                </a>
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
            <a
              href="https://dbcstore.fr/fr/account"
              className="text-sm font-medium text-gray-900 hover:text-gray-500"
            >
              Mon compte
            </a>
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

            <a
              className="absolute left-1/2 flex shrink-0 -translate-x-1/2 items-center lg:relative lg:left-auto lg:translate-x-0"
              href="https://dbcstore.fr/fr"
            >
              <Logo className="h-6 w-auto text-primary transition-colors duration-300 lg:h-8" />
              <span className="sr-only">DBC</span>
            </a>

            <div className="hidden flex-1 justify-center lg:flex">
              <SearchTrigger className="max-w-xl" />
            </div>

            <div className="flex items-center gap-1 lg:gap-2">
              <a
                className="hidden items-center gap-1.5 rounded-lg border border-gray-200 px-4 py-2 text-[13px] font-semibold text-gray-900 transition-all hover:border-gray-900 hover:shadow-sm lg:flex"
                href="https://dbcstore.fr/fr/reprise"
              >
                <ArrowLeftRight className="h-3.5 w-3.5" aria-hidden="true" />
                Revendre
              </a>
              <a
                className="relative p-2.5 text-gray-900 transition-colors hover:text-gray-500"
                href="https://dbcstore.fr/fr/cart"
                aria-label="Panier"
              >
                <ShoppingCart
                  className="h-6 w-6 lg:h-5 lg:w-5"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>

          <div className="pb-3 lg:hidden">
            <SearchTrigger />
          </div>

          <div className="hidden border-t border-gray-200/50 transition-colors duration-300 lg:flex lg:justify-center lg:py-1.5">
            <nav className="flex items-center gap-0.5">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  className="whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] font-medium text-gray-600 transition-all hover:text-gray-900"
                  href={item.href}
                >
                  {item.label}
                </a>
              ))}
              <a
                className="whitespace-nowrap rounded-lg px-3.5 py-1.5 text-[13px] font-semibold text-primary transition-all hover:text-primary/80"
                href="/"
              >
                Trouver mon téléphone
              </a>
            </nav>
          </div>
        </div>
      </header>

      {menuOpen ? <MobileMenu onClose={() => setMenuOpen(false)} /> : null}
    </div>
  )
}
