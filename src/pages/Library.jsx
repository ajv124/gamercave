import React, { useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import LibraryCard from '../components/LibraryCard'
import { getAllGamesAPI } from '../services/apiService'
import { useState } from 'react'
import { useAuth } from '../components/AuthProt'

function Library() {

  const [libraryGames,setLibraryGames]=useState([])
  const [search,setSearch]=useState('')
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

  const filteredGames = libraryGames.filter((item) =>item.gameTitle?.toLowerCase().includes(search.toLowerCase()))

  return (
    <>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <SearchBar search={search} setSearch={setSearch}/>
      </div>
      <div className="d-flex justify-content-center align-items-center mt-5">
        <LibraryCard libraryGames={filteredGames} getAllLibraryGames={getAllLibraryGames}/>
      </div>
    </>
  )
}

export default Library