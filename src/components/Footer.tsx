import { ChevronDown } from 'lucide-react'
import { useState, type FormEvent } from 'react'

const PAYMENTS = [
  { src: '/assets/icons/payment/cb.svg', alt: 'CB' },
  { src: '/assets/icons/payment/visa.svg', alt: 'Visa' },
  { src: '/assets/icons/payment/mastercard.svg', alt: 'Mastercard' },
  { src: '/assets/icons/payment/paypal.svg', alt: 'PayPal' },
  { src: '/assets/icons/payment/apple-pay.svg', alt: 'Apple Pay' },
  { src: '/assets/icons/payment/google-pay.svg', alt: 'Google Pay' },
]

const COLUMNS = [
  {
    title: 'À propos',
    links: [
      { label: 'Notre histoire', href: '#' },
      { label: 'Nos magasins', href: '#' },
      { label: 'Standard DBC Labs', href: '#' },
      { label: 'On recrute !', href: '#' },
    ],
    social: true,
  },
  {
    title: 'On vous aide',
    links: [
      { label: 'Nous contacter', href: '#' },
      { label: "Centre d'aide", href: '#' },
      { label: 'Livraison et délais', href: '#' },
      { label: 'Retours et remboursements', href: '#' },
    ],
  },
  {
    title: 'Nos services',
    links: [
      { label: 'Standard DBC Labs', href: '#' },
      { label: 'Réparation express', href: '#' },
      { label: 'Reprendre mon appareil', href: '#' },
      { label: 'Accessoires', href: '#' },
    ],
    payments: true,
  },
  {
    title: "La loi et l'ordre",
    links: [
      { label: 'Conditions générales', href: '#' },
      { label: 'Confidentialité', href: '#' },
      { label: 'Mentions légales', href: '#' },
      { label: 'Politique cookies', href: '#' },
    ],
    cookies: true,
  },
]

function InstagramIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      className="h-5 w-5"
    >
      <rect x="2" y="2" width="20" height="20" rx="5" />
      <circle cx="12" cy="12" r="5" />
      <circle cx="17.5" cy="6.5" r="1.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function TikTokIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.15 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z" />
    </svg>
  )
}

function SnapchatIcon() {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className="h-5 w-5">
      <path d="M12.206.793c.99 0 4.347.276 5.93 3.821.529 1.193.403 3.219.299 4.847l-.003.06c-.012.18-.022.345-.03.51.075.045.203.09.401.09.3-.016.659-.12 1.033-.301.165-.088.344-.104.464-.104.182 0 .359.029.509.09.45.149.734.479.734.838.015.449-.39.839-1.213 1.168-.089.029-.209.075-.344.119-.45.135-1.139.36-1.333.81-.09.224-.061.524.12.868l.015.015c.06.136 1.526 3.475 4.791 4.014.255.044.435.27.42.509 0 .075-.015.149-.045.225-.24.569-1.273.988-3.146 1.271-.059.091-.12.375-.164.57-.029.179-.074.36-.134.553-.076.271-.27.405-.555.405h-.03c-.135 0-.313-.031-.538-.074-.36-.075-.765-.135-1.273-.135-.3 0-.599.015-.913.074-.6.104-1.123.464-1.723.884-.853.599-1.826 1.288-3.294 1.288-.06 0-.119-.015-.18-.015h-.149c-1.468 0-2.427-.675-3.279-1.288-.599-.42-1.107-.779-1.707-.884-.314-.045-.629-.074-.928-.074-.54 0-.958.089-1.272.149-.211.043-.391.074-.54.074-.374 0-.523-.224-.583-.42-.061-.192-.09-.389-.135-.567-.046-.181-.105-.494-.166-.57-1.918-.222-2.95-.642-3.189-1.226-.031-.063-.052-.15-.055-.225-.015-.243.165-.465.42-.509 3.264-.54 4.73-3.879 4.791-4.02l.016-.029c.18-.345.224-.645.119-.869-.195-.434-.884-.658-1.332-.809-.121-.029-.24-.074-.346-.119-1.107-.435-1.257-.93-1.197-1.273.09-.479.674-.793 1.168-.793.146 0 .27.029.383.074.42.194.789.3 1.104.3.234 0 .384-.06.465-.105l-.046-.569c-.098-1.626-.225-3.651.307-4.837C7.392 1.077 10.739.807 11.727.807l.419-.015h.06z" />
    </svg>
  )
}

