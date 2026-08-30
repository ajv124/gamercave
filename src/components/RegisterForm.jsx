import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { getUserAPI, saveUserAPI } from '../services/apiService'

function RegisterForm() {
  const [userDetails, setUserDetails] = useState({ username: '', password: '' })
  const navigate = useNavigate()

  const handleSaveUser = async (e) => {
    e.preventDefault()
    const { username, password } = userDetails

    if (!username || !password) {
      toast.info('Please fill the form completely!')
      return
    }

    try {
      const checkResponse = await getUserAPI(username)
      if (checkResponse.status === 200) {
        if (checkResponse.data.length > 0) {
          toast.error('Username is already taken!')
        } else {
          const response = await saveUserAPI(userDetails)
          if (response.status === 201) {
            toast.success('Registration successful!')
            navigate('/login')
          }
        }
      }
    } catch (err) {
      toast.error('Something went wrong. Try again!')
    }
  }

  return (
    <div className="d-flex justify-content-center align-items-center min-vh-100">
      <div
        className="container d-flex flex-column justify-content-center align-items-center p-4"
        style={{
          backgroundColor: '#AD391F',
          color: 'white',
          maxWidth: '500px',
          width: '90%',
          borderRadius: '10px',
          gap: '20px'
        }}
      >
        <img style={{ width: '50px' }} src="/gamercaveicon.png" alt="logo" />
        <h1>Register</h1>
        <form className="w-100" onSubmit={handleSaveUser}>
          <div className="d-flex flex-column align-items-center" style={{ gap: '20px' }}>
            <input
              value={userDetails.username}
              onChange={(e) => setUserDetails({ ...userDetails, username: e.target.value })}
              className="form-control"
              type="text"
              placeholder="Enter username"
            />
            <input
              value={userDetails.password}
              onChange={(e) => setUserDetails({ ...userDetails, password: e.target.value })}
              className="form-control"
              type="password"
              placeholder="Enter password"
            />
            <button type="submit" className="btn btn-light" style={{ color: '#AD391F', fontWeight: 'bold' }}>
              Submit
            </button>
            <div className="d-flex flex-row">
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/login">
                Already Registered? Click here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default RegisterForm