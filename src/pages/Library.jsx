import React, { useEffect, useState, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import LibraryCard from '../components/LibraryCard'
import { getUserGamesAPI } from '../services/apiService'
import { useAuth } from '../components/AuthProt'

function Library() {
  const [libraryGames, setLibraryGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const { user } = useAuth()

  const getAllLibraryGames = useCallback(async () => {
    if (!user?.id) return
    try {
      const response = await getUserGamesAPI(user.id)
      if (response.status === 200) {
        const games = response.data.filter((item) => item.status !== 'Wishlist')
        setLibraryGames(games)
        setFilteredGames(games)
      }
    } catch (err) {
      console.error('Failed to fetch library games:', err)
    }
  }, [user?.id])

  useEffect(() => {
    getAllLibraryGames()
  }, [getAllLibraryGames])

  return (
    <div className="container py-3">
      <SearchBar games={libraryGames} setFilteredGames={setFilteredGames} />

      <section className="mb-5">
        <div className="border-bottom border-secondary pb-2 mb-4">
          <h2 className="text-white">In Library</h2>
        </div>
        <LibraryCard
          games={filteredGames.filter((game) => game.status === 'Library')}
          getAllLibraryGames={getAllLibraryGames}
        />
      </section>

      <section className="mb-5">
        <div className="border-bottom border-secondary pb-2 mb-4">
          <h2 className="text-white">Completed Games</h2>
        </div>
        <LibraryCard
          games={filteredGames.filter((game) => game.status === 'Completed')}
          getAllLibraryGames={getAllLibraryGames}
        />
      </section>
    </div>
  )
}

export default Library