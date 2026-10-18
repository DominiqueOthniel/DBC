export type ContentBlock = {
  title?: string
  body: string
}

export type SitePage = {
  path: string
  title: string
  subtitle?: string
  blocks: ContentBlock[]
  cta?: { label: string; href: string }
}

export const CONTENT_PAGES: Record<string, SitePage> = {
  '/about': {
    path: '/about',
    title: 'À propos de DBC',
    subtitle:
      'Rendre la tech premium accessible, tout en réduisant l’impact du numérique.',
    blocks: [
      {
        title: 'Notre mission',
        body: 'DBC, c’est avant tout une équipe de passionnés de tech. Depuis nos débuts, notre mission est simple : rendre la technologie premium accessible à tous, tout en réduisant l’impact environnemental du numérique.',
      },
      {
        title: 'Notre impact',
        body: '11 magasins en France et en Belgique, plus de 50 techniciens certifiés, et des milliers d’appareils reconditionnés chaque année.',
      },
    ],
    cta: { label: 'Voir nos magasins', href: '/stores' },
  },
  '/quality': {
    path: '/quality',
    title: 'Le Standard DBC Labs',
    subtitle: 'Moins cher et aussi performant que le neuf.',
    blocks: [
      {
        body: 'Techniciens certifiés, jusqu’à 100 points de contrôle, retour sous 14 jours, garantie de 12 à 24 mois.',
      },
      {
        title: 'Nos techniciens, votre garantie',
        body: 'Notre engagement qualité, c’est d’abord des experts passionnés et des processus rigoureux dans chacun de nos magasins.',
      },
    ],
    cta: { label: 'Voir les smartphones', href: '/products/smartphones' },
  },
  '/contact': {
    path: '/contact',
    title: 'Contactez-nous.',
    subtitle: 'Une question, un besoin d’aide ? Nos équipes sont disponibles pour vous.',
    blocks: [
      {
        title: 'Téléphone',
        body: 'Appelez-nous directement au 09 39 24 10 82.',
      },
      {
        title: 'Email',
        body: 'On vous répond sous 24h : contact@dbcstore.fr',
      },
      {
        title: 'Chat en ligne',
        body: 'Avant-vente ou SAV, on t’oriente depuis le bouton chat en bas à droite.',
      },
    ],
  },
  '/faq': {
    path: '/faq',
    title: 'FAQ',
    subtitle:
      'Notre service client est disponible du lundi au dimanche, de 8h à 20h30. Temps moyen de réponse : 24 heures.',
    blocks: [
      {
        title: 'Les produits sont-ils vraiment reconditionnés ?',
        body: 'Oui, tous nos appareils sont reconditionnés dans nos magasins en France par nos techniciens certifiés. Chaque téléphone passe jusqu’à 100 points de contrôle.',
      },
      {
        title: 'Quelle est la durée de garantie ?',
        body: 'Nos appareils sont garantis de 12 à 24 mois selon le produit, avec SAV dans nos boutiques.',
      },
      {
        title: 'Puis-je retourner mon achat ?',
        body: 'Oui, vous disposez de 14 jours pour exercer votre droit de rétractation.',
      },
    ],
    cta: { label: 'Découvrir nos produits', href: '/products' },
  },
  '/help': {
    path: '/help',
    title: 'Questions fréquentes',
    subtitle: 'Besoin d’aide ? Retrouvez les réponses essentielles ici.',
    blocks: [
      {
        body: 'Pour la livraison, les retours, la garantie ou le suivi de commande, consultez la FAQ ou contactez-nous.',
      },
    ],
    cta: { label: 'Voir la FAQ', href: '/faq' },
  },
  '/shipping': {
    path: '/shipping',
    title: "Politique d'expédition",
    subtitle: 'Livraison rapide partout en France et en Belgique.',
    blocks: [
      {
        body: 'Expédition sous 24 à 72h selon le stock magasin. Options express disponibles sur une sélection de produits.',
      },
    ],
  },
  '/refund': {
    path: '/refund',
    title: 'Politique de retours & remboursements',
    subtitle: '14 jours pour changer d’avis.',
    blocks: [
      {
        body: 'Vous disposez de 14 jours pour exercer votre droit de rétractation. Les frais de retour sont à votre charge sauf défaut technique couvert par la garantie.',
      },
    ],
  },
  '/cgv': {
    path: '/cgv',
    title: 'Conditions générales de vente',
    blocks: [
      {
        body: 'Les présentes conditions générales régissent les ventes réalisées sur le site et en magasin DBC. Pour toute question, contactez notre service client.',
      },
    ],
  },
  '/privacy': {
    path: '/privacy',
    title: 'Politique de confidentialité',
    blocks: [
      {
        body: 'Nous collectons uniquement les données nécessaires au traitement de vos commandes, à la relation client et à l’amélioration du service.',
      },
    ],
  },
  '/legal': {
    path: '/legal',
    title: 'Mentions légales',
    blocks: [
      {
        body: 'DBC Store. Site d’information et de vente de produits reconditionnés. Contact : contact@dbcstore.fr',
      },
    ],
  },
  '/cookies': {
    path: '/cookies',
    title: 'Politique cookies',
    blocks: [
      {
        body: 'Nous utilisons des cookies nécessaires au fonctionnement du site et, avec votre accord, des cookies de mesure d’audience.',
      },
    ],
  },
  '/accessories': {
    path: '/accessories',
    title: 'Accessoires',
    subtitle: 'Coques, chargeurs, écouteurs et plus encore.',
    blocks: [
      {
        body: 'Sélection d’accessoires compatibles avec nos smartphones et tablettes. Disponibilité variable selon les magasins.',
      },
    ],
    cta: { label: 'Voir les smartphones', href: '/products/smartphones' },
  },
  '/audio': {
    path: '/products/audio',
    title: 'Audio reconditionné',
    subtitle: 'Casques, écouteurs et enceintes reconditionnés.',
    blocks: [
      {
        body: 'Le rayon audio se constitue progressivement. En attendant, découvrez nos smartphones et montres connectées.',
      },
    ],
    cta: { label: 'Voir les montres', href: '/products/smartwatches' },
  },
}

export type CatalogRoute = {
  path: string
  title: string
  subtitle: string
  category: string | null
}

export const CATALOG_ROUTES: CatalogRoute[] = [
  {
    path: '/products/smartphones',
    title: 'Smartphones reconditionnés',
    subtitle:
      'Découvrez notre sélection de smartphones reconditionnés, testés et garantis.',
    category: 'mobile',
  },
  {
    path: '/products/laptops',
    title: 'Ordinateurs portables reconditionnés',
    subtitle: 'PC portables testés en magasin, prêts à l’emploi.',
    category: 'laptops',
  },
  {
    path: '/products/tablets',
    title: 'Tablettes reconditionnées',
    subtitle: 'iPad et tablettes reconditionnées, contrôlées point par point.',
    category: 'tablets',
  },
  {
    path: '/products/smartwatches',
    title: 'Montres connectées reconditionnées',
    subtitle: 'Apple Watch et montres connectées remises à neuf.',
    category: 'smartwatches',
  },
]
