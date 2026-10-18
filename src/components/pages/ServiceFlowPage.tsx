import { useState } from 'react'
import { Link, ROUTES } from '../../lib/routing'

const CATEGORIES = [
  { id: 'iphone', label: 'iPhone' },
  { id: 'samsung', label: 'Samsung' },
  { id: 'other', label: 'Autre' },
]

const CONDITIONS = [
  { id: 'parfait', label: 'Parfait', hint: 'Comme neuf' },
  { id: 'tres-bon', label: 'Très bon', hint: 'Micro-rayures' },
  { id: 'correct', label: 'Correct', hint: 'Usure visible' },
]

export function ReprisePage() {
  const [step, setStep] = useState(1)
  const [category, setCategory] = useState('')
  const [modelName, setModelName] = useState('')
  const [condition, setCondition] = useState('')
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  function nextFromCategory(id: string) {
    setCategory(id)
    setError('')
    setStep(2)
  }

  function nextFromModel() {
    if (!modelName.trim()) {
      setError('Indique le modèle de ton appareil.')
      return
    }
    setError('')
    setStep(3)
  }

  function finish(cond: string) {
    setCondition(cond)
    setDone(true)
    setStep(4)
  }

  if (done) {
    const estimate =
      condition === 'parfait' ? 280 : condition === 'tres-bon' ? 210 : 140
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
          Estimation envoyée
        </h1>
        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-sm font-semibold text-primary">
            Merci ! Estimation indicative pour {modelName || category}
          </p>
          <p className="mt-2 text-2xl font-bold text-gray-900">
            jusqu’à {estimate} €
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Validation finale en magasin après contrôle. État sélectionné :{' '}
            {CONDITIONS.find((c) => c.id === condition)?.label}.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={ROUTES.stores}
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Voir nos magasins
          </Link>
          <button
            type="button"
            onClick={() => {
              setDone(false)
              setStep(1)
              setCategory('')
              setModelName('')
              setCondition('')
            }}
            className="inline-flex rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700 hover:bg-gray-50"
          >
            Nouvelle estimation
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
        Estimer la reprise de ton appareil chez DBC
      </h1>
      <p className="mt-3 text-base text-gray-600">
        Quel appareil veux-tu revendre ? Choisis sa catégorie. On vérifiera
        ensuite son état ensemble.
      </p>
      <ol className="mt-6 flex flex-wrap gap-2 text-sm font-medium">
        {['Catégorie', 'Modèle', 'État'].map((label, i) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 ${
              step === i + 1
                ? 'bg-primary text-white'
                : step > i + 1
                  ? 'bg-green-50 text-primary'
                  : 'bg-gray-100 text-gray-500'
            }`}
          >
            {i + 1} {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <div className="mt-8 grid gap-3 sm:grid-cols-3">
          {CATEGORIES.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => nextFromCategory(c.id)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-6 text-center text-base font-semibold text-gray-900 transition hover:border-primary hover:shadow-sm"
            >
              {c.label}
            </button>
          ))}
        </div>
      )}

      {step === 2 && (
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-900">
            Modèle
            <input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Ex. iPhone 14 Pro 128 Go"
              className="mt-2 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary"
            />
          </label>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700"
            >
              Retour
            </button>
            <button
              type="button"
              onClick={nextFromModel}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 grid gap-3">
          {CONDITIONS.map((c) => (
            <button
              key={c.id}
              type="button"
              onClick={() => finish(c.id)}
              className="rounded-xl border border-gray-200 bg-white px-4 py-4 text-left transition hover:border-primary"
            >
              <span className="block text-base font-semibold text-gray-900">
                {c.label}
              </span>
              <span className="text-sm text-gray-500">{c.hint}</span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-2 self-start text-sm font-semibold text-primary underline"
          >
            Retour
          </button>
        </div>
      )}
    </div>
  )
}

const BRANDS = ['Apple', 'Samsung', 'Xiaomi', 'Autre']
const ISSUES = [
  { id: 'screen', label: 'Écran cassé / fissuré', price: 129 },
  { id: 'battery', label: 'Batterie à remplacer', price: 79 },
  { id: 'charge', label: 'Connecteur de charge', price: 69 },
  { id: 'other', label: 'Autre panne', price: 99 },
]

export function RepairPage() {
  const [step, setStep] = useState(1)
  const [brand, setBrand] = useState('')
  const [modelName, setModelName] = useState('')
  const [issue, setIssue] = useState<(typeof ISSUES)[number] | null>(null)
  const [error, setError] = useState('')
  const [done, setDone] = useState(false)

  if (done && issue) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
        <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
          Estimation réparation
        </h1>
        <div className="mt-6 rounded-xl border border-green-100 bg-green-50 p-5">
          <p className="text-sm font-semibold text-primary">
            {brand} {modelName}
          </p>
          <p className="mt-1 text-sm text-gray-700">{issue.label}</p>
          <p className="mt-3 text-2xl font-bold text-gray-900">
            à partir de {issue.price} €
          </p>
          <p className="mt-2 text-sm text-gray-600">
            Prix indicatif. Confirmation après diagnostic en boutique.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            to={ROUTES.stores}
            className="inline-flex rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white hover:bg-primary/90"
          >
            Trouver un magasin
          </Link>
          <button
            type="button"
            onClick={() => {
              setDone(false)
              setStep(1)
              setBrand('')
              setModelName('')
              setIssue(null)
            }}
            className="inline-flex rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold text-gray-700"
          >
            Recommencer
          </button>
        </div>
      </div>
    )
  }

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
        {['Marque', 'Modèle', 'Réparation', 'Estimation'].map((label, i) => (
          <li
            key={label}
            className={`rounded-full px-3 py-1 ${
              step === i + 1 ? 'bg-primary text-white' : 'bg-gray-100'
            }`}
          >
            {i + 1} {label}
          </li>
        ))}
      </ol>

      {step === 1 && (
        <>
          <h2 className="mt-8 font-display text-lg font-semibold text-gray-900">
            Quelle est la marque de votre appareil ?
          </h2>
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            {BRANDS.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => {
                  setBrand(b)
                  setStep(2)
                }}
                className="rounded-xl border border-gray-200 bg-white px-4 py-5 text-left text-base font-semibold text-gray-900 transition hover:border-primary"
              >
                {b}
              </button>
            ))}
          </div>
        </>
      )}

      {step === 2 && (
        <div className="mt-8">
          <label className="block text-sm font-semibold text-gray-900">
            Modèle
            <input
              value={modelName}
              onChange={(e) => setModelName(e.target.value)}
              placeholder="Ex. Galaxy S23"
              className="mt-2 h-11 w-full rounded-lg border border-gray-200 px-3 text-sm outline-none focus:border-primary"
            />
          </label>
          {error ? <p className="mt-2 text-sm text-red-600">{error}</p> : null}
          <div className="mt-4 flex gap-3">
            <button
              type="button"
              onClick={() => setStep(1)}
              className="rounded-full border border-gray-200 px-5 py-2.5 text-sm font-semibold"
            >
              Retour
            </button>
            <button
              type="button"
              onClick={() => {
                if (!modelName.trim()) {
                  setError('Indiquez le modèle.')
                  return
                }
                setError('')
                setStep(3)
              }}
              className="rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-white"
            >
              Continuer
            </button>
          </div>
        </div>
      )}

      {step === 3 && (
        <div className="mt-8 grid gap-3">
          {ISSUES.map((item) => (
            <button
              key={item.id}
              type="button"
              onClick={() => {
                setIssue(item)
                setDone(true)
                setStep(4)
              }}
              className="flex items-center justify-between rounded-xl border border-gray-200 bg-white px-4 py-4 text-left hover:border-primary"
            >
              <span className="font-semibold text-gray-900">{item.label}</span>
              <span className="text-sm font-bold text-gray-700">
                dès {item.price} €
              </span>
            </button>
          ))}
          <button
            type="button"
            onClick={() => setStep(2)}
            className="mt-2 self-start text-sm font-semibold text-primary underline"
          >
            Retour
          </button>
        </div>
      )}
    </div>
  )
}
