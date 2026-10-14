import { FEATURED_DEALS } from '../../data/deals'
import { DealCard } from '../DealCard'
import { BrushWord } from '../BrushHighlight'

export function OffersPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
        Toutes les <BrushWord>offres</BrushWord> du moment
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600">
        Promos exclusives en ligne : des appareils testés en boutique, à prix
        réduit pour libérer nos étagères. Quantités limitées.
      </p>
      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {FEATURED_DEALS.map((deal) => (
          <DealCard key={deal.id} deal={deal} />
        ))}
      </div>
    </div>
  )
}
