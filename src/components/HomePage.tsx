import { Star } from 'lucide-react'
import { FEATURED_DEALS, HOME_CATEGORIES } from '../data/deals'
import { Link } from '../lib/routing'
import { BrushWord } from './BrushHighlight'
import { DealCard } from './DealCard'

function GoogleReviews() {
  return (
    <div className="mb-8 flex w-full flex-col items-center gap-1.5 rounded-xl border border-gray-200 bg-white px-4 py-3 md:mb-12">
      <div className="flex items-center gap-3">
        <svg className="h-5 w-5" viewBox="0 0 24 24" fill="none" aria-hidden="true">
          <path
            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 01-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z"
            fill="#4285F4"
          />
          <path
            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
            fill="#34A853"
          />
          <path
            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
            fill="#FBBC05"
          />
          <path
            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
            fill="#EA4335"
          />
        </svg>
        <div className="h-4 w-px bg-gray-200" />
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              className="h-4 w-4 fill-[#F4B400] text-[#F4B400]"
              aria-hidden="true"
            />
          ))}
        </div>
        <span className="text-lg font-bold text-gray-900">
          4,7<span className="text-sm font-normal text-gray-500">/5</span>
        </span>
      </div>
      <div className="flex items-center gap-2 text-sm">
        <span className="font-semibold text-gray-900 italic">
          « Rapide et efficace »
        </span>
        <span className="text-gray-400">6 000+ avis</span>
      </div>
    </div>
  )
}

export function HomePage() {
  return (
    <div>
      <div data-zone="home_categories">
        <section className="bg-white pt-10 pb-8 md:pt-14 md:pb-12">
          <div className="mx-auto max-w-7xl px-4">
            <h1
              id="home-categories-title"
              className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px] lg:text-[36px]"
            >
              Browse by <BrushWord>category</BrushWord>.
            </h1>
            <p className="mt-2 text-sm font-normal text-gray-500 md:text-base">
              Find the right device faster.
            </p>
            <nav
              data-testid="home-categories"
              aria-labelledby="home-categories-title"
              className="mt-5"
            >
              <div
                data-testid="home-categories-rail"
                className="grid auto-cols-[20%] grid-flow-col gap-2 overflow-x-auto pb-3 [scrollbar-width:none] lg:grid-flow-row lg:grid-cols-6 lg:gap-3 lg:overflow-visible lg:pb-0 [&::-webkit-scrollbar]:hidden"
              >
                {HOME_CATEGORIES.map((cat) => (
                  <Link
                    key={cat.id}
                    to={cat.href}
                    className="group flex min-h-11 min-w-0 snap-start flex-col items-center justify-end text-center focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:outline-none"
                  >
                    <span className="relative block h-20 w-full md:h-24 lg:h-28">
                      <img
                        alt=""
                        loading="lazy"
                        decoding="async"
                        src={cat.image}
                        className="absolute inset-0 h-full w-full object-contain transition-transform duration-300 group-hover:-translate-y-1"
                      />
                    </span>
                    <span
                      data-testid="home-category-label"
                      className="mt-2 block max-w-full text-[11px] leading-tight font-semibold text-gray-950 [overflow-wrap:anywhere] sm:text-xs md:text-sm"
                    >
                      {cat.label}
                    </span>
                  </Link>
                ))}
              </div>
            </nav>
          </div>
        </section>
      </div>

      <div data-zone="home_offers">
        <section className="pt-0 pb-12 md:pb-16">
          <div className="mx-auto max-w-7xl px-4">
            <GoogleReviews />
            <div className="mb-6 md:mb-8">
              <h2 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px] lg:text-[36px]">
                Great <BrushWord>deal</BrushWord>.{' '}
                <span className="font-normal text-gray-500">
                  Devices featured by our stores.
                </span>
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
              {FEATURED_DEALS.map((deal) => (
                <DealCard key={deal.id} deal={deal} />
              ))}
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
