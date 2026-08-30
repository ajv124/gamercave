import React from 'react'
import { Link } from 'react-router-dom'

function Pnf() {
  return (
    <div style={{ color: '#AD391F' }} className="d-flex justify-content-center align-items-center flex-column mt-5 text-center px-3">
      <img src="/pnf.png" alt="Page Not Found" style={{ maxWidth: '400px', width: '100%' }} />
      <h2 className="mt-4">SORRY, LOOKS LIKE YOU'RE LOST</h2>
      <p>The page you're looking for is not available!</p>
      <Link to="/" className="btn" style={{ color: 'white', backgroundColor: '#AD391F', border: 'none' }}>
        Back to Home
      </Link>
    </div>
  )
}

export default Pnf