import { useEffect, useState } from 'react'
import { PRODUCT_IMAGE_PLACEHOLDER } from '../lib/productImages'

type Props = {
  /** URLs à essayer dans l’ordre (rewrites puis primary). */
  candidates: Array<string | null | undefined>
  alt: string
  className?: string
  imgClassName?: string
}

/**
 * Affiche une image produit avec secours: candidats → placeholder neutre.
 * Évite les icônes « ? » bleues du navigateur quand Supabase renvoie 400.
 */
export function ProductImage({
  candidates,
  alt,
  className,
  imgClassName,
}: Props) {
  const list = candidates.filter((u): u is string => Boolean(u))
  const [index, setIndex] = useState(0)

  useEffect(() => {
    setIndex(0)
  }, [list.join('|')])

  const src =
    index < list.length ? list[index]! : PRODUCT_IMAGE_PLACEHOLDER

  return (
    <div className={className}>
      <img
        key={src}
        src={src}
        alt={alt}
        className={imgClassName}
        onError={() => {
          setIndex((i) => {
            if (i + 1 < list.length) return i + 1
            // au-delà: placeholder (index = list.length)
            return list.length
          })
        }}
      />
    </div>
  )
}
