import React from 'react'

function LibraryCard({ libraryGames }) {
  return (
    <div className='row g-4'>
      {
        libraryGames.map(item => (
          <div key={item.gameTitle} className='col-md-4'>
            <div className="card" style={{width: "18rem"}}>
              <img src={item.gameImage} className="card-img-top" alt={item.gameTitle}/>
                <div className="card-body">
                  <h5 className="card-title">{item.gameTitle}</h5>
                  <p className="card-text">Rating : {item.rating}</p>
                  <p className="card-text">Genres : {item.genres.join(", ")}</p>
                  <p className="card-text">Status : {item.status}</p>
                  <a href={item.url} style={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} className="btn">Open Steam</a>
                </div>
            </div>
            </div> 
        ))
      }
    </div>
  )
}

export default LibraryCard