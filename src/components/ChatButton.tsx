import { MessageCircle } from 'lucide-react'

export function ChatButton() {
  return (
    <a
      href="https://dbcstore.fr/fr/contact"
      className="fixed right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
      style={{ bottom: 'calc(1.5rem + var(--bottom-bar-height, 0px))' }}
      aria-label="Ouvrir le chat"
    >
      <MessageCircle className="h-6 w-6" aria-hidden="true" />
    </a>
  )
}
