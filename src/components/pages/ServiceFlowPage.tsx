import { Link, ROUTES } from '../../lib/routing'

const CATEGORIES = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'other', label: 'Autre' },
]

export function ReprisePage() {
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
        Estimer la reprise de ton appareil chez DBC
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Quel appareil veux-tu revendre ? Choisis sa catégorie. On vérifiera
        ensuite son état ensemble.
      </p>
      <div className="mt-8 grid gap-3 sm:grid-cols-3">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-base font-semibold text-gray-900 transition hover:border-primary hover:shadow-sm"
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="mt-8 text-sm text-gray-500">
        Estimation indicative. Validation finale en magasin après contrôle.
      </p>
      <Link
        to={ROUTES.stores}
        className="mt-6 inline-flex text-sm font-semibold text-primary underline"
      >
        Voir nos magasins
      </Link>
    </div>
  )
}

export function RepairPage() {
  const brands = ['Apple', 'Samsung', 'Xiaomi', 'Autre']
  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
        Réparez votre appareil, au juste prix
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Estimez le coût de votre réparation en quelques clics, puis passez dans
        l’une de nos boutiques.
      </p>
      <ol className="mt-6 flex flex-wrap gap-3 text-sm font-medium text-gray-500">
        <li className="rounded-full bg-primary px-3 py-1 text-white">1 Marque</li>
        <li className="rounded-full bg-gray-100 px-3 py-1">2 Modèle</li>
        <li className="rounded-full bg-gray-100 px-3 py-1">3 Réparation</li>
        <li className="rounded-full bg-gray-100 px-3 py-1">4 Estimation</li>
      </ol>
      <h2 className="mt-8 font-display text-lg font-semibold text-gray-900">
        Quelle est la marque de votre appareil ?
      </h2>
      <div className="mt-4 grid gap-3 sm:grid-cols-2">
        {brands.map((b) => (
          <button
            key={b}
            type="button"
            className="rounded-xl border border-gray-200 bg-white px-4 py-5 text-left text-base font-semibold text-gray-900 transition hover:border-primary"
          >
            {b}
          </button>
        ))}
      </div>
      <Link
        to={ROUTES.stores}
        className="mt-8 inline-flex text-sm font-semibold text-primary underline"
      >
        Trouver un magasin
      </Link>
    </div>
  )
}
