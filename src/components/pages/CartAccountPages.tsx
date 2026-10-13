import { Link, ROUTES } from '../../lib/routing'

export function CartPage() {
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
      <p className="mt-6 text-xs text-gray-500">
        Paiement et checkout non branchés ici (backend compte / paiement du site
        officiel).
      </p>
    </div>
  )
}

export function AccountPage() {
  return (
    <div className="mx-auto max-w-md px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900">
        Mon compte
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        Connexion et suivi de commandes nécessitent l’auth du site officiel.
        Cette page reste locale, sans redirection.
      </p>
      <form
        className="mt-8 space-y-4"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
        <label className="block text-sm font-medium text-gray-700">
          Email
          <input
            type="email"
            className="mt-1 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary"
            placeholder="vous@email.com"
          />
        </label>
        <label className="block text-sm font-medium text-gray-700">
          Mot de passe
          <input
            type="password"
            className="mt-1 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary"
            placeholder="••••••••"
          />
        </label>
        <button
          type="submit"
          className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary/90"
        >
          Se connecter
        </button>
      </form>
    </div>
  )
}
