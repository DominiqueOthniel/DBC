import { ArrowLeft, Loader2, Phone, RotateCcw } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import {
  ANSWERS_KEY,
  budgetOptions,
  storageOptions,
  t,
  usageOptions,
  type BudgetOption,
  type StorageOption,
  type UsageOption,
} from '../data/finder'
import { STORES, getStoreStatus, hourFr } from '../data/stores'
import {
  formatEuro,
  getModels,
  modelPrice,
  pickRecommendation,
  productHref,
  type Model,
  type RelaxMode,
} from '../lib/api'
import { useCart } from '../lib/cart'
import { Link, ROUTES } from '../lib/routing'

function OptionButton({
  label,
  track,
  onClick,
}: {
  label: string
  track: string
  onClick: () => void
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      data-track={track}
      data-zone="finder"
      className="w-full rounded-full border border-gray-200 bg-white px-6 py-4 text-left text-base font-semibold text-gray-900 transition hover:border-accent hover:bg-gray-50 active:scale-[0.99]"
    >
      {label}
    </button>
  )
}

function SellerLine({ storeKey }: { storeKey: string }) {
  const store = STORES.find((s) => s.key === storeKey) ?? STORES[0]
  if (!store) return null
  const status = getStoreStatus(store)
  const text =
    status.isOpen && status.label
      ? t('sellerLine', {
          phone: store.phone,
          time: hourFr(status.label),
        })
      : t('sellerLineClosed', { phone: store.phone })

  return (
    <a
      href={`tel:${store.phone.replace(/\s/g, '')}`}
      className="mt-10 flex items-start justify-center gap-2 rounded-xl bg-gray-50 px-4 py-3 text-sm text-gray-700 hover:text-gray-900"
      data-track={`finder:tel_magasin:${store.key}`}
      data-zone="finder"
    >
      <Phone
        className="mt-0.5 h-4 w-4 shrink-0 text-primary"
        aria-hidden="true"
      />
      <span>{text}</span>
    </a>
  )
}

type ResultState = {
  href: string
  relax: RelaxMode
  model: Model
}

