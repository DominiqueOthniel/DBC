import { ArrowLeft, ChevronDown, Zap } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatEuro, getModels, modelPrice, type Model } from '../lib/api'
import { Link, ROUTES } from '../lib/routing'
import { ListingColorDots } from './ColorSwatches'

type SortMode = 'recent' | 'price-asc' | 'price-desc'

function listPrice(model: Model) {
  return model.price_from ?? modelPrice(model)
}

export function CatalogListing() {
  const [models, setModels] = useState<Model[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [sort, setSort] = useState<SortMode>('recent')

  useEffect(() => {
    let cancelled = false
    getModels({ category: 'mobile', perPage: 100 })
      .then((items) => {
        if (!cancelled) setModels(items)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const sorted = useMemo(() => {
    if (!models) return []
    const list = [...models]
    if (sort === 'price-asc') {
      list.sort((a, b) => (listPrice(a) ?? 0) - (listPrice(b) ?? 0))
    } else if (sort === 'price-desc') {
      list.sort((a, b) => (listPrice(b) ?? 0) - (listPrice(a) ?? 0))
    }
    return list
  }, [models, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="mb-5">
        <Link
          to={ROUTES.home}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Retour au quiz
        </Link>
      </div>

      <div className="rounded-2xl bg-primary px-5 py-6 text-white md:px-8 md:py-8">
        <h1 className="font-display text-2xl font-bold md:text-3xl">
          Smartphones reconditionnés
        </h1>
        <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
          Découvrez notre sélection de smartphones reconditionnés, testés et
          garantis.
        </p>
        <div className="mt-5 grid grid-cols-2 gap-3 text-xs font-medium text-white/90 sm:grid-cols-4 sm:text-sm">
          <span>Garantie 12 à 24 mois</span>
          <span>Livraison 24-72h</span>
          <span>Retour 14 jours</span>
          <span>
            {models ? `${models.length} disponibles` : 'Catalogue…'}
          </span>
        </div>
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3">
        <p className="text-sm font-medium text-gray-700">
          {models
            ? `${models.length} produit(s) trouvé(s)`
            : failed
              ? 'Catalogue indisponible'
              : 'Chargement…'}
        </p>
        <label className="relative inline-flex items-center text-sm text-gray-700">
          <span className="sr-only">Tri</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="appearance-none rounded-full border border-gray-200 bg-white px-4 py-2 pr-9 text-sm font-medium text-gray-700 outline-none focus:border-primary"
          >
            <option value="recent">Plus récent</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
          <ChevronDown
            className="pointer-events-none absolute right-3 h-4 w-4 text-gray-500"
            aria-hidden="true"
          />
        </label>
      </div>

      <div className="mt-6 flex flex-col gap-3">
        {sorted.map((model) => {
          const price = listPrice(model)
          const neu = model.new_price ?? null
          const save =
            price != null && neu != null && neu > price ? neu - price : null
          return (
            <Link
              key={model.id}
              to={ROUTES.product(model.slug)}
              className="group block rounded-xl border border-gray-100 bg-white p-4 transition-shadow hover:shadow-lg"
            >
              <div className="flex gap-4 sm:block">
                <div className="relative w-28 shrink-0 sm:mb-4 sm:w-full">
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
                          backgroundImage:
                            "url('/assets/dbc-brush-highlight.svg')",
                          backgroundSize: '100% 100%',
                          backgroundRepeat: 'no-repeat',
                          backgroundPosition: 'center',
                        }}
                      />
                    </span>
                  ) : null}
                  <div className="relative aspect-square overflow-hidden rounded-xl bg-gray-50">
                    {model.primary_image_url ? (
                      <img
                        src={model.primary_image_url}
                        alt={model.display_name ?? model.name}
                        className="absolute inset-0 h-full w-full object-contain"
                      />
                    ) : null}
                  </div>
                </div>

                <div className="flex min-w-0 flex-1 flex-col sm:block">
                  <ListingColorDots colors={model.colors} />
                  <h3 className="mb-1 font-display font-semibold text-gray-900 group-hover:text-gray-700">
                    {model.display_name ?? model.name}
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
                </div>
              </div>
            </Link>
          )
        })}
      </div>
    </div>
  )
}
