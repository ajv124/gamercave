import React, { useState, useEffect } from 'react'

function SearchBar({ games, setFilteredGames }) {
  const [search, setSearch] = useState('')
  const [selectedGenre, setSelectedGenre] = useState('')
  const [selectedRating, setSelectedRating] = useState('')

  // Dynamically derive available genres from current games dataset
  const genres = [...new Set(games.flatMap((game) => game.genres || []))]

  useEffect(() => {
    let result = games || []

    if (search.trim() !== '') {
      result = result.filter((item) =>
        item.gameTitle?.toLowerCase().includes(search.toLowerCase())
      )
    }

    if (selectedGenre !== '') {
      result = result.filter((item) =>
        item.genres?.includes(selectedGenre)
      )
    }

    if (selectedRating !== '') {
      result = result.filter((item) =>
        Number(item.rating) >= Number(selectedRating)
      )
    }

    setFilteredGames(result)
  }, [search, selectedGenre, selectedRating, games, setFilteredGames])

  const handleReset = () => {
    setSearch('')
    setSelectedGenre('')
    setSelectedRating('')
  }

  return (
    <div className="d-flex flex-column align-items-center w-100 my-4 px-3">
      {/* Search Bar Input */}
      <div className="w-100 d-flex justify-content-center mb-3">
        <input
          style={{ maxWidth: '500px' }}
          value={search}
          type="text"
          className="form-control bg-dark text-white border-secondary"
          placeholder="Search game title..."
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {/* Filter Dropdowns Controls */}
      <div
        className="d-flex gap-2 justify-content-center flex-wrap"
        style={{ maxWidth: '500px', width: '100%' }}
      >
        <select
          className="form-select bg-dark text-white border-secondary flex-fill"
          value={selectedGenre}
          onChange={(e) => setSelectedGenre(e.target.value)}
        >
          <option value="">All Genres</option>
          {genres.map((genre) => (
            <option key={genre} value={genre}>
              {genre}
            </option>
          ))}
        </select>

        <select
          className="form-select bg-dark text-white border-secondary flex-fill"
          value={selectedRating}
          onChange={(e) => setSelectedRating(e.target.value)}
        >
          <option value="">All Ratings</option>
          <option value="4">4+ Stars</option>
          <option value="3">3+ Stars</option>
          <option value="2">2+ Stars</option>
        </select>

        {(search || selectedGenre || selectedRating) && (
          <button
            className="btn btn-outline-light"
            onClick={handleReset}
            type="button"
          >
            Clear
          </button>
        )}
      </div>
    </div>
  )
}

export default SearchBar