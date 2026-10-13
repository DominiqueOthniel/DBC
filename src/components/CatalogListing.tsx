import { ArrowLeft } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { getModels, modelPrice, type Model } from '../lib/api'
import { Link, ROUTES } from '../lib/routing'
import { CatalogProductCard } from './CatalogProductCard'

type SortMode = 'recent' | 'price-asc' | 'price-desc'

function listPrice(model: Model) {
  return model.price_from ?? modelPrice(model)
}

export function CatalogListing({
  category = 'mobile',
  title = 'Smartphones reconditionnés',
  subtitle = 'Découvrez notre sélection de smartphones reconditionnés, testés et garantis.',
}: {
  category?: string
  title?: string
  subtitle?: string
}) {
  const [models, setModels] = useState<Model[] | null>(null)
  const [failed, setFailed] = useState(false)
  const [sort, setSort] = useState<SortMode>('recent')

  useEffect(() => {
    let cancelled = false
    setModels(null)
    setFailed(false)
    getModels({ category, perPage: 100 })
      .then((items) => {
        if (!cancelled) setModels(items)
      })
      .catch(() => {
        if (!cancelled) setFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [category])

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
      <div className="mb-5 flex flex-wrap gap-4">
        <Link
          to={ROUTES.home}
          className="inline-flex items-center gap-2 text-sm font-medium text-gray-700 hover:text-gray-900"
        >
          <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          Accueil
        </Link>
        <Link
          to={ROUTES.trouver}
          className="text-sm font-medium text-primary underline underline-offset-2"
        >
          Trouver mon téléphone
        </Link>
      </div>

      <div className="rounded-2xl bg-primary px-5 py-6 text-white md:px-8 md:py-8">
        <h1 className="font-display text-2xl font-bold md:text-3xl">{title}</h1>
        <p className="mt-2 max-w-xl text-sm text-white/85 md:text-base">
          {subtitle}
        </p>
        <div className="mt-5 grid grid-cols-2 gap-x-4 gap-y-3 text-[13px] text-white/90 sm:flex sm:flex-wrap sm:items-center sm:gap-x-6">
          <span>Garantie 12 à 24 mois</span>
          <span>Livraison 24-72h</span>
          <span>Retour 14 jours</span>
          <span>
            {models ? `${models.length} disponibles` : 'Catalogue…'}
          </span>
        </div>
      </div>

      <div className="mt-5 mb-4 flex items-center justify-between gap-3">
        <span className="text-sm text-gray-500">
          {models
            ? `${models.length} produit(s) trouvé(s)`
            : failed
              ? 'Catalogue indisponible'
              : 'Chargement…'}
        </span>
        <label className="inline-flex items-center text-sm text-gray-700">
          <span className="sr-only">Tri</span>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortMode)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-1.5 text-sm text-gray-700 outline-none focus:border-primary"
          >
            <option value="recent">Plus récent</option>
            <option value="price-asc">Prix croissant</option>
            <option value="price-desc">Prix décroissant</option>
          </select>
        </label>
      </div>

      <div className="flex flex-col gap-3 sm:grid sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4">
        {sorted.map((model) => (
          <CatalogProductCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  )
}
