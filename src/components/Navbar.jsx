import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import Container from '@mui/material/Container'
import Avatar from '@mui/material/Avatar'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import MenuItem from '@mui/material/MenuItem'
import { MdMenu } from 'react-icons/md'
import { FaUser } from 'react-icons/fa'
import { toast } from 'react-toastify'
import { useAuth } from './AuthProt'
import { deleteUserAPI, deleteGameAPI, getUserGamesAPI, deleteMemoryAPI, getUserMemoriesAPI } from '../services/apiService'

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const [anchorElUser, setAnchorElUser] = useState(null)
  const location = useLocation()
  const { user, logout } = useAuth()

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
  const handleOpenUserMenu = (event) => setAnchorElUser(event.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)
  const handleCloseUserMenu = () => setAnchorElUser(null)

  const handleDeleteUser = async (userId) => {
    handleCloseUserMenu()
    if (!userId) return

    if (!window.confirm('Are you sure you want to delete this user and all associated games and memories?')) {
      return
    }

    try {
      const gamesResponse = await getUserGamesAPI(userId)
      const games = gamesResponse?.data ?? []
      if (games.length > 0) {
        await Promise.all(games.map((game) => deleteGameAPI(game.id)))
      }

      const memResponse = await getUserMemoriesAPI(userId)
      const memories = memResponse?.data ?? []
      if (memories.length > 0) {
        await Promise.all(memories.map((mem) => deleteMemoryAPI(mem.id)))
      }

      const userResponse = await deleteUserAPI(userId)
      if (userResponse.status === 200 || userResponse.status === 204) {
        logout()
        toast.info('User account and data deleted successfully!')
      }
    } catch (err) {
      toast.error('Failed to delete user account!')
    }
  }

  const isAuthPage = location.pathname === '/login' || location.pathname === '/register'

  return (
    <AppBar style={{ backgroundColor: 'black' }} position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: 'none', md: 'flex' },
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center'
            }}
          >
            <Box component="img" src="/gamercaveicon.png" alt="logo" sx={{ width: '50px', mr: 2 }} />
            <Typography
              variant="h4"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'Audiowide',
                fontWeight: 700,
                letterSpacing: '.3rem'
              }}
            >
              GamerCave
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton size="large" onClick={handleOpenNavMenu} color="inherit">
              <MdMenu />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'left' }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{ display: { xs: 'flex', md: 'none' } }}
            >
              <MenuItem
                component={Link}
                to="/wishlist"
                sx={{ color: 'white', backgroundColor: '#802D1A', mb: 1, '&:hover': { backgroundColor: '#552214' } }}
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Wishlist</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/library"
                sx={{ color: 'white', backgroundColor: '#802D1A', mb: 1, '&:hover': { backgroundColor: '#552214' } }}
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Library</Typography>
              </MenuItem>
              <MenuItem
                component={Link}
                to="/add-game"
                sx={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }}
                onClick={handleCloseNavMenu}
              >
                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Add Game</Typography>
              </MenuItem>
            </Menu>
          </Box>

          <Box
            component={Link}
            to="/"
            sx={{
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              color: 'inherit',
              textDecoration: 'none',
              alignItems: 'center'
            }}
          >
            <Box component="img" src="/gamercaveicon.png" alt="logo" sx={{ width: '40px', mr: 2 }} />
            <Typography
              variant="h5"
              noWrap
              sx={{
                mr: 2,
                fontFamily: 'Audiowide',
                fontWeight: 500,
                letterSpacing: '.3rem'
              }}
            >
              GamerCave
            </Typography>
          </Box>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button
              component={Link}
              to="/wishlist"
              onClick={handleCloseNavMenu}
              sx={{ fontFamily: 'Audiowide', my: 2, mx: 4, color: 'white', display: 'block', '&:hover': { backgroundColor: '#552214' } }}
            >
              Wishlist
            </Button>
            <Button
              component={Link}
              to="/library"
              onClick={handleCloseNavMenu}
              sx={{ fontFamily: 'Audiowide', mx: 4, my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: '#552214' } }}
            >
              Library
            </Button>
            <Button
              component={Link}
              to="/add-game"
              onClick={handleCloseNavMenu}
              sx={{ fontFamily: 'Audiowide', mx: 4, my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: '#552214' } }}
            >
              Add Game
            </Button>
          </Box>

          {user && <h6 className="me-2 mb-0">{user.username}</h6>}

          <Box sx={{ flexGrow: 0 }}>
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar><FaUser /></Avatar>
              </IconButton>
            </Tooltip>
            <Menu
              sx={{ mt: '45px' }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
              keepMounted
              transformOrigin={{ vertical: 'top', horizontal: 'right' }}
              open={Boolean(anchorElUser)}
              onClose={handleCloseUserMenu}
            >
              <MenuItem
                disabled={isAuthPage}
                sx={{ color: 'white', backgroundColor: '#802D1A', mb: 1, '&:hover': { backgroundColor: '#552214' } }}
                onClick={() => {
                  handleCloseUserMenu()
                  logout()
                }}
              >
                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Logout</Typography>
              </MenuItem>
              <MenuItem
                disabled={isAuthPage}
                sx={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }}
                onClick={() => handleDeleteUser(user?.id)}
              >
                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Delete User</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}

export default Navbar