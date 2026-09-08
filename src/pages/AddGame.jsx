import { useState, useEffect } from 'react'
import { saveGameAPI, getUserGamesAPI } from '../services/apiService'
import { useAuth } from '../components/AuthProt'
import { toast } from 'react-toastify'

const RAWG_API_KEY = 'c5b2ec0b19834a32afd86225242cd1b4'

function AddGame() {
  const { user } = useAuth()
  const [games, setGames] = useState([])
  const [search, setSearch] = useState('')

  const fetchGameData = async (query = '') => {
    try {
      const response = await fetch(
        query
          ? `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&search=${encodeURIComponent(query)}`
          : `https://api.rawg.io/api/games?key=${RAWG_API_KEY}&page_size=12`
      )
      const data = await response.json()
      setGames(data.results || [])
    } catch (err) {
      toast.error('Failed to fetch games!')
    }
  }

  useEffect(() => {
    fetchGameData()
  }, [])

  const handleSearchSubmit = (e) => {
    e.preventDefault()
    fetchGameData(search)
  }

  const handleAddGame = async (selectedGame) => {
    if (!user) {
      toast.error('Please log in to add games!')
      return
    }

    try {
      if ((await getUserGamesAPI(user.id))?.data?.some((game) => String(game.gameId) === String(selectedGame.id))) {
        toast.warning('This game is already in your list!')
        return
      }

      const response = await saveGameAPI({
        userId: user.id,
        gameId: selectedGame.id,
        gameTitle: selectedGame.name,
        gameImage: selectedGame.background_image,
        rating: selectedGame.rating || 0,
        genres: selectedGame.genres ? selectedGame.genres.map((genre) => genre.name) : [],
        status: 'Wishlist',
        url: 'https://store.steampowered.com/'
      })

      if (response.status === 201) {
        toast.success('Game added to Wishlist!')
      }
    } catch (err) {
      toast.error('Failed to add game!')
    }
  }

  return (
    <div className="container py-4">
      <form onSubmit={handleSearchSubmit} className="d-flex justify-content-center gap-2 mb-4">
        <input
          style={{ maxWidth: '500px' }}
          value={search}
          type="text"
          className="form-control"
          placeholder="Search games..."
          onChange={(e) => setSearch(e.target.value)}
        />
        <button type="submit" className="btn btn-primary">
          Search
        </button>
      </form>

      <div className="row g-4 justify-content-center">
        {games.map((item) => (
          <div key={item.id} className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch">
            <div className="card w-100 bg-dark text-white border-secondary h-100">
              <img
                src={item.background_image}
                className="card-img-top"
                alt={item.name}
                style={{ height: '180px', objectFit: 'cover' }}
              />
              <div className="card-body d-flex flex-column justify-content-between">
                <div>
                  <h5 className="card-title text-truncate">{item.name}</h5>
                  <p className="card-text mb-1">Rating: {item.rating || 'N/A'}</p>
                  <p className="card-text small text-muted">
                    Genres: {item.genres?.map((genre) => genre.name).join(', ') || 'N/A'}
                  </p>
                </div>
                <button
                  style={{ backgroundColor: '#802D1A', color: 'white' }}
                  className="btn mt-3 w-100"
                  onClick={() => handleAddGame(item)}
                >
                  Add Game
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default AddGame