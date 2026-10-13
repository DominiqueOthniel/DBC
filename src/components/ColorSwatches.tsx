import { colorHex } from '../data/phoneColors'

/** Listing dots: exact live classes `h-3 w-3 rounded-full border border-gray-200`. */
export function ListingColorDots({
  colors,
  max = 4,
}: {
  colors?: string[] | null
  max?: number
}) {
  if (!colors?.length) return null
  const shown = colors.slice(0, max)
  const extra = colors.length - shown.length
  return (
    <div className="mt-auto flex items-center gap-1 pt-2 sm:order-first sm:mt-0 sm:mb-3 sm:pt-0">
      {shown.map((name) => (
        <span
          key={name}
          title={name}
          className="h-3 w-3 rounded-full border border-gray-200"
          style={{ backgroundColor: colorHex(name) }}
        />
      ))}
      {extra > 0 ? (
        <span className="pl-0.5 text-[11px] font-medium text-gray-500">
          +{extra}
        </span>
      ) : null}
    </div>
  )
}

/** Product page selectable swatches (size/border/selected ring aligned to live UI). */
export function ProductColorPicker({
  colors,
  value,
  onChange,
}: {
  colors: string[]
  value: string
  onChange: (name: string) => void
}) {
  if (!colors.length) return null
  return (
    <div className="mt-5">
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-sm font-semibold text-gray-900">Couleur</p>
        <p className="text-sm text-gray-600">{value}</p>
      </div>
      <div className="mt-3 flex flex-wrap gap-2.5">
        {colors.map((name) => {
          const selected = name === value
          return (
            <button
              key={name}
              type="button"
              aria-label={name}
              aria-pressed={selected}
              onClick={() => onChange(name)}
              className={`flex h-10 w-10 items-center justify-center rounded-full border-2 p-0.5 transition ${
                selected
                  ? 'border-primary'
                  : 'border-transparent hover:border-gray-300'
              }`}
            >
              <span
                className="h-full w-full rounded-full border border-gray-200"
                style={{ backgroundColor: colorHex(name) }}
              />
            </button>
          )
        })}
      </div>
    </div>
  )
}
