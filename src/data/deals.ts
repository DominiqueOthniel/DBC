export type FeaturedDeal = {
  id: string
  slug?: string
  title: string
  imageUrl: string
  colorHex: string
  colorName?: string
  grade: string
  price: number
  href: string
  qty?: number
}

/** Offres « Great deal » (home), alignées sur la grille live + 18 Pro Max Bordeaux. */
export const FEATURED_DEALS: FeaturedDeal[] = [
  {
    id: 'macbook-air-15-m2',
    title: 'Apple MacBook Air (15" 2023, M2) - Apple M2 10-core GPU / 16GB / 1TB SSD',
    imageUrl:
      'https://xbcfxgoysecsbboyvlpu.supabase.co/storage/v1/object/public/product-images/macbook-air-m2/minuit/0.jpg',
    colorHex: '#1c1c2e',
    grade: 'Parfait',
    price: 1580,
    href: '/products/laptops',
  },
  {
    id: 'macbook-air-13-m1',
    title: 'Apple MacBook Air (13" 2020, M1) - Apple M1 / 8GB / 256GB SSD',
    imageUrl:
      'https://hbwrrsstzrwlbavgvgcq.supabase.co/storage/v1/object/public/marketplace-product-images/deals/web/caaf3cd012be4830822c08ef597b7c30.jpg',
    colorHex: '#636366',
    grade: 'Parfait',
    price: 760,
    href: '/products/laptops',
  },
  {
    id: 'iphone-18-pro-max-bordeaux',
    slug: 'iphone-18-pro-max',
    title: 'Apple iPhone 18 Pro Max 256GB Bordeaux',
    imageUrl: '/product-images/iphone-18-pro-max/bordeaux/bordeaux-wine.jpg',
    colorHex: '#4D1822',
    colorName: 'Bordeaux',
    grade: 'Parfait',
    price: 1186,
    href: '/p/iphone-18-pro-max?color=Bordeaux',
  },
  {
    id: 'iphone-13-mini',
    title: 'Apple iPhone 13 Mini 512GB',
    imageUrl:
      'https://xbcfxgoysecsbboyvlpu.supabase.co/storage/v1/object/public/product-images/iphone-13-mini/lumiere-stellaire/0.jpg',
    colorHex: '#f5f5f7',
    grade: 'Parfait',
    price: 485,
    href: '/products/smartphones',
  },
  {
    id: 'switch',
    title: 'Switch',
    imageUrl:
      'https://xbcfxgoysecsbboyvlpu.supabase.co/storage/v1/object/public/product-images/deals/switch-noire.png',
    colorHex: '#1d1d1f',
    grade: 'correct',
    price: 90,
    href: '/offres',
    qty: 3,
  },
  {
    id: 'watch-s10',
    title: 'Apple Watch Series 10 46mm GPS+Cellular Aluminum Case',
    imageUrl:
      'https://xbcfxgoysecsbboyvlpu.supabase.co/storage/v1/object/public/product-images/8619658b-07dc-42d0-925e-6ee8d7e22519/Black/fcf0b24f-d7b7-440b-9665-2c9e2a8375d0.jpg',
    colorHex: '#636366',
    grade: 'parfait',
    price: 450,
    href: '/products/smartwatches',
  },
]

export function formatDealPrice(value: number) {
  return `${value.toLocaleString('en-US')} €`
}

export const HOME_CATEGORIES = [
  {
    id: 'iphone',
    label: 'iPhone',
    image: '/home/iphonepro-removebg-preview.png',
    href: '/products/smartphones',
  },
  {
    id: 'samsung',
    label: 'Samsung',
    image: '/home/android.png',
    href: '/products/smartphones',
  },
  {
    id: 'tablets',
    label: 'Tablets',
    image: '/home/ipadpro-removebg-preview.png',
    href: '/products/tablets',
  },
  {
    id: 'computers',
    label: 'Computers',
    image: '/home/macpro-removebg-preview.png',
    href: '/products/laptops',
  },
  {
    id: 'smartwatches',
    label: 'Watches',
    image: '/home/apple-watch-1.png',
    href: '/products/smartwatches',
  },
  {
    id: 'accessories',
    label: 'Accessories',
    image: '/home/accesoire.png',
    href: '/accessories',
  },
] as const
