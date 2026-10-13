import { mergeCatalogOverrides } from '../data/catalogOverrides'
import { ROUTES } from './routing'

export type Model = {
  id: string
  slug: string
  name: string
  display_name?: string
  brand: string
  category: string
  primary_image_url: string | null
  price_from: number | null
  price_correct: number | null
  price_imparfait: number | null
  price_tres_bon: number | null
  price_parfait: number | null
  new_price?: number | null
  colors?: string[]
  default_color?: string | null
  delivery_speed?: string | null
  tags: string[]
}

type ModelsResponse = {
  items: Model[]
  page?: number
  pages?: number
  per_page?: number
  total?: number
}

const API_BASE = '/api/public/v1'

/** Baisse catalogue affichée (−2%), arrondi à l'euro. */
export const CATALOG_PRICE_FACTOR = 0.98

const PRICE_FIELDS = [
  'price_from',
  'price_correct',
  'price_imparfait',
  'price_tres_bon',
  'price_parfait',
  'new_price',
] as const

function discountEuro(value: number | null | undefined): number | null {
  if (value == null) return null
  return Math.round(value * CATALOG_PRICE_FACTOR)
}

/** Transform client: −2% sur tous les champs prix d'un modèle. */
export function applyCatalogPriceDiscount(model: Model): Model {
  const next = { ...model }
  for (const key of PRICE_FIELDS) {
    next[key] = discountEuro(model[key])
  }
  return next
}

async function getJson<T>(path: string): Promise<T> {
  const res = await fetch(`${API_BASE}${path}`)
  if (!res.ok) {
    throw new Error(`API ${res.status}`)
  }
  return res.json() as Promise<T>
}

export async function getModels(params: {
  category?: string
  tag?: string
  perPage?: number
} = {}) {
  // L'API attend `per_page` (snake_case).
  const perPage = params.perPage ?? 100
  const all: Model[] = []
  let page = 1
  let pages = 1

  do {
    const q = new URLSearchParams()
    if (params.category) q.set('category', params.category)
    if (params.tag) q.set('tag', params.tag)
    q.set('per_page', String(perPage))
    q.set('page', String(page))
    const data = await getJson<ModelsResponse>(`/models?${q}`)
    all.push(...(data.items ?? []))
    pages = data.pages ?? 1
    page += 1
  } while (page <= pages && page <= 50)

  return mergeCatalogOverrides(all, params).map(applyCatalogPriceDiscount)
}

export function modelPrice(model: Model) {
  return model.price_correct ?? model.price_from ?? null
}

export function productHref(model: Model) {
  return ROUTES.product(model.slug)
}

export function formatEuro(value: number) {
  return `${value.toLocaleString('fr-FR')} €`
}

export type RelaxMode = 'none' | 'tag' | 'budget' | 'fallback'

export function pickRecommendation(
  all: Model[],
  tagged: Model[] | null,
  budget: { min: number | null; max: number | null } | null,
): { model: Model; relax: RelaxMode } | null {
  const withPrice = (list: Model[]) =>
    list.filter((m) => modelPrice(m) != null)
  const byPriceAsc = (a: Model, b: Model) =>
    (modelPrice(a) ?? 0) - (modelPrice(b) ?? 0)
  const byPriceDesc = (a: Model, b: Model) =>
    (modelPrice(b) ?? 0) - (modelPrice(a) ?? 0)

  const allPriced = withPrice(all)
  const taggedPriced = tagged ? withPrice(tagged) : null
  const hasBudget =
    budget?.max != null || (budget?.min != null && budget.min > 0)

  const inBudget = (m: Model) => {
    const p = modelPrice(m) ?? 0
    return p >= (budget?.min ?? 0) && (budget?.max == null || p < budget.max)
  }

  const budgetDistance = (m: Model) => {
    const p = modelPrice(m) ?? 0
    const min = budget?.min ?? 0
    if (p < min) return min - p
    if (budget?.max != null && p >= budget.max) return p - budget.max
    return 0
  }

  type Candidate = { list: Model[]; relax: RelaxMode }
  const pools: Candidate[] = []
  const preferred = taggedPriced ?? allPriced

  if (hasBudget) {
    pools.push({
      list: preferred.filter(inBudget).sort(byPriceAsc),
      relax: 'none',
    })
    if (taggedPriced) {
      pools.push({
        list: allPriced.filter(inBudget).sort(byPriceAsc),
        relax: 'tag',
      })
    }
    pools.push({
      list: [...allPriced].sort(
        (a, b) => budgetDistance(a) - budgetDistance(b) || byPriceAsc(a, b),
      ),
      relax: 'budget',
    })
  } else {
    pools.push({ list: [...preferred].sort(byPriceDesc), relax: 'none' })
    if (taggedPriced) {
      pools.push({ list: [...allPriced].sort(byPriceDesc), relax: 'tag' })
    }
  }
  pools.push({ list: [...allPriced].sort(byPriceAsc), relax: 'fallback' })

  const seen = new Set<string>()
  for (const pool of pools) {
    for (const model of pool.list) {
      if (seen.has(model.id)) continue
      seen.add(model.id)
      return { model, relax: pool.relax }
    }
  }
  return null
}
