import {
  BadgeCheck,
  Eye,
  RotateCcw,
  ShieldCheck,
  ShoppingBag,
} from 'lucide-react'
import { formatDealPrice, type FeaturedDeal } from '../data/deals'
import { useCart } from '../lib/cart'
import { Link } from '../lib/routing'
import { DealBadge } from './BrushHighlight'

export function DealCard({ deal }: { deal: FeaturedDeal }) {
  const { addItem } = useCart()
  const productHref =
    deal.href.startsWith('/p/') || deal.href.includes('?')
      ? deal.href.split('?')[0]!
      : deal.href

  function onAdd() {
    addItem({
      slug: deal.slug ?? deal.id,
      title: deal.title,
      imageUrl: deal.imageUrl,
      price: deal.price,
      color: deal.colorName,
      colorHex: deal.colorHex,
      grade: deal.grade,
      href:
        deal.href.startsWith('/p/')
          ? deal.href
          : productHref.startsWith('/p/')
            ? productHref
            : `/offres`,
    })
  }

  return (
    <div className="flex flex-col rounded-xl border border-gray-100 bg-white p-3">
      <Link to={deal.href} className="group">
        <div className="relative mx-auto h-28 w-full sm:h-32">
          <DealBadge />
          <img
            alt={deal.title}
            loading="lazy"
            decoding="async"
            className="absolute inset-0 h-full w-full object-contain transition-transform group-hover:scale-105"
            src={deal.imageUrl}
          />
        </div>
        <h3 className="mt-2 line-clamp-1 font-display text-sm font-semibold text-gray-900 group-hover:underline">
          {deal.title}
        </h3>
        <div className="mt-0.5 flex items-center gap-1.5 text-[11px] text-gray-500">
          <span
            className="h-2.5 w-2.5 shrink-0 rounded-full border border-gray-200"
            style={{ backgroundColor: deal.colorHex }}
            aria-hidden="true"
          />
          <span className="truncate">
            {deal.colorName ? `${deal.colorName} · ` : ''}
            {deal.grade}
            {deal.qty && deal.qty > 1 ? ` ×${deal.qty}` : ''}
          </span>
        </div>
        <p className="mt-0.5 text-base font-bold text-gray-900">
          {formatDealPrice(deal.price)}
        </p>
      </Link>

      <div className="mt-1.5 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[10px] text-gray-500">
        <span className="flex items-center gap-1">
          <ShieldCheck className="h-3 w-3" aria-hidden="true" />
          12 mois
        </span>
        <span className="flex items-center gap-1">
          <RotateCcw className="h-3 w-3" aria-hidden="true" />
          Retour 14j
        </span>
        <span className="flex items-center gap-1">
          <BadgeCheck className="h-3 w-3" aria-hidden="true" />
          Testé
        </span>
      </div>

      <button
        type="button"
        onClick={onAdd}
        className="mt-2.5 inline-flex h-8 w-full cursor-pointer items-center justify-center gap-1.5 rounded-lg bg-primary px-3 text-sm font-medium whitespace-nowrap text-primary-foreground transition-all hover:bg-primary/90"
      >
        <ShoppingBag className="h-4 w-4" aria-hidden="true" />
        Ajouter au panier
      </button>
      <Link
        to={deal.href}
        className="mt-2 flex items-center justify-center gap-1.5 rounded-lg border border-gray-200 py-2 text-[13px] font-semibold text-gray-700 transition-colors hover:bg-gray-50"
      >
        <Eye className="h-4 w-4 shrink-0" aria-hidden="true" />
        Voir la fiche
      </Link>
    </div>
  )
}
