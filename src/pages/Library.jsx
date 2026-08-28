import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import LibraryCard from '../components/LibraryCard'
import { getAllGamesAPI } from '../services/apiService'
import { useState } from 'react'
import { useAuth } from '../components/AuthProt'

function Library() {

  const [libraryGames,setLibraryGames]=useState([])
  const {user}=useAuth()

  useEffect(()=>{
    getAllLibraryGames()
  },[])

  const getAllLibraryGames=async()=>{
    const response=await getAllGamesAPI()
    if(response.status==200){
      setLibraryGames(response.data.filter(item=>item.status!='Wishlist'&&item.userId==user.id))
    }
  }

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <SearchBar games={libraryGames}/>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <LibraryCard libraryGames={libraryGames}/>
      </div>
    </>
  )
}

export default Library