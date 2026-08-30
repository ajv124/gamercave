import React, { useEffect, useState, useCallback } from 'react'
import { Link } from 'react-router-dom'
import { getUserGamesAPI } from '../services/apiService'
import { useAuth } from '../components/AuthProt'

function Home() {
  const { user } = useAuth()
  const [stats, setStats] = useState({
    wishlistCount: 0,
    libraryCount: 0,
    completedCount: 0,
    topGenresCount: 0,
    uniqueGenresList: []
  })
  const [loading, setLoading] = useState(true)

  // REPLACE THIS STRING WITH YOUR IMAGE URL
  const heroImageUrl = '/hero-banner.jpg'

  const fetchUserStats = useCallback(async () => {
    if (!user?.id) {
      setLoading(false)
      return
    }

    try {
      const response = await getUserGamesAPI(user.id)
      if (response.status === 200) {
        const games = response.data || []

        const wishlist = games.filter((g) => g.status === 'Wishlist')
        const library = games.filter((g) => g.status === 'Library')
        const completed = games.filter((g) => g.status === 'Completed')

        // Collect all unique genres across all user games
        const allGenres = games.flatMap((g) => g.genres || [])
        const uniqueGenres = [...new Set(allGenres)]

        setStats({
          wishlistCount: wishlist.length,
          libraryCount: library.length,
          completedCount: completed.length,
          topGenresCount: uniqueGenres.length,
          uniqueGenresList: uniqueGenres
        })
      }
    } catch (err) {
      console.error('Failed to load home stats:', err)
    } finally {
      setLoading(false)
    }
  }, [user?.id])

  useEffect(() => {
    fetchUserStats()
  }, [fetchUserStats])

  return (
    <div className="container py-4">
      {/* Hero Section */}
      <div className="card bg-dark text-white border-secondary overflow-hidden mb-5">
        <div className="row g-0 align-items-center">
          <div className="col-lg-6 p-4 p-md-5">
            <h1 className="display-4 fw-bold font-audiowide text-warning mb-3">
              Welcome to GamerCave
            </h1>
            <p className="lead mb-4 text-light">
              Track your game library, organize your wishlist, log your completed masterpieces, and store your favorite gaming memories all in one place.
            </p>
            <div className="d-flex gap-3 flex-wrap">
              <Link
                to="/wishlist"
                className="btn text-white px-4 py-2 fw-semibold"
                style={{ backgroundColor: '#802D1A' }}
              >
                View Wishlist
              </Link>
              <Link
                to="/library"
                className="btn btn-outline-light px-4 py-2 fw-semibold"
              >
                Open Library
              </Link>
              <Link
                to="/add-game"
                className="btn btn-outline-warning px-4 py-2 fw-semibold"
              >
                Add New Game
              </Link>
            </div>
          </div>
          <div className="col-lg-6">
            <img
              src={heroImageUrl}
              alt="Gamer Cave Hero"
              className="img-fluid w-100"
              style={{
                maxHeight: '400px',
                objectFit: 'cover',
                width: '100%'
              }}
              onError={(e) => {
                // Fallback style frame if the image URL fails to load
                e.target.src = 'https://images.unsplash.com/photo-1538481199705-c710c4e965fc?auto=format&fit=crop&w=1200&q=80'
              }}
            />
          </div>
        </div>
      </div>

      {/* Gaming Overview & Statistics Header */}
      <div className="border-bottom border-secondary pb-2 mb-4">
        <h2 className="text-white font-audiowide">Your Cave Overview</h2>
      </div>

      {loading ? (
        <div className="text-center text-white my-5">
          <div className="spinner-border" role="status">
            <span className="visually-hidden">Loading statistics...</span>
          </div>
        </div>
      ) : (
        <>
          {/* Stat Cards */}
          <div className="row g-4 mb-5">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card bg-dark text-white border-secondary h-100 text-center p-3">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted uppercase">Wishlist</h6>
                  <h1 className="display-3 fw-bold text-warning">{stats.wishlistCount}</h1>
                  <p className="card-text text-secondary small">Games waiting to be played</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card bg-dark text-white border-secondary h-100 text-center p-3">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">In Library</h6>
                  <h1 className="display-3 fw-bold text-info">{stats.libraryCount}</h1>
                  <p className="card-text text-secondary small">Currently in your backlog/playing</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card bg-dark text-white border-secondary h-100 text-center p-3">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Completed</h6>
                  <h1 className="display-3 fw-bold text-success">{stats.completedCount}</h1>
                  <p className="card-text text-secondary small">Games finished & beaten</p>
                </div>
              </div>
            </div>

            <div className="col-12 col-sm-6 col-lg-3">
              <div className="card bg-dark text-white border-secondary h-100 text-center p-3">
                <div className="card-body">
                  <h6 className="card-subtitle mb-2 text-muted">Genres Explored</h6>
                  <h1 className="display-3 fw-bold text-danger">{stats.topGenresCount}</h1>
                  <p className="card-text text-secondary small">Unique categories</p>
                </div>
              </div>
            </div>
          </div>

          {/* Genres Badges Section */}
          {stats.uniqueGenresList.length > 0 && (
            <div className="card bg-dark text-white border-secondary p-4 mb-4">
              <h5 className="card-title text-warning mb-3">Your Played Genres</h5>
              <div className="d-flex flex-wrap gap-2">
                {stats.uniqueGenresList.map((genre) => (
                  <span key={genre} className="badge bg-secondary fs-6 px-3 py-2">
                    {genre}
                  </span>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  )
}

export default Home