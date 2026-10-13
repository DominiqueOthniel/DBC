import { CONTENT_PAGES } from '../../data/sitePages'
import { Link } from '../../lib/routing'

export function ContentPage({ path }: { path: string }) {
  const page = CONTENT_PAGES[path]
  if (!page) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-12">
        <h1 className="font-display text-2xl font-bold text-gray-900">
          Page introuvable
        </h1>
        <Link to="/" className="mt-4 inline-block text-sm font-semibold text-primary underline">
          Retour à l’accueil
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 md:py-14">
      <h1 className="font-display text-[28px] leading-tight font-bold tracking-tight text-gray-900 md:text-[32px]">
        {page.title}
      </h1>
      {page.subtitle ? (
        <p className="mt-3 text-base text-gray-600 md:text-lg">{page.subtitle}</p>
      ) : null}
      <div className="mt-8 space-y-6">
        {page.blocks.map((block, i) => (
          <div key={i}>
            {block.title ? (
              <h2 className="font-display text-lg font-semibold text-gray-900">
                {block.title}
              </h2>
            ) : null}
            <p className={`text-[15px] leading-relaxed text-gray-700 ${block.title ? 'mt-2' : ''}`}>
              {block.body}
            </p>
          </div>
        ))}
      </div>
      {page.cta ? (
        <Link
          to={page.cta.href}
          className="mt-10 inline-flex items-center justify-center rounded-full bg-primary px-6 py-3 text-sm font-semibold text-white hover:bg-primary/90"
        >
          {page.cta.label}
        </Link>
      ) : null}
    </div>
  )
}
