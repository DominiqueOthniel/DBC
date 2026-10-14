import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'

const STORAGE_KEY = 'dbc_cart_v1'

export type CartLine = {
  key: string
  slug: string
  title: string
  imageUrl: string
  price: number
  color?: string
  colorHex?: string
  grade?: string
  href: string
  qty: number
}

export type AddToCartInput = Omit<CartLine, 'key' | 'qty'> & {
  qty?: number
}

function lineKey(input: AddToCartInput) {
  return [
    input.slug,
    input.color ?? '',
    input.grade ?? '',
    input.price,
  ].join('|')
}

function loadCart(): CartLine[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return []
    const parsed = JSON.parse(raw) as CartLine[]
    if (!Array.isArray(parsed)) return []
    return parsed.filter(
      (l) =>
        l &&
        typeof l.key === 'string' &&
        typeof l.title === 'string' &&
        typeof l.price === 'number' &&
        typeof l.qty === 'number',
    )
  } catch {
    return []
  }
}

type ToastState = {
  title: string
  open: boolean
} | null

type CartContextValue = {
  lines: CartLine[]
  count: number
  subtotal: number
  toast: ToastState
  addItem: (input: AddToCartInput) => void
  setQty: (key: string, qty: number) => void
  removeItem: (key: string) => void
  clear: () => void
  dismissToast: () => void
}

const CartContext = createContext<CartContextValue | null>(null)

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [ready, setReady] = useState(false)
  const [toast, setToast] = useState<ToastState>(null)

  useEffect(() => {
    setLines(loadCart())
    setReady(true)
  }, [])

  useEffect(() => {
    if (!ready) return
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines, ready])

  useEffect(() => {
    if (!toast?.open) return
    const t = window.setTimeout(() => setToast(null), 3200)
    return () => window.clearTimeout(t)
  }, [toast])

  const addItem = useCallback((input: AddToCartInput) => {
    const key = lineKey(input)
    const addQty = Math.max(1, input.qty ?? 1)
    setLines((prev) => {
      const idx = prev.findIndex((l) => l.key === key)
      if (idx === -1) {
        return [
          ...prev,
          {
            key,
            slug: input.slug,
            title: input.title,
            imageUrl: input.imageUrl,
            price: input.price,
            color: input.color,
            colorHex: input.colorHex,
            grade: input.grade,
            href: input.href,
            qty: addQty,
          },
        ]
      }
      const next = [...prev]
      const current = next[idx]!
      next[idx] = { ...current, qty: current.qty + addQty }
      return next
    })
    setToast({ title: input.title, open: true })
  }, [])

  const setQty = useCallback((key: string, qty: number) => {
    setLines((prev) => {
      if (qty <= 0) return prev.filter((l) => l.key !== key)
      return prev.map((l) => (l.key === key ? { ...l, qty } : l))
    })
  }, [])

  const removeItem = useCallback((key: string) => {
    setLines((prev) => prev.filter((l) => l.key !== key))
  }, [])

  const clear = useCallback(() => setLines([]), [])

  const dismissToast = useCallback(() => setToast(null), [])

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.qty, 0),
    [lines],
  )
  const subtotal = useMemo(
    () => lines.reduce((sum, l) => sum + l.price * l.qty, 0),
    [lines],
  )

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      toast,
      addItem,
      setQty,
      removeItem,
      clear,
      dismissToast,
    }),
    [
      lines,
      count,
      subtotal,
      toast,
      addItem,
      setQty,
      removeItem,
      clear,
      dismissToast,
    ],
  )

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart hors CartProvider')
  return ctx
}
