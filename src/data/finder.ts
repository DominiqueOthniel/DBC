export type UsageOption = {
  id: string
  labelKey: keyof typeof finderCopy
  tag: string | null
}

export type StorageOption = {
  id: string
  labelKey: keyof typeof finderCopy
  pref: 'default' | 'large'
}

export type BudgetOption = {
  id: string
  labelKey: keyof typeof finderCopy
  min: number | null
  max: number | null
}

export const finderCopy = {
  title: 'Trouver mon téléphone',
  stepLabel: 'Question {current} sur {total}',
  seeAllTop: 'Tout voir',
  knowWhatIWant: 'Je sais déjà ce que je veux, voir tout le rayon',
  back: 'Retour',
  q1: 'Il va servir à quoi, surtout ?',
  q1_all: 'Un peu de tout',
  q1_camera: 'Photos et vidéos',
  q1_battery: 'Réseaux, jeux, vidéos',
  q1_parent: 'Pour un enfant ou un parent',
  q1_any: 'Peu importe, montrez-moi',
  q2: 'Vous gardez tout sur votre téléphone ?',
  q2_subtitle:
    "Photos, vidéos, applis… c'est ce qui décide de la taille de la mémoire.",
  q2_sort: 'Je fais le tri de temps en temps',
  q2_keep: 'Je garde tout, je ne trie jamais',
  q2_any: 'Aucune idée',
  q3: 'Vous voulez y mettre combien ?',
  q3_under200: 'Moins de 200 €',
  q3_200to400: 'Entre 200 et 400 €',
  q3_400to700: 'Entre 400 et 700 €',
  q3_any: 'Peu importe, montrez-moi le mieux',
  sellerLine: "Un vrai vendeur ? Appelez le {phone}, ouvert jusqu'à {time}.",
  sellerLineClosed: 'Un vrai vendeur ? Appelez le {phone}.',
  searching: "On regarde ce qu'on a en stock pour vous…",
  resultTitle: 'Voilà ce qu\'on vous met de côté.',
  restart: 'Recommencer',
  relaxedTag:
    "Rien en ligne aujourd'hui pour cet usage dans votre budget. Voilà le plus proche.",
  relaxedBudget:
    "Rien en ligne aujourd'hui dans votre budget. Voilà le plus proche.",
  relaxedFallback: "Voilà le moins cher en stock aujourd'hui.",
  loadError: 'Impossible de charger le stock pour le moment.',
  loadErrorCta: 'Voir tout le rayon',
  seeRecommended: 'Voir le produit conseillé',
  fromPrice: 'À partir de {price}',
  localCatalogNote:
    "Aperçu catalogue local: ce modèle n'est pas encore dans l'API DBC. La fiche renvoie vers le 17 Pro Max le plus proche.",
} as const

export const usageOptions: UsageOption[] = [
  { id: 'un-peu-de-tout', labelKey: 'q1_all', tag: null },
  { id: 'photos-videos', labelKey: 'q1_camera', tag: 'best-camera' },
  { id: 'reseaux-jeux-videos', labelKey: 'q1_battery', tag: 'best-battery' },
  { id: 'enfant-parent', labelKey: 'q1_parent', tag: 'parent-approved' },
  { id: 'peu-importe', labelKey: 'q1_any', tag: null },
]

export const storageOptions: StorageOption[] = [
  { id: 'je-trie', labelKey: 'q2_sort', pref: 'default' },
  { id: 'je-garde-tout', labelKey: 'q2_keep', pref: 'large' },
  { id: 'aucune-idee', labelKey: 'q2_any', pref: 'default' },
]

export const budgetOptions: BudgetOption[] = [
  { id: 'moins-200', labelKey: 'q3_under200', min: 0, max: 200 },
  { id: '200-400', labelKey: 'q3_200to400', min: 200, max: 400 },
  { id: '400-700', labelKey: 'q3_400to700', min: 400, max: 700 },
  { id: 'peu-importe', labelKey: 'q3_any', min: null, max: null },
]

export const ANSWERS_KEY = 'dbc:finder:answers:v1'

export function t(
  key: keyof typeof finderCopy,
  vars?: Record<string, string | number>,
) {
  let value: string = finderCopy[key]
  if (vars) {
    for (const [k, v] of Object.entries(vars)) {
      value = value.replace(`{${k}}`, String(v))
    }
  }
  return value
}
