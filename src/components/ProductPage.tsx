import { ArrowLeft, ShoppingBag } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { colorHex } from '../data/phoneColors'
import { formatEuro, getModels, modelPrice, type Model } from '../lib/api'
import { useCart } from '../lib/cart'
import { Link, ROUTES } from '../lib/routing'
import { ProductColorPicker } from './ColorSwatches'

const GRADES = ['Parfait', 'Très bon', 'Correct'] as const

const COLOR_IMAGES: Record<string, Record<string, string>> = {
  'iphone-18-pro-max': {
    Bordeaux: '/product-images/iphone-18-pro-max/bordeaux/0.jpg',
    Glacier: '/product-images/iphone-18-pro-max/glacier/0.jpg',
    Argent: '/product-images/iphone-18-pro-max/argent/0.jpg',
    Noir: '/product-images/iphone-18-pro-max/noir/0.jpg',
  },
}

function initialColorFromUrl(colors: string[], fallback: string) {
  if (typeof window === 'undefined') return fallback
  const q = new URLSearchParams(window.location.search).get('color')
  if (q && colors.some((c) => c.toLowerCase() === q.toLowerCase())) {
    return colors.find((c) => c.toLowerCase() === q.toLowerCase()) ?? fallback
  }
  return fallback
}

export function ProductPage({ slug }: { slug: string }) {
  const { addItem } = useCart()
  const [model, setModel] = useState<Model | null | undefined>(undefined)
  const [color, setColor] = useState<string>('')
  const [grade, setGrade] = useState<(typeof GRADES)[number]>('Parfait')

  useEffect(() => {
    let cancelled = false
    getModels({ category: 'mobile', perPage: 100 })
      .then((items) => {
        if (cancelled) return
        let found = items.find((m) => m.slug === slug) ?? null
        if (!found) {
          return getModels({ perPage: 100 }).then((all) => {
            if (cancelled) return
            found = all.find((m) => m.slug === slug) ?? null
            setModel(found)
            if (found) {
              const colors = found.colors ?? []
              const base =
                found.colors?.find((c) => c === found!.default_color) ||
                colors[0] ||
                found.default_color ||
                ''
              setColor(initialColorFromUrl(colors, base || ''))
            }
          })
        }
        setModel(found)
        if (found) {
          const colors = found.colors ?? []
          const base =
            found.colors?.find((c) => c === found!.default_color) ||
            colors[0] ||
            found.default_color ||
            ''
          setColor(initialColorFromUrl(colors, base || ''))
        }
      })
      .catch(() => {
        if (!cancelled) setModel(null)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

  const imageUrl = useMemo(() => {
    if (!model) return null
    const byColor = COLOR_IMAGES[model.slug]?.[color]
    return byColor || model.primary_image_url
  }, [model, color])

  if (model === undefined) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 text-sm text-gray-600">
        Chargement du produit…
      </div>
    )
  }

  if (!model) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10">
        <p className="text-base text-gray-700">Produit introuvable.</p>
        <Link
          to={ROUTES.smartphones}
          className="mt-4 inline-flex text-sm font-semibold text-primary underline"
        >
          Voir le rayon smartphones
        </Link>
      </div>
    )
  }

  const price = model.price_from ?? modelPrice(model)
  const neu = model.new_price ?? null
  const save =
    price != null && neu != null && neu > price ? neu - price : null
  const colors = model.colors ?? []

  return (
    <div className="mx-auto max-w-3xl px-4 py-6 md:py-10">
      <div className="mb-6 flex flex-wrap items-center gap-4">
        <Link
          to={ROUTES.smartphones}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour au rayon
        </Link>
        <Link
          to={ROUTES.trouver}
          className="text-sm font-medium text-primary underline underline-offset-2"
        >
          Trouver mon téléphone
        </Link>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="relative aspect-square w-full shrink-0 overflow-hidden rounded-xl bg-gray-50 sm:aspect-auto sm:h-72 sm:w-72">
          {imageUrl ? (
            <img
              src={imageUrl}
              alt={`${model.display_name ?? model.name}${color ? ` ${color}` : ''}`}
              className="absolute inset-0 h-full w-full object-contain p-4"
            />
          ) : null}
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-gray-500">{model.brand}</p>
          <h1 className="mt-1 font-display text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
            {model.display_name ?? model.name}
          </h1>
          {price != null && (
            <div className="mt-3 flex flex-wrap items-baseline gap-2">
              <span className="text-xs text-gray-500">À partir de</span>
              <span className="text-lg font-bold text-gray-900">
                {formatEuro(price)}
              </span>
            </div>
          )}
          {(neu != null || save != null) && (
            <div className="mt-1 flex flex-wrap items-center gap-2">
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

          <ProductColorPicker
            colors={colors}
            value={color || colors[0] || ''}
            onChange={(name) => {
              setColor(name)
              const url = new URL(window.location.href)
              url.searchParams.set('color', name)
              window.history.replaceState({}, '', url.pathname + url.search)
            }}
          />

          <div className="mt-5">
            <p className="text-sm font-semibold text-gray-900">État</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {GRADES.map((g) => (
                <button
                  key={g}
                  type="button"
                  aria-pressed={grade === g}
                  onClick={() => setGrade(g)}
                  className={`rounded-full border px-3.5 py-1.5 text-sm font-medium transition ${
                    grade === g
                      ? 'border-primary bg-primary text-white'
                      : 'border-gray-200 bg-white text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {g}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            disabled={price == null}
            onClick={() => {
              if (price == null) return
              const selected = color || colors[0] || ''
              addItem({
                slug: model.slug,
                title: model.display_name ?? model.name,
                imageUrl: imageUrl ?? model.primary_image_url ?? '',
                price,
                color: selected || undefined,
                colorHex: selected ? colorHex(selected) : undefined,
                grade,
                href: selected
                  ? `${ROUTES.product(model.slug)}?color=${encodeURIComponent(selected)}`
                  : ROUTES.product(model.slug),
              })
            }}
            className="mt-8 inline-flex w-full items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white transition hover:bg-primary/90 disabled:opacity-50 sm:w-auto"
          >
            <ShoppingBag className="h-4 w-4" aria-hidden="true" />
            Ajouter au panier
          </button>
        </div>
      </div>
    </div>
  )
}
