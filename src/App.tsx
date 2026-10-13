import { CatalogListing } from './components/CatalogListing'
import { ChatButton } from './components/ChatButton'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { HomePage } from './components/HomePage'
import { PhoneFinder } from './components/PhoneFinder'
import { ProductPage } from './components/ProductPage'
import { ContentPage } from './components/pages/ContentPage'
import { AccountPage, CartPage } from './components/pages/CartAccountPages'
import { OffersPage } from './components/pages/OffersPage'
import { ProductsHub } from './components/pages/ProductsHub'
import { RepairPage, ReprisePage } from './components/pages/ServiceFlowPage'
import { StoresPage } from './components/pages/StoresPage'
import { CATALOG_ROUTES, CONTENT_PAGES } from './data/sitePages'
import {
  LEGACY_SMARTPHONES,
  parseProductSlug,
  ROUTES,
  RoutingProvider,
  useRouting,
} from './lib/routing'

function MainView() {
  const { path } = useRouting()
  const productSlug = parseProductSlug(path)

  if (productSlug) {
    return <ProductPage slug={productSlug} />
  }

  if (path === ROUTES.trouver || path.startsWith(`${ROUTES.trouver}?`)) {
    return <PhoneFinder />
  }

  if (path === ROUTES.home) {
    return <HomePage />
  }

  if (path === ROUTES.products) {
    return <ProductsHub />
  }

  if (path === ROUTES.offres) {
    return <OffersPage />
  }

  if (path === ROUTES.reprise) {
    return <ReprisePage />
  }

  if (path === ROUTES.reparation) {
    return <RepairPage />
  }

  if (path === ROUTES.stores) {
    return <StoresPage />
  }

  if (path === ROUTES.cart) {
    return <CartPage />
  }

  if (path === ROUTES.account) {
    return <AccountPage />
  }

  if (path === ROUTES.audio || path === '/products/audio') {
    return <ContentPage path="/products/audio" />
  }

  const catalog =
    CATALOG_ROUTES.find((r) => r.path === path) ||
    (path === LEGACY_SMARTPHONES
      ? CATALOG_ROUTES.find((r) => r.path === ROUTES.smartphones)
      : undefined)
  if (catalog) {
    return (
      <CatalogListing
        category={catalog.category ?? 'mobile'}
        title={catalog.title}
        subtitle={catalog.subtitle}
      />
    )
  }

  if (CONTENT_PAGES[path]) {
    return <ContentPage path={path} />
  }

  return <ContentPage path="__missing__" />
}

export default function App() {
  return (
    <RoutingProvider>
      <div className="relative flex min-h-screen flex-col bg-white">
        <Header />
        <main className="flex-1">
          <div className="bg-white">
            <MainView />
          </div>
        </main>
        <Footer />
        <ChatButton />
      </div>
    </RoutingProvider>
  )
}
