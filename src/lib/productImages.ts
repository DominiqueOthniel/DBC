import { CATALOG_IMAGE_FALLBACKS } from '../data/catalogImageFallbacks'
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

/**
 * Alias EN/FR + synonymes de stockage Supabase.
 * Clé = dossier normalisé, valeur = dossier réel souvent présent.
 */
const COLOR_ALIASES: Record<string, string> = {
  silver: 'argent',
  black: 'noir',
  white: 'blanc',
  blue: 'bleu',
  green: 'vert',
  grey: 'gris',
  gray: 'gris',
  purple: 'violet',
  natural: 'titane-naturel',
  desert: 'titane-desert',
  'midnight-blue': 'bleu-nuit',
  cream: 'creme',
  creme: 'beige',
  'bleu-nuit': 'blanc',
  graphite: 'gris',
  sierra: 'bleu',
  'bleu-sierra': 'bleu',
  'titane-desert': 'desert',
  // MacBook UUID folders (Title Case + espaces)
  or: 'gold',
  argent: 'silver',
  'gris-sideral': 'space-grey',
  gold: 'or',
  'space-grey': 'gris-sideral',
}

/**
 * Variantes de segment dossier telles qu’elles existent parfois dans Supabase
 * (espaces, casse). Clé = colorFolder().
 */
const STORAGE_FOLDER_VARIANTS: Record<string, string[]> = {
  'space-grey': ['Space Grey', 'space-grey', 'SpaceGrey'],
  gold: ['Gold', 'gold', 'Or', 'or'],
  silver: ['Silver', 'silver', 'Argent', 'argent'],
  or: ['Or', 'or', 'Gold', 'gold'],
  argent: ['Argent', 'argent', 'Silver', 'silver'],
  'gris-sideral': ['Gris sidéral', 'gris-sideral', 'Space Grey', 'space-grey'],
}

const LOCAL_COLOR_IMAGES: Record<string, Record<string, string>> = {
  'iphone-18-pro-max': {
    Bordeaux: '/product-images/iphone-18-pro-max/bordeaux/bordeaux-wine.jpg',
    Glacier: '/product-images/iphone-18-pro-max/glacier/0.jpg',
    Argent: '/product-images/iphone-18-pro-max/argent/0.jpg',
    Noir: '/product-images/iphone-18-pro-max/noir/0.jpg',
  },
  'iphone-18-pro': {
    Bordeaux: '/product-images/iphone-18-pro/bordeaux/bordeaux-wine.jpg',
    Glacier: '/product-images/iphone-18-pro/glacier/0.jpg',
    Argent: '/product-images/iphone-18-pro/argent/0.jpg',
    Noir: '/product-images/iphone-18-pro/noir/0.jpg',
  },
}

/** Placeholder neutre (évite l’icône bleue navigateur). */
export const PRODUCT_IMAGE_PLACEHOLDER =
  "data:image/svg+xml;charset=utf-8," +
  encodeURIComponent(
    `<svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" viewBox="0 0 400 400">
      <rect width="400" height="400" fill="#f5f5f5"/>
      <rect x="140" y="90" width="120" height="220" rx="16" fill="#ebebeb" stroke="#d4d4d4"/>
      <circle cx="200" cy="150" r="18" fill="#d4d4d4"/>
    </svg>`,
  )

/** Encode chaque segment de chemin (espaces → %20) sans toucher au host. */
export function encodeImageUrl(url: string): string {
  if (!url || url.startsWith('data:') || url.startsWith('/')) {
    // chemins locaux: encode segments sauf leading /
    if (url.startsWith('/') && !url.startsWith('//')) {
      return (
        '/' +
        url
          .slice(1)
          .split('/')
          .map((seg) => encodeURIComponent(decodeURIComponentSafe(seg)))
          .join('/')
      )
    }
    return url
  }
  try {
    const u = new URL(url)
    u.pathname = u.pathname
      .split('/')
      .map((seg) => encodeURIComponent(decodeURIComponentSafe(seg)))
      .join('/')
    return u.toString()
  } catch {
    return url.replace(/ /g, '%20')
  }
}

function decodeURIComponentSafe(seg: string) {
  try {
    return decodeURIComponent(seg)
  } catch {
    return seg
  }
}

function folderCandidates(color: string): string[] {
  const raw = colorFolder(color)
  const out = [raw]
  let cur: string | undefined = COLOR_ALIASES[raw]
  const seen = new Set(out)
  // Follow a few hops, avoid infinite loops (bidirectional aliases)
  for (let i = 0; i < 6 && cur && !seen.has(cur); i++) {
    out.push(cur)
    seen.add(cur)
    cur = COLOR_ALIASES[cur]
  }
  if (raw.startsWith('titane-')) out.push(raw.replace(/^titane-/, ''))
  return [...new Set(out)]
}

/** Segments dossier à tenter dans l’URL (casse / espaces inclus). */
function storageFolderSegments(color: string): string[] {
  const keys = folderCandidates(color)
  const segs: string[] = []
  for (const key of keys) {
    segs.push(key)
    const variants = STORAGE_FOLDER_VARIANTS[key]
    if (variants) segs.push(...variants)
  }
  return [...new Set(segs)]
}

