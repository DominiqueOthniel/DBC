const LINE =
  "DBC, avant d'être un site, c'est un réseau de magasins physiques."

export function Marquee() {
  return (
    <div className="overflow-hidden bg-highlight py-2.5">
      <div className="animate-marquee flex whitespace-nowrap">
        {Array.from({ length: 8 }).map((_, i) => (
          <span
            key={i}
            className="mx-8 text-xs font-semibold text-gray-900"
          >
            {LINE}
            <span className="mx-4 text-gray-900/40">•</span>
          </span>
        ))}
      </div>
    </div>
  )
}
