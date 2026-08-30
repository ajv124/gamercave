import { useState, useEffect } from 'react'
import { saveGameAPI, getUserGamesAPI } from '../services/apiService'
import { useAuth } from '../components/AuthProt'
import { toast } from 'react-toastify'

const RAWG_API_KEY = 'c5b2ec0b19834a32afd86225242cd1b4'

function AddGame() {
  const { user } = useAuth()
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)

  const fetchGameData = async (query) => {
    setLoading(true)
    try {
      const endpoint = query
        ? `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}`
        : `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=12`
      
      const response = await fetch(endpoint)
      const data = await response.json()
      setGames(data.results || [])
    } catch (err) {
      toast.error('Failed to fetch games!')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchGameData(search)
    }, 400)

    return () => clearTimeout(timer)
  }, [search])

  const handleAddGame = async (gameId) => {
    if (!user) {
      toast.error('Please log in to add games!')
      return
    }

    try {
      const existingUserGames = await getUserGamesAPI(user.id)
      const isAlreadyAdded = existingUserGames?.data?.some(
        (g) => g.gameId === gameId || g.gameId === String(gameId)
      )

      if (isAlreadyAdded) {
        toast.warning('This game is already in your list!')
        return
      }

      const gameResponse = await fetch(
        `https://api.rawg.io/api/games/${gameId}?key=${RAWG_API_KEY}`
      )
      const gameData = await gameResponse.json()

      const steamStore = gameData.stores?.find((item) => item.store?.name === 'Steam')

      const gameDetails = {
        userId: user.id,
        gameId: gameData.id,
        gameTitle: gameData.name,
        gameImage: gameData.background_image || '/placeholder.png',
        rating: gameData.rating || 0,
        genres: gameData.genres ? gameData.genres.map((item) => item.name) : [],
        status: 'Wishlist',
        url: steamStore?.url || 'https://store.steampowered.com/'
      }

      const response = await saveGameAPI(gameDetails)
      if (response.status === 201) {
        toast.success('Game added to Wishlist!')
      }
    } catch (err) {
      toast.error('Failed to add game!')
    }
  }

  return (
    <div className="container py-4">
      <div className="d-flex justify-content-center mb-4">
        <input
          style={{ maxWidth: '500px' }}
          value={search}
          type="text"
          className="form-control"
          placeholder="Search games..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="text-center my-5">
          <div className="spinner-border text-light" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : (
        <div className="row g-4 justify-content-center">
          {games.map((item) => (
            <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
              <div className="card w-100 bg-dark text-white border-secondary h-100">
                <img
                  src={item.background_image || '/placeholder.png'}
                  className="card-img-top"
                  alt={item.name}
                  style={{ height: '180px', objectFit: 'cover' }}
                />
                <div className="card-body d-flex flex-column justify-content-between">
                  <div>
                    <h5 className="card-title text-truncate">{item.name}</h5>
                    <p className="card-text mb-1">Rating: {item.rating || 'N/A'}</p>
                    <p className="card-text small text-muted">
                      Genres: {item.genres?.map((g) => g.name).join(', ') || 'N/A'}
                    </p>
                  </div>
                  <button
                    style={{ backgroundColor: '#802D1A', color: 'white' }}
                    className="btn mt-3 w-100"
                    onClick={() => handleAddGame(item.id)}
                  >
                    Add Game
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

export default AddGame