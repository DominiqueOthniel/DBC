import { MessageCircle, Send, X } from 'lucide-react'
import { useEffect, useId, useRef, useState } from 'react'
import {
  replyToChat,
  welcomeMessage,
  type ChatLink,
  type ChatReply,
} from '../lib/chatBot'
import { useRouting } from '../lib/routing'

type Role = 'bot' | 'user'

type Message = {
  id: string
  role: Role
  text: string
  links?: ChatLink[]
}

function uid() {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 8)}`
}

function fromReply(reply: ChatReply): Message {
  return {
    id: uid(),
    role: 'bot',
    text: reply.text,
    links: reply.links,
  }
}

export function ChatButton() {
  const { navigate } = useRouting()
  const panelId = useId()
  const [open, setOpen] = useState(false)
  const [input, setInput] = useState('')
  const [busy, setBusy] = useState(false)
  const [suggestions, setSuggestions] = useState<string[]>(
    () => welcomeMessage().suggestions ?? [],
  )
  const [messages, setMessages] = useState<Message[]>(() => [
    fromReply(welcomeMessage()),
  ])
  const listRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (!open) return
    const t = window.setTimeout(() => inputRef.current?.focus(), 80)
    return () => window.clearTimeout(t)
  }, [open])

  useEffect(() => {
    const el = listRef.current
    if (!el) return
    el.scrollTop = el.scrollHeight
  }, [messages, open, busy])

  function pushUser(text: string) {
    const trimmed = text.trim()
    if (!trimmed || busy) return
    setMessages((prev) => [
      ...prev,
      { id: uid(), role: 'user', text: trimmed },
    ])
    setInput('')
    setBusy(true)
    setSuggestions([])
    window.setTimeout(() => {
      const reply = replyToChat(trimmed)
      setMessages((prev) => [...prev, fromReply(reply)])
      setSuggestions(reply.suggestions ?? [])
      setBusy(false)
    }, 380)
  }

  function onLink(href: string) {
    setOpen(false)
    navigate(href)
  }

  return (
    <div
      className="fixed right-4 z-50 flex flex-col items-end gap-3 sm:right-6"
      style={{ bottom: 'calc(1rem + var(--bottom-bar-height, 0px) + env(safe-area-inset-bottom, 0px))' }}
    >
      {open ? (
        <section
          id={panelId}
          role="dialog"
          aria-modal="false"
          aria-label="Chat DBC"
          className="flex h-[min(32rem,calc(100dvh-7rem))] w-[min(22rem,calc(100vw-2rem))] flex-col overflow-hidden rounded-2xl border border-primary/15 bg-white shadow-xl"
        >
          <header className="flex items-center gap-3 bg-primary px-4 py-3 text-primary-foreground">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-accent/25">
              <MessageCircle className="h-5 w-5" aria-hidden="true" />
            </span>
            <div className="min-w-0 flex-1">
              <p className="font-display text-sm font-semibold leading-tight">
                Assistant DBC
              </p>
              <p className="text-[11px] text-white/80">En ligne · réponse immédiate</p>
            </div>
            <button
              type="button"
              className="rounded-full p-1.5 transition hover:bg-white/10"
              aria-label="Fermer le chat"
              onClick={() => setOpen(false)}
            >
              <X className="h-5 w-5" aria-hidden="true" />
            </button>
          </header>

          <div
            ref={listRef}
            className="flex-1 space-y-3 overflow-y-auto bg-gray-50 px-3 py-3"
          >
            {messages.map((m) => (
              <div
                key={m.id}
                className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[85%] rounded-2xl px-3 py-2 text-sm leading-snug ${
                    m.role === 'user'
                      ? 'rounded-br-md bg-primary text-primary-foreground'
                      : 'rounded-bl-md border border-gray-100 bg-white text-gray-800'
                  }`}
                >
                  <p className="whitespace-pre-wrap">{m.text}</p>
                  {m.links?.length ? (
                    <div className="mt-2 flex flex-col gap-1.5">
                      {m.links.map((link) => (
                        <button
                          key={link.href + link.label}
                          type="button"
                          className="rounded-lg bg-green-50 px-2.5 py-1.5 text-left text-xs font-semibold text-primary transition hover:bg-accent/20"
                          onClick={() => onLink(link.href)}
                        >
                          {link.label} →
                        </button>
                      ))}
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
            {busy ? (
              <div className="flex justify-start">
                <div className="rounded-2xl rounded-bl-md border border-gray-100 bg-white px-3 py-2 text-xs text-gray-500">
                  … écrit
                </div>
              </div>
            ) : null}
          </div>

          {suggestions.length > 0 ? (
            <div className="flex gap-2 overflow-x-auto border-t border-gray-100 bg-white px-3 py-2">
              {suggestions.map((s) => (
                <button
                  key={s}
                  type="button"
                  disabled={busy}
                  className="shrink-0 rounded-full border border-primary/20 bg-white px-3 py-1 text-xs font-medium text-primary transition hover:bg-green-50 disabled:opacity-50"
                  onClick={() => pushUser(s)}
                >
                  {s}
                </button>
              ))}
            </div>
          ) : null}

          <form
            className="flex items-center gap-2 border-t border-gray-100 bg-white p-2.5"
            onSubmit={(e) => {
              e.preventDefault()
              pushUser(input)
            }}
          >
            <label className="sr-only" htmlFor={`${panelId}-input`}>
              Votre message
            </label>
            <input
              ref={inputRef}
              id={`${panelId}-input`}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Écris ta question…"
              autoComplete="off"
              className="h-10 min-w-0 flex-1 rounded-full border border-gray-200 bg-gray-50 px-3.5 text-sm text-gray-900 outline-none ring-primary placeholder:text-gray-400 focus:border-primary focus:ring-1"
            />
            <button
              type="submit"
              disabled={busy || !input.trim()}
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground transition hover:bg-primary/90 disabled:opacity-40"
              aria-label="Envoyer"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </section>
      ) : null}

      <button
        type="button"
        className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-white shadow-lg transition-transform duration-300 hover:scale-105 active:scale-95"
        aria-label={open ? 'Fermer le chat' : 'Ouvrir le chat'}
        aria-expanded={open}
        aria-controls={open ? panelId : undefined}
        onClick={() => setOpen((v) => !v)}
      >
        {open ? (
          <X className="h-6 w-6" aria-hidden="true" />
        ) : (
          <MessageCircle className="h-6 w-6" aria-hidden="true" />
        )}
      </button>
    </div>
  )
}
