import { ROUTES } from './routing'

export type ChatLink = { label: string; href: string }

export type ChatReply = {
  text: string
  links?: ChatLink[]
  suggestions?: string[]
}

const DEFAULT_SUGGESTIONS = [
  'Où sont vos magasins ?',
  'Comment trouver mon téléphone ?',
  'Voir mon panier',
  'Reprise et réparation',
  'Stock et livraison',
]

function normalize(input: string) {
  return input
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLowerCase()
    .trim()
}

/** Assistant local DBC: réponses FAQ sans API externe. */
export function replyToChat(raw: string): ChatReply {
  const q = normalize(raw)

  if (!q) {
    return {
      text: 'Dis-moi ce dont tu as besoin: magasin, panier, trouver un téléphone, reprise ou livraison.',
      suggestions: DEFAULT_SUGGESTIONS,
    }
  }

  if (
    /(bonjour|salut|hello|hey|bonsoir|coucou)/.test(q) ||
    q === 'hi'
  ) {
    return {
      text: 'Salut ! Je suis l’assistant DBC. Je peux t’aider pour le stock, nos magasins, le panier, le quiz « Trouver mon téléphone » ou la reprise.',
      suggestions: DEFAULT_SUGGESTIONS,
    }
  }

  if (/(magasin|boutique|store|adresse|horaires|ouvert)/.test(q)) {
    return {
      text: 'DBC a plusieurs boutiques en France (Paris, Rosny, Aulnay…). Tu peux voir les adresses, horaires et contacts sur la page Magasins.',
      links: [{ label: 'Voir nos magasins', href: ROUTES.stores }],
      suggestions: ['Contact', 'Garantie', 'Reprise et réparation'],
    }
  }

  if (/(panier|cart|commande|checkout|acheter)/.test(q)) {
    return {
      text: 'Ton panier est enregistré sur cet appareil. Tu peux modifier les quantités ou vider le panier depuis la page Panier.',
      links: [{ label: 'Ouvrir mon panier', href: ROUTES.cart }],
      suggestions: ['Stock et livraison', 'Trouver mon téléphone', 'Retours'],
    }
  }

  if (
    /(trouver|quiz|conseil|recommande|quel telephone|quel iphone|besoin)/.test(
      q,
    )
  ) {
    return {
      text: 'Le parcours « Trouver mon téléphone » te propose un modèle selon ton usage et ton budget, en quelques questions.',
      links: [{ label: 'Lancer le quiz', href: ROUTES.trouver }],
      suggestions: ['Voir les smartphones', 'Stock et livraison', 'Garanties'],
    }
  }

  if (/(reprise|rachat|trade|ancien telephone|echanger)/.test(q)) {
    return {
      text: 'Tu peux estimer la reprise de ton ancien appareil en ligne, puis finaliser en boutique ou avec notre équipe.',
      links: [{ label: 'Estimer ma reprise', href: ROUTES.reprise }],
      suggestions: ['Réparation', 'Magasins', 'Contact'],
    }
  }

  if (/(repar|panne|ecran|batterie|casse)/.test(q)) {
    return {
      text: 'Nos techniciens réparent smartphones et tablettes en magasin. Indique le type de panne pour une estimation.',
      links: [{ label: 'Demander une réparation', href: ROUTES.reparation }],
      suggestions: ['Magasins', 'Garantie', 'Contact'],
    }
  }

  if (/(stock|dispo|disponible|livraison|expedi|delai|24h|express)/.test(q)) {
    return {
      text: 'Les stocks sont mis à jour sur chaque fiche produit. Beaucoup d’articles partent en express (souvent sous 24 à 72h). Détails sur la politique d’expédition.',
      links: [
        { label: 'Voir les smartphones', href: ROUTES.smartphones },
        { label: 'Politique d’expédition', href: ROUTES.shipping },
      ],
      suggestions: ['Offres du moment', 'Panier', 'Retours'],
    }
  }

  if (/(garanti|sav|qualite|controle|reconditionn)/.test(q)) {
    return {
      text: 'Nos appareils reconditionnés passent jusqu’à 100 points de contrôle, avec une garantie de 12 à 24 mois selon le produit et un SAV en boutique.',
      links: [
        { label: 'Le standard DBC Labs', href: ROUTES.quality },
        { label: 'FAQ', href: ROUTES.faq },
      ],
      suggestions: ['Retours', 'Magasins', 'Contact'],
    }
  }

  if (/(retour|retract|rembours)/.test(q)) {
    return {
      text: 'Tu disposes de 14 jours pour exercer ton droit de rétractation. La procédure est détaillée dans nos conditions de remboursement.',
      links: [
        { label: 'Politique de remboursement', href: ROUTES.refund },
        { label: 'FAQ', href: ROUTES.faq },
      ],
      suggestions: ['Contact', 'Panier', 'Magasins'],
    }
  }

  if (/(contact|telephone|appeler|email|mail|aide|support)/.test(q)) {
    return {
      text: 'Tu peux nous joindre au 09 39 24 10 82 ou par email à contact@dbcstore.fr. Le service client répond en général sous 24h (8h–20h30).',
      links: [{ label: 'Page contact', href: ROUTES.contact }],
      suggestions: ['Magasins', 'FAQ', 'Panier'],
    }
  }

  if (/(offre|deal|promo|pas cher|bon plan)/.test(q)) {
    return {
      text: 'Les bons plans du moment sont regroupés sur la page Offres et en haut de l’accueil (DBC DEAL).',
      links: [
        { label: 'Voir les offres', href: ROUTES.offres },
        { label: 'Accueil', href: ROUTES.home },
      ],
      suggestions: ['Smartphones', 'Trouver mon téléphone', 'Panier'],
    }
  }

  if (/(smartphone|iphone|telephone|mobile|catalogue)/.test(q)) {
    return {
      text: 'Le rayon smartphones regroupe nos iPhone et Android reconditionnés, avec filtres et fiches détaillées.',
      links: [{ label: 'Voir les smartphones', href: ROUTES.smartphones }],
      suggestions: ['Trouver mon téléphone', 'Stock et livraison', 'Offres'],
    }
  }

  if (/(merci|thanks|nickel|parfait|ok)/.test(q)) {
    return {
      text: 'Avec plaisir. Je reste dispo si tu as une autre question.',
      suggestions: DEFAULT_SUGGESTIONS,
    }
  }

  return {
    text: 'Je n’ai pas tout compris. Tu peux reformuler, ou choisir une suggestion ci-dessous. Pour un humain: 09 39 24 10 82 ou contact@dbcstore.fr.',
    links: [
      { label: 'FAQ', href: ROUTES.faq },
      { label: 'Contact', href: ROUTES.contact },
    ],
    suggestions: DEFAULT_SUGGESTIONS,
  }
}

export function welcomeMessage(): ChatReply {
  return {
    text: 'Bonjour ! Je suis l’assistant DBC. Pose ta question ou choisis une suggestion.',
    suggestions: DEFAULT_SUGGESTIONS,
  }
}
