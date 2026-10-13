import { Minus, Plus, Trash2 } from 'lucide-react'
import { formatEuro } from '../../lib/api'
import { useCart } from '../../lib/cart'
import { Link, ROUTES } from '../../lib/routing'

export function CartPage() {
  const { lines, subtotal, setQty, removeItem, clear, count } = useCart()

  if (lines.length === 0) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
          Votre panier
        </h1>
        <div className="mt-10 rounded-xl border border-gray-100 bg-gray-50 px-6 py-12 text-center">
          <p className="text-base font-semibold text-gray-900">
            Votre panier est vide
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Parcourez notre catalogue pour trouver votre prochain appareil.
          </p>
          <Link
            to={ROUTES.products}
            className="mt-6 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Explorer nos produits
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <div className="flex flex-wrap items-end justify-between gap-3">
        <div>
          <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
            Votre panier
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {count} article{count > 1 ? 's' : ''}
          </p>
        </div>
        <button
          type="button"
          onClick={clear}
          className="text-sm font-medium text-gray-500 underline underline-offset-2 hover:text-gray-800"
        >
          Vider le panier
        </button>
      </div>

      <ul className="mt-8 divide-y divide-gray-100 rounded-xl border border-gray-100 bg-white">
        {lines.map((line) => (
          <li key={line.key} className="flex gap-4 p-4 sm:p-5">
            <Link
              to={line.href}
              className="relative h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-gray-50 sm:h-24 sm:w-24"
            >
              <img
                src={line.imageUrl}
                alt=""
                className="absolute inset-0 h-full w-full object-contain p-1"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                to={line.href}
                className="font-display text-sm font-semibold text-gray-900 hover:underline sm:text-base"
              >
                {line.title}
              </Link>
              <div className="mt-1 flex flex-wrap items-center gap-2 text-xs text-gray-500">
                {line.colorHex ? (
                  <span
                    className="h-2.5 w-2.5 rounded-full border border-gray-200"
                    style={{ backgroundColor: line.colorHex }}
                    aria-hidden="true"
                  />
                ) : null}
                {line.color ? <span>{line.color}</span> : null}
                {line.grade ? <span>· {line.grade}</span> : null}
              </div>
              <p className="mt-2 text-base font-bold text-gray-900">
                {formatEuro(line.price)}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-3">
                <div className="inline-flex items-center rounded-full border border-gray-200">
                  <button
                    type="button"
                    aria-label="Diminuer la quantité"
                    className="flex h-9 w-9 items-center justify-center text-gray-700 hover:bg-gray-50"
                    onClick={() => setQty(line.key, line.qty - 1)}
                  >
                    <Minus className="h-4 w-4" aria-hidden="true" />
                  </button>
                  <span className="min-w-8 text-center text-sm font-semibold text-gray-900">
                    {line.qty}
                  </span>
                  <button
                    type="button"
                    aria-label="Augmenter la quantité"
                    className="flex h-9 w-9 items-center justify-center text-gray-700 hover:bg-gray-50"
                    onClick={() => setQty(line.key, line.qty + 1)}
                  >
                    <Plus className="h-4 w-4" aria-hidden="true" />
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => removeItem(line.key)}
                  className="inline-flex items-center gap-1.5 text-sm font-medium text-gray-500 hover:text-red-600"
                >
                  <Trash2 className="h-4 w-4" aria-hidden="true" />
                  Supprimer
                </button>
              </div>
            </div>
            <p className="shrink-0 text-sm font-bold text-gray-900 sm:text-base">
              {formatEuro(line.price * line.qty)}
            </p>
          </li>
        ))}
      </ul>

      <div className="mt-6 rounded-xl border border-gray-100 bg-gray-50 p-5">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Sous-total</span>
          <span className="text-lg font-bold text-gray-900">
            {formatEuro(subtotal)}
          </span>
        </div>
        <p className="mt-1 text-xs text-gray-500">
          Livraison calculée à l’étape suivante.
        </p>
        <button
          type="button"
          className="mt-4 inline-flex h-12 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary/90"
        >
          Passer commande
        </button>
        <p className="mt-3 text-center text-xs text-gray-500">
          Paiement sécurisé non branché ici (pas de redirection externe).
        </p>
        <Link
          to={ROUTES.products}
          className="mt-3 block text-center text-sm font-semibold text-primary underline underline-offset-2"
        >
          Continuer vos achats
        </Link>
      </div>
    </div>
  )
}
