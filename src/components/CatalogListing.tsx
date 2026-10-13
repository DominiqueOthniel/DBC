import { ArrowLeft, ChevronDown } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { formatEuro, getModels, modelPrice, type Model } from '../lib/api'
import { Link, ROUTES } from '../lib/routing'

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
    // recent: ordre API + override (18 Pro Max déjà en tête via merge)
    return list
  }, [models, sort])

  return (
    <div className="mx-auto max-w-7xl px-4 py-6 md:py-8">
      <div className="mb-5 flex items-center justify-between gap-3">
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
          Sélection du clone: catalogue API plus les modèles ajoutés ici, avec
          les prix déjà baissés de 2%.
        </p>
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
            className="appearance-none rounded-full border border-gray-200 bg-white py-2 pr-9 pl-4 font-medium outline-none focus:border-primary"
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

      <div className="mt-6 grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-3 lg:grid-cols-4">
        {sorted.map((model) => {
          const price = listPrice(model)
          return (
            <Link
              key={model.id}
              to={ROUTES.product(model.slug)}
              className="group flex flex-col rounded-2xl border border-gray-100 bg-white p-3 transition hover:border-gray-200 hover:shadow-sm"
            >
              <div className="flex aspect-square items-center justify-center rounded-xl bg-gray-50 p-3">
                {model.primary_image_url ? (
                  <img
                    src={model.primary_image_url}
                    alt={model.display_name ?? model.name}
                    className="h-full w-full object-contain"
                  />
                ) : null}
              </div>
              <p className="mt-3 text-sm font-semibold text-gray-900 group-hover:text-primary">
                {model.display_name ?? model.name}
              </p>
              {price != null && (
                <p className="mt-1 text-sm text-gray-600">
                  À partir de{' '}
                  <span className="font-semibold text-gray-900">
                    {formatEuro(price)}
                  </span>
                </p>
              )}
            </Link>
          )
        })}
      </div>
    </div>
  )
}
