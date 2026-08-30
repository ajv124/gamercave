import React from 'react'
import { toast } from 'react-toastify'
import { changeStatusAPI, deleteGameAPI, getGameAPI } from '../services/apiService'

function WishlistCard({ wishlistGames, getAllWishlistGames }) {
  const handleDeleteGame = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      try {
        const response = await deleteGameAPI(id)
        if (response.status === 200 || response.status === 204) {
          toast.info('Game Deleted Successfully!')
          getAllWishlistGames()
        }
      } catch (err) {
        toast.error('Failed to delete game!')
      }
    }
  }

  const changeStatus = async (id) => {
    try {
      const gameResponse = await getGameAPI(id)
      if (gameResponse.status === 200) {
        const gameDetails = { ...gameResponse.data, status: 'Library' }
        const statusResponse = await changeStatusAPI(id, gameDetails)
        if (statusResponse.status === 200) {
          toast.info('Game Moved to Library Successfully!')
          getAllWishlistGames()
        }
      }
    } catch (err) {
      toast.error('Failed to update game status!')
    }
  }

  if (!wishlistGames || wishlistGames.length === 0) {
    return (
      <div className="text-center text-muted my-5">
        <h4>No games found in your Wishlist.</h4>
      </div>
    )
  }

  return (
    <div className="row g-4 w-100 justify-content-center">
      {wishlistGames.map((item) => (
        <div
          key={item.id}
          className="col-12 col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch"
        >
          <div className="card w-100 bg-dark text-white border-secondary h-100">
            <img
              src={item.gameImage || '/placeholder.png'}
              className="card-img-top"
              alt={item.gameTitle}
              style={{ height: '180px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column justify-content-between">
              <div>
                <h5 className="card-title text-truncate">{item.gameTitle}</h5>
                <p className="card-text mb-1">Rating: {item.rating || 'N/A'}</p>
                <p className="card-text small text-muted mb-1">
                  Genres: {item.genres?.join(', ') || 'N/A'}
                </p>
                <span className="badge bg-warning text-dark mb-3">
                  {item.status}
                </span>
              </div>
              <div className="d-flex flex-column gap-2 mt-2">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn text-white w-100"
                  style={{ backgroundColor: '#802D1A' }}
                >
                  Open Steam
                </a>
                <button
                  className="btn text-white w-100"
                  style={{ backgroundColor: '#802D1A' }}
                  onClick={() => changeStatus(item.id)}
                >
                  Move to Library
                </button>
                <button
                  className="btn btn-outline-danger w-100"
                  onClick={() => handleDeleteGame(item.id)}
                >
                  Delete Game
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default WishlistCard