import type { Model } from '../lib/api'

/** Entrées catalogue additionnelles (fusionnées avec l'API, dédoublonnage par slug). */
export const CATALOG_OVERRIDES: Model[] = [
  {
    id: 'iphone-18-pro-max',
    slug: 'iphone-18-pro-max',
    name: 'iPhone 18 Pro Max',
    display_name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'mobile',
    primary_image_url: '/product-images/iphone-18-pro-max/bordeaux/0.jpg',
    // Base avant la baisse globale −2% appliquée dans getModels.
    price_from: 1210,
    price_correct: 1320,
    price_imparfait: 1210,
    price_tres_bon: 1470,
    price_parfait: 1590,
    new_price: 1599,
    // Finitions officielles Apple FR (ordre shop: Bordeaux, Glacier, Argent, Noir)
    colors: ['Bordeaux', 'Glacier', 'Argent', 'Noir'],
    default_color: 'Bordeaux',
    delivery_speed: 'express',
    tags: ['best-camera', 'best-battery'],
  },
]

export function mergeCatalogOverrides(
  items: Model[],
  params: { category?: string; tag?: string },
): Model[] {
  const extras = CATALOG_OVERRIDES.filter((model) => {
    if (params.category && model.category !== params.category) return false
    if (params.tag && !model.tags.includes(params.tag)) return false
    if (items.some((item) => item.slug === model.slug || item.id === model.id)) {
      return false
    }
    return true
  })
  return [...extras, ...items]
}
