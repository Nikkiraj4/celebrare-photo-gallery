
import { useCallback, useEffect, useMemo, useReducer, useState } from 'react'
import useFetchPhotos from '../hooks/useFetchPhotos'
import {
  favouritesReducer,
  getInitialFavourites,
} from '../reducers/favouritesReducer'
import PhotoCard from './PhotoCard'

const STORAGE_KEY = 'celebrare-favourites'

function Gallery() {
  const { photos, loading, error } = useFetchPhotos()
  const [search, setSearch] = useState('')

  const [favourites, dispatch] = useReducer(
    favouritesReducer,
    undefined,
    getInitialFavourites,
  )

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favourites))
    } catch {
      // The gallery still works if browser storage is unavailable.
    }
  }, [favourites])

  const handleSearch = useCallback((event) => {
    setSearch(event.target.value)
  }, [])

  const filteredPhotos = useMemo(() => {
    const query = search.trim().toLowerCase()

    return photos.filter((photo) =>
      photo.author.toLowerCase().includes(query),
    )
  }, [photos, search])

  const handleToggleFavourite = useCallback((photo) => {
    dispatch({
      type: 'TOGGLE_FAVOURITE',
      payload: photo,
    })
  }, [])

  const favouriteIds = useMemo(
    () => new Set(favourites.map((photo) => photo.id)),
    [favourites],
  )

  if (loading) {
    return (
      <div className="flex min-h-64 flex-col items-center justify-center gap-4">
        <div
          className="h-10 w-10 animate-spin rounded-full border-4 border-gray-200 border-t-pink-600"
          role="status"
          aria-label="Loading photos"
        />
        <p className="text-sm text-gray-600">Loading photos...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div
        role="alert"
        className="rounded-xl border border-red-200 bg-red-50 p-6 text-center text-red-700"
      >
        {error}
      </div>
    )
  }

  return (
    <section>
      <div className="mb-8">
        <label
          htmlFor="author-search"
          className="mb-2 block text-sm font-medium text-gray-700"
        >
          Search by author
        </label>

        <div className="relative">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.8"
            className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
            aria-hidden="true"
          >
            <circle cx="11" cy="11" r="7" />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16 16 4 4"
            />
          </svg>

          <input
            id="author-search"
            type="search"
            value={search}
            onChange={handleSearch}
            placeholder="Search photos by author..."
            className="w-full rounded-xl border border-gray-300 bg-white py-3 pl-12 pr-4 text-sm outline-none transition focus:border-pink-500 focus:ring-2 focus:ring-pink-100"
          />
        </div>
      </div>

      <div className="mb-5 flex items-center justify-between gap-4">
        <h2 className="text-lg font-semibold text-gray-900">
          All Photos
        </h2>
        <p className="text-sm text-gray-500">
          {filteredPhotos.length} photos
        </p>
      </div>

      {filteredPhotos.length === 0 ? (
        <div className="rounded-xl border border-dashed border-gray-300 px-4 py-12 text-center">
          <p className="font-medium text-gray-800">No photos found</p>
          <p className="mt-1 text-sm text-gray-500">
            Try searching for a different author.
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {filteredPhotos.map((photo) => (
            <PhotoCard
              key={photo.id}
              photo={photo}
              isFavourite={favouriteIds.has(photo.id)}
              onToggleFavourite={handleToggleFavourite}
            />
          ))}
        </div>
      )}
    </section>
  )
}

export default Gallery
