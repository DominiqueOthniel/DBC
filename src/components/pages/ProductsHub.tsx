import { CATALOG_ROUTES } from '../../data/sitePages'
import { Link, ROUTES } from '../../lib/routing'

const EXTRA = [
  {
    path: ROUTES.audio,
    title: 'Audio reconditionné',
    subtitle: 'Casques et écouteurs',
  },
  {
    path: ROUTES.accessories,
    title: 'Accessoires',
    subtitle: 'Coques, chargeurs, etc.',
  },
]

export function ProductsHub() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
        Nos produits reconditionnés
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Parcourez toutes nos catégories, testées et garanties en magasin.
      </p>
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {[...CATALOG_ROUTES, ...EXTRA].map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className="rounded-xl border border-gray-100 bg-white p-5 transition-shadow hover:shadow-lg"
          >
            <h2 className="font-display text-lg font-semibold text-gray-900">
              {item.title}
            </h2>
            <p className="mt-2 text-sm text-gray-600">{item.subtitle}</p>
          </Link>
        ))}
      </div>
    </div>
  )
}
