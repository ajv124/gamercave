import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import LibraryCard from '../components/LibraryCard'
import { getAllGamesAPI } from '../services/apiService'
import { useState } from 'react'

function Library() {

  const [libraryGames,setLibraryGames]=useState([])

  useEffect(()=>{
    getAllLibraryGames()
  },[])

  const getAllLibraryGames=async()=>{
    const response=await getAllGamesAPI()
    if(response.status==200){
      setLibraryGames(response.data.filter(item=>item.status!='wishlist'))
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