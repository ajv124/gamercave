import React from 'react'
import {toast} from 'react-toastify'
import { changeStatusAPI, deleteGameAPI, getGameAPI } from '../services/apiService'

function LibraryCard({ libraryGames,getAllLibraryGames }) {

  const handleDeleteGame=async(id)=>{
    if(confirm("Are you sure you want to delete this game?")){
      const response=await deleteGameAPI(id)
      if(response.status==200){
        toast.info("Game Deleted Successfully!")
        getAllLibraryGames()
      }
    }
  }

  const changeStatus=async(id)=>{
    const gameResponse=await getGameAPI(id)
    if(gameResponse.status==200){
      const gameDetails={...gameResponse.data, status:(gameResponse.data.status=="Library"?"Completed":"Library")}
      const statusResponse=await changeStatusAPI(id,gameDetails)
      if(statusResponse.status==200){
        toast.info("Status Changed Successfully!")
        getAllLibraryGames()
      }
    }
  }

  return (
    <div className='row g-4'>
      {
        libraryGames.map(item => (
          <div key={item.id} className='d-flex justify-content-center align-items-center col-12 col-md-4 col-lg-3'>
            <div className="card" style={{width: "18rem"}}>
              <img src={item.gameImage} className="card-img-top" alt={item.gameTitle}/>
                <div className="card-body">
                  <h5 className="card-title">{item.gameTitle}</h5>
                  <p className="card-text">Rating : {item.rating}</p>
                  <p className="card-text">Genres : {item.genres?.join(", ")}</p>
                  <p className="card-text">Status : {item.status}</p>
                  <a href={item.url} style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn">Open Steam</a>
                  <button style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn my-2" onClick={()=>handleDeleteGame(item.id)}>Delete Game</button>
                  <button style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn" onClick={()=>changeStatus(item.id)}>Change Status</button>
                </div>
            </div>
            </div> 
        ))
      }
    </div>
  )
}

export default LibraryCard