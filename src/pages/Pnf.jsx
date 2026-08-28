import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div style={{color:'#AD391F'}} className='d-flex justify-content-center align-items-center flex-column mt-5'>
      <img src="/pnf.png" alt="pnf" style={{width:'400px'}} />
      <h2 className="mt-5">SORRY, LOOKS LIKE YOU'RE LOST</h2>
      <p>The page you're looking for is not available!!!</p>
      <Link to={'/'} className='btn btn-light' style={{color:'white',backgroundColor:'#AD391F'}}>Back to Home</Link>
    </div>
  )
}

export default Pnf