export function Footer() {
  const [email, setEmail] = useState('')
  const [moreOpen, setMoreOpen] = useState(false)
  const [subscribed, setSubscribed] = useState(false)

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (!email.trim()) return
    setSubscribed(true)
  }

  return (
    <footer className="bg-white">
      <div className="border-t border-gray-200">
        <div className="mx-auto flex max-w-[1120px] flex-col gap-4 px-5 py-8 md:flex-row md:items-start md:justify-between md:gap-16 md:py-10">
          <div className="shrink-0 md:max-w-[400px]">
            <p className="text-[20px] font-bold leading-tight text-gray-900">
              Les bons plans, c&apos;est par ici.
            </p>
            <p className="mt-1 text-[14px] leading-relaxed text-gray-500">
              Offres exclu, restocks, nouveaux modèles. On vous prévient avant
              tout le monde.
            </p>
          </div>
          <div className="w-full md:max-w-[420px]">
            {subscribed ? (
              <p className="rounded-lg bg-green-50 px-4 py-3 text-sm text-primary">
                Merci ! On vous écrit bientôt.
              </p>
            ) : (
              <form className="flex gap-2" onSubmit={onSubmit}>
                <input
                  type="email"
                  required
                  placeholder="Adresse e-mail"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="h-11 w-full min-w-0 flex-1 rounded-lg border border-input bg-transparent px-4 py-1 text-base shadow-xs outline-none transition-[color,box-shadow] placeholder:text-muted-foreground focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50 md:text-sm"
                />
                <button
                  type="submit"
                  className="h-11 shrink-0 rounded-full bg-primary px-4 text-[14px] font-semibold text-white transition-colors hover:bg-primary/90 disabled:opacity-60"
                >
                  S&apos;inscrire
                </button>
              </form>
            )}
            <button
              type="button"
              className="mt-3 flex items-center gap-1 text-[12px] text-gray-900 underline underline-offset-2"
              onClick={() => setMoreOpen((v) => !v)}
            >
              <ChevronDown
                className={`h-3 w-3 transition-transform duration-200 ${moreOpen ? 'rotate-180' : ''}`}
                aria-hidden="true"
              />
              En savoir plus
            </button>
            <div
              className={`grid transition-all duration-300 ease-in-out ${moreOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'}`}
            >
              <div className="overflow-hidden">
                <div className="rounded-lg bg-gray-50 p-3 text-[12px] leading-relaxed text-gray-500">
                  <p>
                    Vous pouvez vous désabonner quand vous voulez. On n&apos;est
                    pas vexés.
                  </p>
                  <a
                    className="mt-1 block text-gray-900 underline"
                    href="#"
                    onClick={(e) => e.preventDefault()}
                  >
                    Politique de confidentialité
                  </a>
                  <p className="mt-1">
                    🎁 -10€ sur votre première commande après inscription.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="border-t border-gray-200">
        <div className="mx-auto max-w-[1120px] px-5 py-8">
          <ul className="flex flex-col gap-8 md:flex-row md:gap-0">
            {COLUMNS.map((col, idx) => (
              <li
                key={col.title}
                className={`md:flex-1 ${idx > 0 ? 'border-t border-gray-200 pt-6 md:border-0 md:pt-0' : ''}`}
              >
                <h2 className="mb-3 font-display text-[15px] font-bold text-gray-900">
                  {col.title}
                </h2>
                <ul className="flex flex-col gap-2">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <a
                        className="text-[14px] text-gray-600 no-underline hover:text-gray-900 hover:underline"
                        href="#"
                        onClick={(e) => e.preventDefault()}
                      >
                        {link.label}
                      </a>
                    </li>
                  ))}
                  {col.cookies && (
                    <li>
                      <button
                        type="button"
                        className="text-[14px] text-gray-600 no-underline hover:text-gray-900 hover:underline"
                      >
                        Gérer mes cookies
                      </button>
                    </li>
                  )}
                </ul>
                {col.social && (
                  <div className="mt-4 flex items-center gap-4">
                    <a
                      href="https://www.instagram.com/dbcelectronicsfrance/"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Instagram"
                      className="text-gray-400 transition-colors hover:text-gray-900"
                    >
                      <InstagramIcon />
                    </a>
                    <a
                      href="https://www.tiktok.com/@dbcfrance"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="TikTok"
                      className="text-gray-400 transition-colors hover:text-gray-900"
                    >
                      <TikTokIcon />
                    </a>
                    <a
                      href="https://www.snapchat.com/add/dbc_story"
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label="Snapchat"
                      className="text-gray-400 transition-colors hover:text-gray-900"
                    >
                      <SnapchatIcon />
                    </a>
                  </div>
                )}
                {col.payments && (
                  <div className="mt-4 flex flex-wrap items-center gap-2">
                    {PAYMENTS.map((p) => (
                      <img key={p.alt} src={p.src} alt={p.alt} className="h-6" />
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
        </div>
      </div>

      <div className="border-t border-gray-200 py-4 text-center">
        <p className="text-[12px] text-gray-400">© 2019 - 2026 DBC</p>
      </div>
    </footer>
  )
}
