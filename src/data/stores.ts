export type WeeklyHour = {
  open: string
  close: string
  closed?: boolean
}

export type Store = {
  key: string
  label: string
  city: string
  address: string
  phone: string
  lat: number
  lng: number
  weeklyHours: WeeklyHour[]
}

export const STORES: Store[] = [
  {
    key: 'rosny2',
    label: 'Rosny 2',
    city: 'Rosny-sous-Bois',
    address: 'CC Westfield Rosny 2, 1er étage Porte 1, 93110 Rosny-sous-Bois',
    phone: '07 43 63 83 46',
    lat: 48.8836,
    lng: 2.4776,
    weeklyHours: Array.from({ length: 7 }, () => ({
      open: '10:00',
      close: '20:00',
    })),
  },
  {
    key: 'aulnay',
    label: 'Aulnay',
    city: 'Aulnay-sous-Bois',
    address: '16bis Rue Jean Charcot, 93600 Aulnay-sous-Bois',
    phone: '06 23 37 56 19',
    lat: 48.9326,
    lng: 2.4966,
    weeklyHours: Array.from({ length: 7 }, () => ({
      open: '11:00',
      close: '19:30',
    })),
  },
  {
    key: 'paris17',
    label: 'Paris 17',
    city: 'Paris',
    address: '110 Avenue de Villiers, 75017 Paris',
    phone: '09 39 24 10 82',
    lat: 48.88482,
    lng: 2.29858,
    weeklyHours: Array.from({ length: 7 }, () => ({
      open: '10:00',
      close: '20:30',
    })),
  },
  {
    key: 'paris12',
    label: 'Paris 12',
    city: 'Paris',
    address: '30 Avenue Daumesnil, 75012 Paris',
    phone: '07 43 39 55 26',
    lat: 48.84739,
    lng: 2.37481,
    weeklyHours: Array.from({ length: 7 }, () => ({
      open: '11:00',
      close: '19:30',
    })),
  },
  {
    key: 'lille',
    label: 'Lille',
    city: 'Lille',
    address: '23 Rue Léon Gambetta, 59000 Lille',
    phone: '07 60 55 60 39',
    lat: 50.63127,
    lng: 3.05939,
    weeklyHours: Array.from({ length: 7 }, () => ({
      open: '11:00',
      close: '20:30',
    })),
  },
  {
    key: 'lyon',
    label: 'Lyon',
    city: 'Lyon',
    address: '127 Av. Maréchal de Saxe, 69003 Lyon',
    phone: '07 75 05 13 53',
    lat: 45.7597,
    lng: 4.8522,
    weeklyHours: Array.from({ length: 7 }, () => ({
      open: '10:00',
      close: '20:30',
    })),
  },
  {
    key: 'bruxelles',
    label: 'Bruxelles',
    city: 'Bruxelles',
    address: 'Boulevard Anspach 123, 1000 Bruxelles',
    phone: '+32 2 520 61 00',
    lat: 50.84664,
    lng: 4.34752,
    weeklyHours: [
      { open: '', close: '', closed: true },
      ...Array.from({ length: 6 }, () => ({ open: '11:00', close: '19:30' })),
    ],
  },
  {
    key: 'marseille',
    label: 'Marseille',
    city: 'Marseille',
    address: '5 Rue Grignan, 13006 Marseille',
    phone: '06 49 09 19 15',
    lat: 43.2935,
    lng: 5.3763,
    weeklyHours: [
      { open: '', close: '', closed: true },
      ...Array.from({ length: 6 }, () => ({ open: '10:00', close: '19:00' })),
    ],
  },
]

export function hourFr(time: string) {
  return time.replace(':', ' h ')
}

export function getStoreStatus(store: Store, now = new Date()) {
  const day = (now.getDay() + 6) % 7
  const hours = store.weeklyHours[day]
  if (!hours || hours.closed || !hours.open || !hours.close) {
    return { isOpen: false, label: null as string | null }
  }
  const [oh, om] = hours.open.split(':').map(Number)
  const [ch, cm] = hours.close.split(':').map(Number)
  const mins = now.getHours() * 60 + now.getMinutes()
  const openMins = oh * 60 + om
  const closeMins = ch * 60 + cm
  const isOpen = mins >= openMins && mins < closeMins
  return { isOpen, label: isOpen ? hours.close : null }
}
