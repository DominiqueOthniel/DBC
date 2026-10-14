import type { Model } from '../lib/api'

/**
 * Entrées catalogue additionnelles (fusionnées avec l'API, dédoublonnage par slug).
 * Prix reconditionnés = MSRP Apple FR (base) ; `getModels` applique −2%.
 * `new_price` = MSRP neuf (non discounté) pour le barré « … neuf ».
 */
export const CATALOG_OVERRIDES: Model[] = [
  {
    id: 'iphone-18-pro-max',
    slug: 'iphone-18-pro-max',
    name: 'iPhone 18 Pro Max',
    display_name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'mobile',
    primary_image_url:
      '/product-images/iphone-18-pro-max/bordeaux/bordeaux-wine.jpg',
    // MSRP Apple FR 256 Go: 1629 € → affiché 1596 € (−2%)
    price_from: 1629,
    price_correct: 1629,
    price_imparfait: 1629,
    price_tres_bon: 1629,
    price_parfait: 1629,
    new_price: 1629,
    colors: ['Bordeaux', 'Glacier', 'Argent', 'Noir'],
    default_color: 'Bordeaux',
    delivery_speed: 'express',
    tags: ['best-camera', 'best-battery'],
  },
  {
    id: 'iphone-18-pro',
    slug: 'iphone-18-pro',
    name: 'iPhone 18 Pro',
    display_name: 'iPhone 18 Pro',
    brand: 'Apple',
    category: 'mobile',
    primary_image_url:
      '/product-images/iphone-18-pro/bordeaux/bordeaux-wine.jpg',
    // MSRP Apple FR 256 Go: 1479 € → affiché 1449 € (−2%)
    price_from: 1479,
    price_correct: 1479,
    price_imparfait: 1479,
    price_tres_bon: 1479,
    price_parfait: 1479,
    new_price: 1479,
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
