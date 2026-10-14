import type { Model } from './api'

/** Dossier couleur catalogue (slug kebab sans accents). */
export function colorFolder(name: string): string {
  return name
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')
}

/** Alias fréquents API / UI. */
const COLOR_ALIASES: Record<string, string> = {
  silver: 'argent',
  black: 'noir',
  white: 'blanc',
  blue: 'bleu',
  green: 'vert',
  natural: 'titane-naturel',
  desert: 'titane-desert',
}

const LOCAL_COLOR_IMAGES: Record<string, Record<string, string>> = {
  'iphone-18-pro-max': {
    Bordeaux: '/product-images/iphone-18-pro-max/bordeaux/bordeaux-wine.jpg',
    Glacier: '/product-images/iphone-18-pro-max/glacier/0.jpg',
    Argent: '/product-images/iphone-18-pro-max/argent/0.jpg',
    Noir: '/product-images/iphone-18-pro-max/noir/0.jpg',
  },
}

function folderCandidates(color: string): string[] {
  const raw = colorFolder(color)
  const alias = COLOR_ALIASES[raw]
  const out = [raw]
  if (alias) out.push(alias)
  // "Titane désert" parfois stocké sans accents déjà géré; variantes
  if (raw.startsWith('titane-')) out.push(raw)
  return [...new Set(out)]
}

/**
 * Image produit pour une finition.
 * 1) assets locaux (18 Pro Max)
 * 2) remplacement du dossier couleur dans primary_image_url (catalogue API)
 * 3) fallback primary
 */
export function imageForColor(
  model: Pick<Model, 'slug' | 'primary_image_url' | 'default_color'>,
  color?: string | null,
): string | null {
  const primary = model.primary_image_url
  if (!color) return primary

  const local = LOCAL_COLOR_IMAGES[model.slug]?.[color]
  if (local) return local

  // match local by folder too
  const localByFolder = LOCAL_COLOR_IMAGES[model.slug]
  if (localByFolder) {
    const folder = colorFolder(color)
    const hit = Object.entries(localByFolder).find(
      ([name]) => colorFolder(name) === folder,
    )
    if (hit) return hit[1]
  }

  if (!primary) return null

  const folders = folderCandidates(color)
  // …/product-images/{slug}/{colorFolder}/0.jpg
  const m = primary.match(
    /^(.*\/product-images\/[^/]+\/)([^/]+)(\/[^/?#]+)$/i,
  )
  if (m) {
    const [, prefix, , file] = m
    // Prefer first candidate; browser will 404 → we also try default_color below via caller
    return `${prefix}${folders[0]}${file}`
  }

  // Local public path style
  const localPath = primary.match(
    /^(\/product-images\/[^/]+\/)([^/]+)(\/[^/?#]+)$/i,
  )
  if (localPath) {
    const [, prefix, , file] = localPath
    return `${prefix}${folders[0]}${file}`
  }

  return primary
}

/** Précharge les URLs couleur pour éviter flash blanc. */
export function preloadColorImages(urls: string[]) {
  if (typeof window === 'undefined') return
  for (const url of urls) {
    if (!url) continue
    const img = new Image()
    img.src = url
  }
}
