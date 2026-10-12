import { ChatButton } from './components/ChatButton'
import { Footer } from './components/Footer'
import { Header } from './components/Header'
import { PhoneFinder } from './components/PhoneFinder'

export default function App() {
  return (
    <div className="relative flex min-h-screen flex-col bg-white">
      <Header />
      <main className="flex-1">
        <div className="bg-white">
          <PhoneFinder />
        </div>
      </main>
      <Footer />
      <ChatButton />
    </div>
  )
}
