
import Gallery from './components/Gallery'

function App() {
  return (
    <main className="min-h-screen bg-gray-50 text-gray-900">
      <header className="border-b border-gray-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a
            href="/"
            className="text-xl font-bold tracking-tight text-gray-900"
          >
            celebrare<span className="text-pink-600">.</span>
          </a>

          <span className="text-sm text-gray-500">
            Photo Gallery
          </span>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12">
        <section className="mb-10">
          <p className="mb-3 text-xs font-semibold uppercase tracking-[0.2em] text-pink-600">
            Discover moments
          </p>

          <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Explore the gallery
          </h1>

          <p className="mt-3 max-w-xl text-sm leading-6 text-gray-600 sm:text-base">
            Browse beautiful photography from creators around the world.
          </p>
        </section>

        <Gallery />
      </div>

      <footer className="border-t border-gray-200 bg-white">
        <div className="mx-auto max-w-7xl px-5 py-5 text-center text-xs text-gray-500 sm:px-8">
          Photo Gallery · Built with React and Tailwind CSS
        </div>
      </footer>
    </main>
  )
}

export default App