export function PhoneFinder() {
  const { addItem } = useCart()
  const [step, setStep] = useState(1)
  const [usage, setUsage] = useState<UsageOption | null>(null)
  const [storage, setStorage] = useState<StorageOption | null>(null)
  const [budget, setBudget] = useState<BudgetOption | null>(null)
  const [models, setModels] = useState<Model[] | null>(null)
  const [taggedModels, setTaggedModels] = useState<{
    tag: string
    items: Model[]
  } | null>(null)
  const [loadFailed, setLoadFailed] = useState(false)
  const [result, setResult] = useState<ResultState | null>(null)
  const [searchFailed, setSearchFailed] = useState(false)
  const searchingRef = useRef(false)
  const storeKey = 'rosny2'

  useEffect(() => {
    let cancelled = false
    getModels({ category: 'mobile', perPage: 100 })
      .then((items) => {
        if (cancelled) return
        setModels(items)
        try {
          const raw = sessionStorage.getItem(ANSWERS_KEY)
          if (!raw) return
          const saved = JSON.parse(raw) as {
            usage?: string
            storage?: string
            budget?: string
          }
          const u = usageOptions.find((o) => o.id === saved.usage)
          const s = storageOptions.find((o) => o.id === saved.storage)
          const b = budgetOptions.find((o) => o.id === saved.budget)
          if (u && s && b) {
            setUsage(u)
            setStorage(s)
            setBudget(b)
            setStep(3)
          }
        } catch {
          /* ignore */
        }
      })
      .catch(() => {
        if (!cancelled) setLoadFailed(true)
      })
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const tag = usage?.tag
    if (!tag) {
      setTaggedModels(null)
      return
    }
    let cancelled = false
    getModels({ category: 'mobile', tag, perPage: 100 }).then((items) => {
      if (!cancelled) setTaggedModels({ tag, items })
    })
    return () => {
      cancelled = true
    }
  }, [usage?.tag])

  const taggedReady =
    !usage?.tag || (taggedModels?.tag === usage.tag ? taggedModels.items : null)

  const catalogHref = ROUTES.smartphones // listing local SPA

  useEffect(() => {
    if (step !== 4 || result || searchFailed || searchingRef.current) return
    if (!models) return
    if (usage?.tag && taggedReady === null) return

    searchingRef.current = true
    let cancelled = false

    const timer = window.setTimeout(() => {
      if (cancelled) return
      const picked = pickRecommendation(
        models,
        usage?.tag ? (taggedReady as Model[]) : null,
        budget,
      )
      if (!picked) {
        setSearchFailed(true)
        searchingRef.current = false
        return
      }
      const href = productHref(picked.model)
      try {
        sessionStorage.setItem(
          ANSWERS_KEY,
          JSON.stringify({
            usage: usage?.id,
            storage: storage?.id,
            budget: budget?.id,
          }),
        )
      } catch {
        /* ignore */
      }
      setResult({ href, relax: picked.relax, model: picked.model })
      searchingRef.current = false
    }, 600)

    return () => {
      cancelled = true
      window.clearTimeout(timer)
      searchingRef.current = false
    }
  }, [
    step,
    result,
    searchFailed,
    models,
    usage,
    storage,
    budget,
    taggedReady,
  ])

  function goUsage(option: UsageOption) {
    setUsage(option)
    setStep(2)
    window.scrollTo({ top: 0 })
  }

  function goStorage(option: StorageOption) {
    setStorage(option)
    setStep(3)
    window.scrollTo({ top: 0 })
  }

  function goBudget(option: BudgetOption) {
    setBudget(option)
    setResult(null)
    setSearchFailed(false)
    searchingRef.current = false
    setStep(4)
    window.scrollTo({ top: 0 })
  }

  function goBack() {
    setStep((s) => (s === 3 ? 2 : 1))
    window.scrollTo({ top: 0 })
  }

  function restart() {
    setStep(1)
    setUsage(null)
    setStorage(null)
    setBudget(null)
    setResult(null)
    setSearchFailed(false)
    searchingRef.current = false
    try {
      sessionStorage.removeItem(ANSWERS_KEY)
    } catch {
      /* ignore */
    }
    window.scrollTo({ top: 0 })
  }

  if (step === 4 && result) {
    const price = modelPrice(result.model)
    return (
      <div className="mx-auto max-w-7xl px-4 py-4 md:py-8">
        <div className="flex items-start justify-between gap-3">
          <h1 className="font-display text-2xl font-bold text-gray-900 md:text-3xl">
            {t('resultTitle')}
          </h1>
          <button
            type="button"
            onClick={restart}
            className="mt-1 flex shrink-0 items-center gap-1.5 text-sm font-medium text-primary underline underline-offset-4 hover:text-primary/80"
            data-track="finder:recommencer"
            data-zone="finder"
          >
            <RotateCcw className="h-4 w-4" aria-hidden="true" />
            {t('restart')}
          </button>
        </div>
        {result.relax !== 'none' && (
          <div className="mt-3 rounded-xl bg-green-50 px-4 py-3">
            <p className="text-sm text-primary">
              {result.relax === 'tag' && t('relaxedTag')}
              {result.relax === 'budget' && t('relaxedBudget')}
              {result.relax === 'fallback' && t('relaxedFallback')}
            </p>
          </div>
        )}
        <div className="mt-6 flex flex-col items-start gap-4 sm:flex-row sm:items-center">
          {result.model.primary_image_url && (
            <img
              src={result.model.primary_image_url}
              alt={result.model.display_name ?? result.model.name}
              className="h-40 w-40 object-contain"
            />
          )}
          <div>
            <p className="text-sm font-medium text-gray-500">
              {result.model.brand}
            </p>
            <p className="font-display text-xl font-bold text-gray-900">
              {result.model.display_name ?? result.model.name}
            </p>
            {price != null && (
              <p className="mt-1 text-base text-gray-700">
                {t('fromPrice', { price: formatEuro(price) })}
              </p>
            )}
            <div className="mt-6 flex flex-wrap gap-3">
              <Link
                to={result.href}
                className="inline-flex items-center rounded-full bg-primary px-6 py-3 font-semibold text-white hover:bg-primary/90"
              >
                {t('seeRecommended')}
              </Link>
              {price != null ? (
                <button
                  type="button"
                  onClick={() =>
                    addItem({
                      slug: result.model.slug,
                      title:
                        result.model.display_name ?? result.model.name,
                      imageUrl: result.model.primary_image_url ?? '',
                      price,
                      color:
                        result.model.default_color ??
                        result.model.colors?.[0],
                      grade: 'Parfait',
                      href: result.href,
                    })
                  }
                  className="inline-flex items-center rounded-full border border-primary px-6 py-3 font-semibold text-primary hover:bg-green-50"
                >
                  Ajouter au panier
                </button>
              ) : null}
            </div>
          </div>
        </div>
        <SellerLine storeKey={storeKey} />
      </div>
    )
  }

  if (step === 4) {
    const showError = searchFailed || (loadFailed && !models)
    return (
      <div className="mx-auto max-w-2xl px-4 py-10 text-center">
        {showError ? (
          <>
            <p className="text-base text-gray-700">{t('loadError')}</p>
            <Link
              to={catalogHref}
              className="mt-4 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-base font-semibold text-white hover:bg-primary/90"
              data-track="finder:erreur_tout_voir"
              data-zone="finder"
            >
              {t('loadErrorCta')}
            </Link>
          </>
        ) : (
          <>
            <Loader2
              className="mx-auto h-8 w-8 animate-spin text-primary"
              aria-hidden="true"
            />
            <p className="mt-4 text-base text-gray-700">{t('searching')}</p>
          </>
        )}
        <SellerLine storeKey={storeKey} />
      </div>
    )
  }

  const meta =
    step === 1
      ? { title: t('q1'), subtitle: null as string | null }
      : step === 2
        ? { title: t('q2'), subtitle: t('q2_subtitle') }
        : { title: t('q3'), subtitle: null }

  return (
    <div className="mx-auto max-w-2xl px-4 py-6 md:py-10">
      <div className="flex items-center justify-between">
        {step > 1 ? (
          <button
            type="button"
            onClick={goBack}
            aria-label={t('back')}
            className="flex h-9 w-9 items-center justify-center rounded-full border border-gray-200 text-gray-700 hover:bg-gray-50"
            data-track="finder:retour"
            data-zone="finder"
          >
            <ArrowLeft className="h-4 w-4" aria-hidden="true" />
          </button>
        ) : (
          <span className="h-9 w-9" aria-hidden="true" />
        )}
        <span className="text-xs font-medium text-gray-500">
          {t('stepLabel', { current: step, total: 3 })}
        </span>
        <Link
          to={catalogHref}
          className="text-sm font-semibold text-primary underline underline-offset-2 hover:text-primary/80"
          data-track={`finder:tout_voir:q${step}`}
          data-zone="finder"
        >
          {t('seeAllTop')}
        </Link>
      </div>

      <div className="mt-3 h-1 overflow-hidden rounded-full bg-gray-200">
        <div
          className="h-full rounded-full bg-accent transition-all duration-300"
          style={{ width: `${(step / 3) * 100}%` }}
        />
      </div>

      <h1 className="mt-6 font-display text-2xl font-bold tracking-tight text-gray-900 md:text-3xl">
        {meta.title}
      </h1>
      {meta.subtitle && (
        <p className="mt-1.5 text-sm text-gray-500">{meta.subtitle}</p>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {step === 1 &&
          usageOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={t(option.labelKey)}
              track={`finder:q1:${option.id}`}
              onClick={() => goUsage(option)}
            />
          ))}
        {step === 2 &&
          storageOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={t(option.labelKey)}
              track={`finder:q2:${option.id}`}
              onClick={() => goStorage(option)}
            />
          ))}
        {step === 3 &&
          budgetOptions.map((option) => (
            <OptionButton
              key={option.id}
              label={t(option.labelKey)}
              track={`finder:q3:${option.id}`}
              onClick={() => goBudget(option)}
            />
          ))}
      </div>

      <div className="mt-6 text-center">
        <Link
          to={catalogHref}
          className="text-sm font-medium text-gray-700 underline underline-offset-4 hover:text-gray-900"
          data-track={`finder:je_sais:q${step}`}
          data-zone="finder"
        >
          {t('knowWhatIWant')}
        </Link>
      </div>

      <SellerLine storeKey={storeKey} />
    </div>
  )
}
