import { useState, type FormEvent } from 'react'
import { Link, ROUTES } from '../../lib/routing'

export { CartPage } from './CartPage'

export function AccountPage() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [ok, setOk] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim() || !email.includes('@')) {
      setError('Indiquez un email valide.')
      setOk(false)
      return
    }
    if (password.trim().length < 6) {
      setError('Le mot de passe doit contenir au moins 6 caractères.')
      setOk(false)
      return
    }
    setError('')
    setOk(true)
  }

  return (
    <div className="mx-auto max-w-md px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900">
        Mon compte
      </h1>
      <p className="mt-3 text-sm text-gray-600">
        Session locale de démonstration. Aucune redirection externe.
      </p>
      {ok ? (
        <div className="mt-8 rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-sm font-semibold text-primary">
            Connexion enregistrée localement
          </p>
          <p className="mt-1 text-sm text-gray-700">{email}</p>
          <Link
            to={ROUTES.cart}
            className="mt-4 inline-flex text-sm font-semibold text-primary underline"
          >
            Voir mon panier
          </Link>
        </div>
      ) : (
        <form className="mt-8 space-y-4" onSubmit={onSubmit}>
          <label className="block text-sm font-medium text-gray-700">
            Email
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary"
              placeholder="vous@email.com"
              required
            />
          </label>
          <label className="block text-sm font-medium text-gray-700">
            Mot de passe
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="mt-1 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary"
              placeholder="••••••••"
              required
            />
          </label>
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="submit"
            className="inline-flex h-11 w-full items-center justify-center rounded-full bg-primary text-sm font-semibold text-white hover:bg-primary/90"
          >
            Se connecter
          </button>
        </form>
      )}
    </div>
  )
}
