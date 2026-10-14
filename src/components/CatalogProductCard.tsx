import { ShoppingBag, Zap } from 'lucide-react'
import { useMemo, useState } from 'react'
import { formatEuro, modelPrice, type Model } from '../lib/api'
import { useCart } from '../lib/cart'
import { imageForColor } from '../lib/productImages'
import { Link, ROUTES } from '../lib/routing'
import { ListingColorDots } from './ColorSwatches'

function listPrice(model: Model) {
  return model.price_from ?? modelPrice(model)
}

export function CatalogProductCard({ model }: { model: Model }) {
  const { addItem } = useCart()
  const colors = model.colors ?? []
  const [color, setColor] = useState(
    () =>
      colors.find((c) => c === model.default_color) ||
      colors.find(
        (c) => c.toLowerCase() === (model.default_color ?? '').toLowerCase(),
      ) ||
      colors[0] ||
      '',
  )
  const price = listPrice(model)
  const neu = model.new_price ?? null
  const save =
    price != null && neu != null && neu > price ? neu - price : null
  const title = model.display_name ?? model.name
  const imageUrl = useMemo(
    () => imageForColor(model, color) || model.primary_image_url,
    [model, color],
  )
  const productHref = color
    ? `${ROUTES.product(model.slug)}?color=${encodeURIComponent(color)}`
    : ROUTES.product(model.slug)

  return (
    <div className="group flex flex-col rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-lg">
      <div className="flex gap-4 sm:block">
        <Link to={productHref} className="relative w-28 shrink-0 sm:mb-4 sm:block sm:w-full">
          {model.delivery_speed === 'express' ? (
            <span
              className="absolute top-2 left-2 z-10 px-1 text-xs font-bold text-primary"
              style={{ isolation: 'isolate' }}
            >
              <span className="relative z-[2]">
                <span className="inline-flex items-center gap-1">
                  <Zap className="h-3 w-3" aria-hidden="true" />
                  24h
                </span>
              </span>
              <span
                aria-hidden="true"
                className="pointer-events-none absolute"
                style={{
                  zIndex: 1,
                  top: '-22%',
                  height: '144%',
                  left: '-7px',
                  right: '-7px',
                  width: 'calc(100% + 14px)',
                  backgroundImage: "url('/assets/dbc-brush-highlight.svg')",
                  backgroundSize: '100% 100%',
                  backgroundRepeat: 'no-repeat',
                  backgroundPosition: 'center',
                }}
              />
            </span>
          ) : null}
          <div className="relative aspect-square overflow-hidden rounded-xl">
            {imageUrl ? (
              <img
                key={imageUrl}
                src={imageUrl}
                alt={`${title}${color ? ` ${color}` : ''}`}
                className="absolute inset-0 h-full w-full object-contain transition-opacity duration-200"
              />
            ) : null}
          </div>
        </Link>

        <div className="flex min-w-0 flex-1 flex-col sm:block">
          <ListingColorDots
            colors={colors}
            value={color}
            onChange={setColor}
          />
          <Link to={productHref}>
            <h3 className="mb-1 font-display font-semibold text-gray-900 group-hover:text-gray-700">
              {title}
            </h3>
            {price != null && (
              <div className="flex items-baseline gap-2">
                <span className="text-xs text-gray-500">À partir de</span>
                <span className="text-lg font-bold text-gray-900">
                  {formatEuro(price)}
                </span>
              </div>
            )}
            {(neu != null || save != null) && (
              <div className="flex flex-wrap items-center gap-2">
                {neu != null ? (
                  <span className="text-sm text-gray-400 line-through">
                    {formatEuro(neu)} neuf
                  </span>
                ) : null}
                {save != null ? (
                  <span
                    className="relative inline-flex items-center px-1 text-[11px] font-bold text-primary"
                    style={{ isolation: 'isolate' }}
                  >
                    <span className="relative z-[1]">
                      Économisez {formatEuro(save)}
                    </span>
                    <img
                      src="/assets/dbc-brush-highlight.svg"
                      alt=""
                      aria-hidden="true"
                      className="pointer-events-none absolute"
                      style={{
                        zIndex: 0,
                        top: '15%',
                        left: '0px',
                        right: '-8px',
                        bottom: '-2px',
                        width: 'calc(100% + 8px)',
                        height: 'auto',
                      }}
                    />
                  </span>
                ) : null}
              </div>
            )}
          </Link>
        </div>
      </div>
      <div className="mt-3 flex gap-2">
        <button
          type="button"
          disabled={price == null}
          onClick={() => {
            if (price == null) return
            addItem({
              slug: model.slug,
              title,
              imageUrl: imageUrl ?? '',
              price,
              color: color || undefined,
              grade: 'Parfait',
              href: productHref,
            })
          }}
          className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-full bg-primary px-3 text-sm font-semibold text-white hover:bg-primary/90 disabled:opacity-50"
        >
          <ShoppingBag className="h-4 w-4" aria-hidden="true" />
          Ajouter
        </button>
        <Link
          to={productHref}
          className="inline-flex h-9 flex-1 items-center justify-center rounded-full border border-gray-200 px-3 text-sm font-semibold text-gray-700 hover:bg-gray-50"
        >
          Voir la fiche
        </Link>
      </div>
    </div>
  )
}
