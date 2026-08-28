import React from 'react'
import {toast} from 'react-toastify'
import { deleteGameAPI } from '../services/apiService'

function WishlistCard({ wishlistGames }) {

  const handleDeleteGame= async(id)=>{
    if(confirm("Are you sure you want to delete this game?")){
      const response=await deleteGameAPI(id)
      if(response.status==200){
        toast.info("Game Deleted Successfully!")
      }
    }
  }

  return (
    <div className='row g-4'>
      {
        wishlistGames.map(item => (
          <div key={item.id} className='col-md-4'>
            <div className="card" style={{width: "18rem"}}>
              <img src={item.gameImage} className="card-img-top" alt={item.gameTitle}/>
                <div className="card-body">
                  <h5 className="card-title">{item.gameTitle}</h5>
                  <p className="card-text">Rating : {item.rating}</p>
                  <p className="card-text">Genres : {item.genres?.join(", ")}</p>
                  <p className="card-text">Status : {item.status}</p>
                  <a href={item.url} style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn">Open Steam</a>
                  <div className="d-flex flex-row justify-content-center mt-2">
                    <button style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn" onClick={()=>handleDeleteGame(item.gameId)}>Delete Game</button>
                  </div>
                </div>
            </div>
            </div> 
        ))
      }
    </div>
  )
}

export default WishlistCard