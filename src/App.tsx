import { CatalogListing } from './components/CatalogListing'
import { ChatButton } from './components/ChatButton'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PhoneFinder } from './components/PhoneFinder'
import { ProductPage } from './components/ProductPage'
import {
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
  if (path === ROUTES.smartphones || path.startsWith(`${ROUTES.smartphones}?`)) {
    return <CatalogListing />
  }
  return <PhoneFinder />
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
