import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { useAuth } from './AuthProt'
import { getUserAPI } from '../services/apiService'

function LoginForm() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [userDetails, setUserDetails] = useState({ username: '', password: '' })

  const handleLoginUser = async (e) => {
    e.preventDefault()
    const { username, password } = userDetails

    if (!username || !password) {
      toast.error('Please fill in all fields')
      return
    }

    try {
      const response = await getUserAPI(username)
      if (response.status === 200) {
        if (response.data.length > 0) {
          const user = response.data[0]
          if (user.password === password) {
            toast.success('Logged In Successfully!')
            login(user)
            navigate('/')
          } else {
            toast.error('Wrong Password!')
          }
        } else {
          toast.error('Please enter valid username!')
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
        <h1>Login</h1>
        <form className="w-100" onSubmit={handleLoginUser}>
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
              <Link style={{ textDecoration: 'none', color: 'white' }} to="/register">
                Not registered yet? Click here
              </Link>
            </div>
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm