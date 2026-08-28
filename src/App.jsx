import { Routes, Route } from 'react-router-dom'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Library from './pages/Library'
import Login from './pages/Login'
import { AuthProvider } from './components/AuthProt'
import Register from './pages/Register'
import {ToastContainer} from 'react-toastify'
import ProtectedRoute from './components/ProtectedRoute'
import Memories from './pages/Memories'
import Pnf from './pages/Pnf'
import PublicRoute from './components/PublicRoute'

function App() {

  return (
    <>
      <AuthProvider>
        <Navbar />
        <Routes>
          <Route path='/' element={<ProtectedRoute><Home /></ProtectedRoute>} />
          <Route path='/wishlist' element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
          <Route path='/library' element={<ProtectedRoute><Library /></ProtectedRoute>} />
          <Route path='/memories/:gameid' element={<ProtectedRoute><Memories /></ProtectedRoute>} />
          <Route path='/login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/*' element={<Pnf/>} />
        </Routes>
      </AuthProvider>
      <ToastContainer position='top-center' theme='colored' autoClose={3000} />
    </>
  )
}

export default App
