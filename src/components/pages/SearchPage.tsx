import { Search } from 'lucide-react'
import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { getModels, type Model } from '../../lib/api'
import { ROUTES, useRouting } from '../../lib/routing'
import { CatalogProductCard } from '../CatalogProductCard'

function queryFromUrl() {
  if (typeof window === 'undefined') return ''
  return new URLSearchParams(window.location.search).get('q') ?? ''
}

export function SearchPage() {
  const { navigate } = useRouting()
  const [q, setQ] = useState(queryFromUrl)
  const [models, setModels] = useState<Model[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    let cancelled = false
    getModels({ perPage: 100 })
      .then((items) => {
        if (!cancelled) setModels(items)
      })
      .finally(() => {
        if (!cancelled) setLoading(false)
      })
    return () => {
      cancelled = true
    }
  }, [])

  const results = useMemo(() => {
    const needle = q.trim().toLowerCase()
    if (!needle) return models.slice(0, 24)
    return models.filter((m) => {
      const hay = [
        m.name,
        m.display_name,
        m.brand,
        m.slug,
        ...(m.colors ?? []),
      ]
        .filter(Boolean)
        .join(' ')
        .toLowerCase()
      return hay.includes(needle)
    })
  }, [models, q])

  function submit(e: FormEvent) {
    e.preventDefault()
    const next = q.trim()
    navigate(
      next ? `${ROUTES.search}?q=${encodeURIComponent(next)}` : ROUTES.search,
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 md:py-10">
      <h1 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">
        Rechercher un produit
      </h1>
      <form onSubmit={submit} className="mt-5 flex gap-2">
        <label className="relative min-w-0 flex-1">
          <span className="sr-only">Recherche</span>
          <Search
            className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          />
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="iPhone, MacBook, Samsung…"
            className="h-11 w-full rounded-full border border-gray-200 bg-gray-50 pr-4 pl-10 text-sm outline-none focus:border-primary focus:bg-white"
          />
        </label>
        <button
          type="submit"
          className="h-11 shrink-0 rounded-full bg-primary px-5 text-sm font-semibold text-white hover:bg-primary/90"
        >
          Rechercher
        </button>
      </form>

      <p className="mt-4 text-sm text-gray-500">
        {loading
          ? 'Chargement…'
          : `${results.length} résultat${results.length > 1 ? 's' : ''}`}
      </p>

      <div className="mt-6 grid gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {results.map((model) => (
          <CatalogProductCard key={model.id} model={model} />
        ))}
      </div>
    </div>
  )
}
