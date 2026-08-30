import { Routes, Route } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Wishlist from './pages/Wishlist'
import Library from './pages/Library'
import Login from './pages/Login'
import Register from './pages/Register'
import Memories from './pages/Memories'
import AddGame from './pages/AddGame'
import Pnf from './pages/Pnf'
import { AuthProvider } from './components/AuthProt'
import ProtectedRoute from './components/ProtectedRoute'
import PublicRoute from './components/PublicRoute'
import './App.css'

function App() {
  return (
    <AuthProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path="/wishlist" element={<ProtectedRoute><Wishlist /></ProtectedRoute>} />
        <Route path="/library" element={<ProtectedRoute><Library /></ProtectedRoute>} />
        <Route path="/memories/:gameid" element={<ProtectedRoute><Memories /></ProtectedRoute>} />
        <Route path="/add-game" element={<ProtectedRoute><AddGame /></ProtectedRoute>} />
        <Route path="/login" element={<PublicRoute><Login /></PublicRoute>} />
        <Route path="/register" element={<PublicRoute><Register /></PublicRoute>} />
        <Route path="*" element={<Pnf />} />
      </Routes>
      <ToastContainer position="top-center" theme="colored" autoClose={3000} />
    </AuthProvider>
  )
}

export default App