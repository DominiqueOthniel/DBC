import {
  ArrowLeftRight,
  Menu,
  Search,
  ShoppingCart,
  X,
} from 'lucide-react'
import { useState } from 'react'
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

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div
      className="sticky top-0 z-40 translate-y-0 bg-white shadow-sm transition-all duration-300"
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
              className="absolute left-1/2 flex shrink-0 -translate-x-1/2 items-center gap-2 lg:relative lg:left-auto lg:translate-x-0"
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

      {menuOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-black/40"
            aria-label="Fermer le menu"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute inset-y-0 left-0 flex w-[min(100%,20rem)] flex-col bg-white shadow-xl">
            <div className="flex h-16 items-center justify-between border-b border-gray-200 px-4">
              <Logo className="h-6 w-auto text-primary" />
              <button
                type="button"
                className="p-2 text-gray-900"
                aria-label="Fermer"
                onClick={() => setMenuOpen(false)}
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <nav className="flex flex-col gap-1 p-4">
              {NAV.map((item) => (
                <a
                  key={item.label}
                  href={item.href}
                  className="rounded-lg px-3 py-3 text-sm font-medium text-gray-800 hover:bg-gray-50"
                >
                  {item.label}
                </a>
              ))}
              <a
                href="/"
                className="rounded-lg px-3 py-3 text-sm font-semibold text-primary"
              >
                Trouver mon téléphone
              </a>
              <a
                href="https://dbcstore.fr/fr/reprise"
                className="mt-2 rounded-lg border border-gray-200 px-3 py-3 text-sm font-semibold text-gray-900"
              >
                Revendre
              </a>
            </nav>
          </div>
        </div>
      )}
    </div>
  )
}
