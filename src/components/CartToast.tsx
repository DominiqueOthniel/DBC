import { Check, X } from 'lucide-react'
import { useCart } from '../lib/cart'
import { Link, ROUTES } from '../lib/routing'

export function CartToast() {
  const { toast, dismissToast } = useCart()
  if (!toast?.open) return null

  return (
    <div
      className="fixed top-20 right-4 left-4 z-[10000] mx-auto max-w-md rounded-xl border border-gray-100 bg-white p-4 shadow-lg sm:left-auto"
      role="status"
      aria-live="polite"
    >
      <div className="flex items-start gap-3">
        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-green-50 text-primary">
          <Check className="h-4 w-4" aria-hidden="true" />
        </span>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-semibold text-gray-900">Ajouté au panier</p>
          <p className="mt-0.5 truncate text-xs text-gray-500">{toast.title}</p>
          <div className="mt-3 flex flex-wrap gap-2">
            <Link
              to={ROUTES.cart}
              onNavigate={dismissToast}
              className="inline-flex items-center rounded-full bg-primary px-3 py-1.5 text-xs font-semibold text-white hover:bg-primary/90"
            >
              Voir le panier
            </Link>
            <button
              type="button"
              onClick={dismissToast}
              className="inline-flex items-center rounded-full border border-gray-200 px-3 py-1.5 text-xs font-semibold text-gray-700 hover:bg-gray-50"
            >
              Continuer vos achats
            </button>
          </div>
        </div>
        <button
          type="button"
          aria-label="Fermer"
          onClick={dismissToast}
          className="rounded-lg p-1 text-gray-400 hover:bg-gray-50 hover:text-gray-700"
        >
          <X className="h-4 w-4" aria-hidden="true" />
        </button>
      </div>
    </div>
  )
}
