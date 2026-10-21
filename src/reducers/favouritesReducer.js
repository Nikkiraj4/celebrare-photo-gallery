
const STORAGE_KEY = 'celebrare-favourites'

export function getInitialFavourites() {
  try {
    const savedFavourites = localStorage.getItem(STORAGE_KEY)

    if (!savedFavourites) {
      return []
    }

    const parsedFavourites = JSON.parse(savedFavourites)

    return Array.isArray(parsedFavourites) ? parsedFavourites : []
  } catch {
    return []
  }
}

export function favouritesReducer(state, action) {
  switch (action.type) {
    case 'TOGGLE_FAVOURITE': {
      const isFavourite = state.some(
        (photo) => photo.id === action.payload.id,
      )

      if (isFavourite) {
        return state.filter(
          (photo) => photo.id !== action.payload.id,
        )
      }

      return [...state, action.payload]
    }

    default:
      return state
  }
}