function parseProductImagePath(url: string): {
  prefix: string
  colorSeg: string
  file: string
} | null {
  const decoded = decodeURIComponentSafe(url)
  const remote = decoded.match(
    /^(.*\/product-images\/[^/]+\/)([^/]+)(\/[^/?#]+)$/i,
  )
  if (remote) {
    return { prefix: remote[1], colorSeg: remote[2], file: remote[3] }
  }
  const local = decoded.match(
    /^(\/product-images\/[^/]+\/)([^/]+)(\/[^/?#]+)$/i,
  )
  if (local) {
    return { prefix: local[1], colorSeg: local[2], file: local[3] }
  }
  // Bucket catalogue: …/catalog-images/{slug}/{color}.{ext}
  const catalog = decoded.match(
    /^(.*\/catalog-images\/[^/]+\/)([^/.]+)(\.[^/?#]+)$/i,
  )
  if (catalog) {
    return { prefix: catalog[1], colorSeg: catalog[2], file: catalog[3] }
  }
  return null
}

function localImageForColor(slug: string, color: string): string | null {
  const byName = LOCAL_COLOR_IMAGES[slug]?.[color]
  if (byName) return byName
  const localByFolder = LOCAL_COLOR_IMAGES[slug]
  if (!localByFolder) return null
  const folder = colorFolder(color)
  const hit = Object.entries(localByFolder).find(
    ([name]) => colorFolder(name) === folder,
  )
  return hit?.[1] ?? null
}

function catalogFallback(slug: string) {
  return CATALOG_IMAGE_FALLBACKS[slug] ?? null
}

function catalogImageForColor(slug: string, color?: string | null): string | null {
  const set = catalogFallback(slug)
  if (!set) return null
  if (!color) return set.primary
  for (const key of folderCandidates(color)) {
    if (set.byColor[key]) return set.byColor[key]
  }
  return set.primary
}

/** Remplit primary_image_url manquant depuis le registre catalogue DBC. */
export function withCatalogImageFallback<T extends Model>(model: T): T {
  if (model.primary_image_url) return model
  const set = catalogFallback(model.slug)
  if (!set) return model
  return { ...model, primary_image_url: set.primary }
}

/**
 * Couleur initiale: packshot primary (URL connue bonne) → default (alias) → 1re couleur.
 * On privilégie le dossier déjà présent dans primary_image_url pour éviter les 404 Supabase.
 */
export function pickInitialColor(
  model: Pick<Model, 'slug' | 'colors' | 'default_color' | 'primary_image_url'>,
): string {
  const colors = model.colors ?? []
  if (!colors.length) return model.default_color ?? ''

  const effectivePrimary =
    model.primary_image_url || catalogFallback(model.slug)?.primary || null

  const parsed = effectivePrimary
    ? parseProductImagePath(effectivePrimary)
    : null
  if (parsed) {
    const primaryFolders = new Set([
      colorFolder(parsed.colorSeg),
      ...folderCandidates(parsed.colorSeg),
    ])
    const byPrimary = colors.find((c) =>
      folderCandidates(c).some((f) => primaryFolders.has(f)),
    )
    if (byPrimary) return byPrimary
  }

  // Fallback catalogue: préfère une couleur qui a un fichier dédié
  const set = catalogFallback(model.slug)
  if (set) {
    const withFile = colors.find((c) =>
      folderCandidates(c).some((f) => Boolean(set.byColor[f])),
    )
    if (withFile) return withFile
  }

  const defaultKey = colorFolder(model.default_color ?? '')
  const defaultAliases = new Set(
    defaultKey ? folderCandidates(model.default_color ?? '') : [],
  )
  const byDefault = colors.find((c) => {
    const folders = folderCandidates(c)
    return folders.some((f) => defaultAliases.has(f) || f === defaultKey)
  })
  if (byDefault) return byDefault

  return colors[0] ?? model.default_color ?? ''
}

/**
 * Liste d’URLs à essayer pour une finition (rewrites + primary en secours).
 */
export function imageCandidatesForColor(
  model: Pick<Model, 'slug' | 'primary_image_url' | 'default_color'>,
  color?: string | null,
): string[] {
  const catalog = catalogImageForColor(model.slug, color)
  const primaryRaw = model.primary_image_url || catalogFallback(model.slug)?.primary
  const primary = primaryRaw ? encodeImageUrl(primaryRaw) : null

  if (!color) {
    const out = [catalog, primary].filter(Boolean) as string[]
    return [...new Set(out.map(encodeImageUrl))]
  }

  const local = localImageForColor(model.slug, color)
  if (local) return [local]

  const out: string[] = []
  if (catalog) out.push(catalog)

  if (!primaryRaw || !primary) {
    return [...new Set(out.map(encodeImageUrl))]
  }

  const parsed = parseProductImagePath(primaryRaw)
  if (!parsed) {
    out.push(primary)
    return [...new Set(out.map(encodeImageUrl))]
  }

  const folders = folderCandidates(color)
  const primaryKey = colorFolder(parsed.colorSeg)
  const primaryFolders = new Set([
    primaryKey,
    ...folderCandidates(parsed.colorSeg),
  ])

  if (folders.some((f) => primaryFolders.has(f))) {
    out.push(primary)
  }

  const segments = storageFolderSegments(color)
  for (const seg of segments) {
    if (colorFolder(seg) === primaryKey && seg === parsed.colorSeg) continue
    const built = encodeImageUrl(`${parsed.prefix}${seg}${parsed.file}`)
    out.push(built)
  }
  if (!out.includes(primary)) out.push(primary)
  return [...new Set(out.map(encodeImageUrl))]
}

/**
 * Image produit pour une finition (1er candidat).
 * Les composants doivent enchaîner via onError + imageCandidatesForColor.
 */
export function imageForColor(
  model: Pick<Model, 'slug' | 'primary_image_url' | 'default_color'>,
  color?: string | null,
): string | null {
  const candidates = imageCandidatesForColor(model, color)
  return candidates[0] ?? null
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
