/**
 * Packshots pour modèles API sans primary_image_url.
 * Source: bucket DBC `catalog-images` (même catalogue que dbcstore).
 */
export type CatalogImageSet = {
  /** Image par défaut (listing / fallback). */
  primary: string
  /** Dossier couleur normalisé → URL. */
  byColor: Record<string, string>
}

const CAT =
  'https://auwiezirfgkytxoeciur.supabase.co/storage/v1/object/public/catalog-images'

function samsung(slug: string, file: string) {
  return `${CAT}/samsung-${slug}/${file}`
}

export const CATALOG_IMAGE_FALLBACKS: Record<string, CatalogImageSet> = {
  'galaxy-z-flip7': {
    primary: samsung('galaxy-z-flip7', 'noir.jpg'),
    byColor: {
      noir: samsung('galaxy-z-flip7', 'noir.jpg'),
      bleu: samsung('galaxy-z-flip7', 'bleu.jpg'),
      rouge: samsung('galaxy-z-flip7', 'rouge.jpg'),
      // Vert: pas d’asset catalogue → fallback noir
      vert: samsung('galaxy-z-flip7', 'noir.jpg'),
    },
  },
  'galaxy-z-flip7-fe': {
    primary: samsung('galaxy-z-flip7-fe', 'noir.jpg'),
    byColor: {
      noir: samsung('galaxy-z-flip7-fe', 'noir.jpg'),
      blanc: samsung('galaxy-z-flip7-fe', 'blanc.jpg'),
    },
  },
  'galaxy-z-fold7': {
    primary: samsung('galaxy-z-fold7', 'bleu.webp'),
    byColor: {
      bleu: samsung('galaxy-z-fold7', 'bleu.webp'),
      noir: samsung('galaxy-z-fold7', 'noir.webp'),
      argent: samsung('galaxy-z-fold7', 'argent.webp'),
      vert: samsung('galaxy-z-fold7', 'vert.webp'),
    },
  },
  'galaxy-s25-edge': {
    primary: samsung('galaxy-s25-edge', 'noir.webp'),
    byColor: {
      argent: samsung('galaxy-s25-edge', 'argent.webp'),
      bleu: samsung('galaxy-s25-edge', 'bleu.webp'),
      noir: samsung('galaxy-s25-edge', 'noir.webp'),
    },
  },
  'galaxy-s25-fe': {
    primary: samsung('galaxy-s25-fe', 'bleu.webp'),
    byColor: {
      blanc: samsung('galaxy-s25-fe', 'blanc.webp'),
      bleu: samsung('galaxy-s25-fe', 'bleu.webp'),
      'bleu-fonce': samsung('galaxy-s25-fe', 'bleu-fonce.webp'),
      noir: samsung('galaxy-s25-fe', 'noir.webp'),
    },
  },
  'galaxy-a40': {
    primary: samsung('galaxy-a40', 'noir.webp'),
    byColor: {
      noir: samsung('galaxy-a40', 'noir.webp'),
      corail: samsung('galaxy-a40', 'corail.webp'),
      bleu: samsung('galaxy-a40', 'bleu.webp'),
      blanc: samsung('galaxy-a40', 'blanc.webp'),
    },
  },
  'galaxy-a15': {
    primary: samsung('galaxy-a15', 'noir.webp'),
    byColor: {
      noir: samsung('galaxy-a15', 'noir.webp'),
      jaune: samsung('galaxy-a15', 'jaune.webp'),
      bleu: samsung('galaxy-a15', 'bleu.webp'),
    },
  },
  'galaxy-s26': {
    primary: samsung('galaxy-s26', 'noir.jpg'),
    byColor: {
      blanc: samsung('galaxy-s26', 'blanc.jpg'),
      noir: samsung('galaxy-s26', 'noir.jpg'),
      bleu: samsung('galaxy-s26', 'bleu.jpg'),
      violet: samsung('galaxy-s26', 'violet.jpg'),
      argent: samsung('galaxy-s26', 'argent.jpg'),
      mauve: samsung('galaxy-s26', 'violet.jpg'),
    },
  },
  'galaxy-s26-plus': {
    primary: samsung('galaxy-s26-plus', 'noir.jpg'),
    byColor: {
      bleu: samsung('galaxy-s26-plus', 'bleu.jpg'),
      violet: samsung('galaxy-s26-plus', 'violet.jpg'),
      noir: samsung('galaxy-s26-plus', 'noir.jpg'),
      mauve: samsung('galaxy-s26-plus', 'violet.jpg'),
      blanc: samsung('galaxy-s26-plus', 'blanc.jpg'),
      argent: samsung('galaxy-s26-plus', 'argent.jpg'),
    },
  },
}
