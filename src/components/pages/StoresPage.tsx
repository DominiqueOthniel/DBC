import { Phone } from 'lucide-react'
import { STORES, getStoreStatus, hourFr } from '../../data/stores'

export function StoresPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[36px]">
        Nos magasins.
      </h1>
      <p className="mt-3 max-w-2xl text-base text-gray-600">
        Venez essayer, comparer et repartir avec le smartphone parfait. En
        personne.
      </p>
      <p className="mt-6 text-sm font-medium text-gray-500">
        {STORES.length} magasins à découvrir
      </p>
      <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {STORES.map((store) => {
          const status = getStoreStatus(store)
          return (
            <article
              key={store.key}
              className="rounded-xl border border-gray-100 bg-white p-5"
            >
              <h2 className="font-display text-lg font-semibold text-gray-900">
                DBC {store.label}
              </h2>
              <p className="mt-1 text-sm text-gray-600">{store.city}</p>
              <p className="mt-3 text-sm leading-relaxed text-gray-700">
                {store.address}
              </p>
              <p className="mt-3 text-sm text-gray-600">
                {status.isOpen
                  ? `Ouvert · jusqu’à ${hourFr(status.label ?? store.weeklyHours[0]?.close ?? '')}`
                  : 'Fermé actuellement'}
              </p>
              <a
                href={`tel:${store.phone.replace(/\s/g, '')}`}
                className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary hover:text-primary/80"
              >
                <Phone className="h-4 w-4" aria-hidden="true" />
                {store.phone}
              </a>
            </article>
          )
        })}
      </div>
    </div>
  )
}
