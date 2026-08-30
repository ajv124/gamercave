import React from 'react'

function SearchBar({ search,setSearch }) {

  return (
      <div className='d-flex justify-content-center m-5'>
        <input style={{ width: '500px' }} value={search} type="text" className='form-control' placeholder='Enter Game' onChange={(e) => setSearch(e.target.value)} />
      </div>

  )
}

export default SearchBar