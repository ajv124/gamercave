import React, { useEffect, useState } from 'react'
import SearchBar from '../components/SearchBar'
import WishlistCard from '../components/WishlistCard'
import { getAllGamesAPI } from '../services/apiService'

function Wishlist() {

  const [wishlistGames,setWishlistGames]=useState([])

  useEffect(()=>{
      getAllWishlistGames()
  },[])

  const getAllWishlistGames=async()=>{
    const response=await getAllGamesAPI()
      if(response.status==200){
        setWishlistGames(response.data.filter(item=>item.status=='wishlist'))
      }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <SearchBar games={wishlistGames}/>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <WishlistCard wishlistGames={wishlistGames}/>
      </div>
    </>
  )
}

export default Wishlist