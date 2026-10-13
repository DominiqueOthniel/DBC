import { ArrowLeft } from 'lucide-react'
import { useEffect, useState } from 'react'
import { formatEuro, getModels, modelPrice, type Model } from '../lib/api'
import { Link, ROUTES } from '../lib/routing'

export function ProductPage({ slug }: { slug: string }) {
  const [model, setModel] = useState<Model | null | undefined>(undefined)

  useEffect(() => {
    let cancelled = false
    getModels({ category: 'mobile', perPage: 100 })
      .then((items) => {
        if (cancelled) return
        setModel(items.find((m) => m.slug === slug) ?? null)
      })
      .catch(() => {
        if (!cancelled) setModel(null)
      })
    return () => {
      cancelled = true
    }
  }, [slug])

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

  const price = modelPrice(model) ?? model.price_from

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
          to={ROUTES.home}
          className="text-sm font-medium text-primary underline underline-offset-2"
        >
          Retour au quiz
        </Link>
      </div>

      <div className="flex flex-col gap-6 sm:flex-row sm:items-start">
        <div className="flex h-56 w-full shrink-0 items-center justify-center rounded-2xl bg-gray-50 p-4 sm:h-64 sm:w-64">
          {model.primary_image_url ? (
            <img
              src={model.primary_image_url}
              alt={model.display_name ?? model.name}
              className="h-full w-full object-contain"
            />
          ) : null}
        </div>
        <div>
          <p className="text-sm font-medium text-gray-500">{model.brand}</p>
          <h1 className="mt-1 font-display text-2xl font-bold text-gray-900 md:text-3xl">
            {model.display_name ?? model.name}
          </h1>
          {price != null && (
            <p className="mt-3 text-base text-gray-700">
              À partir de {formatEuro(price)}
            </p>
          )}
          <p className="mt-4 max-w-md text-sm leading-relaxed text-gray-500">
            Fiche produit du clone. Les prix affichés incluent la baisse de 2%
            appliquée sur le catalogue chargé.
          </p>
          <Link
            to={ROUTES.home}
            className="mt-6 inline-flex items-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Retour au quiz
          </Link>
        </div>
      </div>
    </div>
  )
}
