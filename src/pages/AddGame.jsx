import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { saveGameAPI } from '../services/apiService'
import { useAuth } from '../components/AuthProt'
import {toast} from 'react-toastify'
function AddGame() {

    const{user}=useAuth()
    const [games,setGames]=useState([])
    const [search,setSearch]=useState('')

    const fetchGameData=async()=>{
        const response=await fetch(`https://api.rawg.io/api/games?key=c5b2ec0b19834a32afd86225242cd1b4&search=${search}`)
        const data=await response.json()
        setGames(data.results)
    }

    const handleAddGame=async (gameId)=>{
        const gameResponse=await fetch(`https://api.rawg.io/api/games/${gameId}?key=c5b2ec0b19834a32afd86225242cd1b4`)
        const gameData=await gameResponse.json()
        const gameDetails={"userId":user.id,"gameId":gameData.id,"gameTitle":gameData.name,"gameImage":gameData.background_image,"rating":gameData.rating,"genres":gameData.genres.map(item=>item.name),"status":"Wishlist","url":gameData.stores?.some(item=>item.store?.name=="Steam")?gameData.stores.find(item=>item.store.name=="Steam").url:"https://store.steampowered.com/"}
        const response=await saveGameAPI(gameDetails)
        if(response.status==201){
            toast.success("Game Added to Wishlist!")
        }
    }

    useEffect(()=>{
        fetchGameData()
    },[search])

  return (
    <>
        <div className='d-flex justify-content-center m-5'>
            <input style={{width:'500px'}} value={search} type="text" className='form-control' placeholder='Enter Game' onChange={(e)=>setSearch(e.target.value)} />
        </div>
        <div className='row g-4'>
          {
            games.map(item => (
              <div key={item.id} className=' d-flex justify-content-center align-items-center col-12 col-md-4 col-lg-3'>
                <div className="card" style={{width: "18rem"}}>
                  <img src={item.background_image} className="card-img-top" alt={item.name}/>
                    <div className="card-body">
                      <h5 className="card-title">{item.name}</h5>
                      <p className="card-text">Rating : {item.rating}</p>
                      <p className="card-text">Genres : {item.genres.map(genre=>genre.name).join(", ")}</p>
                      <button style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn" onClick={()=>handleAddGame(item.id)}>Add game</button>
                    </div>
                </div>
                </div> 
            ))
          }
        </div>
    </>
  )
}

export default AddGame