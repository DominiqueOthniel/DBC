import type { Model } from '../lib/api'

/**
 * Overrides locaux du catalogue finder.
 * L'API publique Railway n'expose pas encore ces modèles (POST /models → 405).
 * Retirer une entrée dès qu'elle apparaît dans l'API (merge dédoublonne par slug).
 */
export const LOCAL_CATALOG_OVERRIDES: Model[] = [
  {
    id: 'local-iphone-18-pro-max',
    slug: 'iphone-18-pro-max',
    name: 'iPhone 18 Pro Max',
    display_name: 'iPhone 18 Pro Max',
    brand: 'Apple',
    category: 'mobile',
    // Image catalogue absente: fallback visuel sur le 17 Pro Max (même gamme).
    primary_image_url:
      'https://xbcfxgoysecsbboyvlpu.supabase.co/storage/v1/object/public/product-images/iphone-17-pro-max/argent/0.jpg',
    // Un cran au-dessus du 17 Pro Max (correct 1210 / from 1110).
    price_from: 1210,
    price_correct: 1320,
    price_imparfait: 1210,
    price_tres_bon: 1470,
    price_parfait: 1590,
    tags: ['best-camera', 'best-battery'],
  },
]

export function isLocalCatalogModel(model: Model) {
  return model.id.startsWith('local-')
}

/** Fiche live la plus proche tant que le slug n'existe pas sur dbcstore.fr */
export function localModelFallbackHref(model: Model) {
  if (model.slug === 'iphone-18-pro-max') {
    return 'https://dbcstore.fr/fr/products/smartphones/apple/iphone-17-pro-max'
  }
  return null
}

export function mergeCatalogOverrides(
  items: Model[],
  params: { category?: string; tag?: string },
): Model[] {
  const extras = LOCAL_CATALOG_OVERRIDES.filter((model) => {
    if (params.category && model.category !== params.category) return false
    if (params.tag && !model.tags.includes(params.tag)) return false
    if (items.some((item) => item.slug === model.slug || item.id === model.id)) {
      return false
    }
    return true
  })
  return [...extras, ...items]
}
