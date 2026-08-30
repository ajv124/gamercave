import React, { useEffect, useState, useCallback } from 'react'
import SearchBar from '../components/SearchBar'
import WishlistCard from '../components/WishlistCard'
import { getUserGamesAPI } from '../services/apiService'
import { useAuth } from '../components/AuthProt'

function Wishlist() {
  const [wishlistGames, setWishlistGames] = useState([])
  const [filteredGames, setFilteredGames] = useState([])
  const { user } = useAuth()

  const getAllWishlistGames = useCallback(async () => {
    if (!user?.id) return
    try {
      const response = await getUserGamesAPI(user.id)
      if (response.status === 200) {
        const userWishlist = response.data.filter(
          (item) => item.status === 'Wishlist'
        )
        setWishlistGames(userWishlist)
        setFilteredGames(userWishlist)
      }
    } catch (err) {
      console.error('Failed to fetch wishlist games:', err)
    }
  }, [user?.id])

  useEffect(() => {
    getAllWishlistGames()
  }, [getAllWishlistGames])

  return (
    <div className="container py-3">
      <SearchBar games={wishlistGames} setFilteredGames={setFilteredGames} />
      <WishlistCard
        wishlistGames={filteredGames}
        getAllWishlistGames={getAllWishlistGames}
      />
    </div>
  )
}

export default Wishlist