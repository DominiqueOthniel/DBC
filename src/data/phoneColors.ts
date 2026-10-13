/**
 * Hex swatches measured from live dbcstore.fr listing cards
 * (`span.h-3.w-3.rounded-full` inline background-color).
 */
export const PHONE_COLOR_HEX: Record<string, string> = {
  'Bleu intense': '#2E3F5C',
  'Orange cosmique': '#C96A3A',
  Argent: '#E5E6E1',
  Noir: '#2C2C2E',
  'Noir sidéral': '#464342',
  Blanc: '#F5F5F0',
  'Blanc nuage': '#FCFCFC',
  Brume: '#9CB0C4',
  Sauge: '#9CAF88',
  'Bleu ciel': '#C8D6E0',
  'Or clair': '#E8D5B0',
  Bleu: '#9CB0C4',
  Vert: '#D9EFD5',
  Gris: '#565F6B',
  'Bleu foncé': '#00008B',
  'Bleu marine': '#2A3F5F',
  'Titane sable': '#BFA48F',
  'Titane noir': '#1C1C1E',
  'Titane naturel': '#A8A49D',
  'Titane blanc': '#F2F1ED',
  'Titane désert': '#BFA48F',
  Outremer: '#4C5B92',
  Sarcelle: '#BDD8D2',
  Rose: '#FBDFE0',
  Mauve: '#E6DAE6',
  Jaune: '#EEE389',
  'Ambre Titane': '#9CB0C4',
  Graphite: '#54524F',
  Violet: '#B7A6E6',
  // iPhone 18 Pro Max (finitions Apple FR 2026)
  Glacier: '#E8F2FE',
  // Bordeaux: thumb Apple ≈ #4D1822; UI un peu plus saturé pour rester lisible
  Bordeaux: '#6B2030',
}

export function colorHex(name: string): string {
  if (PHONE_COLOR_HEX[name]) return PHONE_COLOR_HEX[name]
  const key = Object.keys(PHONE_COLOR_HEX).find(
    (k) => k.toLowerCase() === name.toLowerCase(),
  )
  return key ? PHONE_COLOR_HEX[key] : '#D4D4D4'
}
