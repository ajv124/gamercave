import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { MdMenu } from "react-icons/md";
import { useAuth } from './AuthProt';
import { FaUser } from "react-icons/fa";
import { useLocation } from 'react-router-dom'
import { deleteUserAPI, deleteUserGamesAPI, getAllGamesAPI , deleteUserMemoriesAPI, getAllMemoriesAPI} from '../services/apiService';
import { toast } from 'react-toastify'


function Navbar() {
    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);
    const location = useLocation()

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    const { user, logout } = useAuth()

    const handleDeleteUser = async (userId) => {
        if (confirm("Are you sure you want to delete this user and all of its games")) {
            await deleteUserAPI(userId)
            const gamesResponse=await getAllGamesAPI()
            if (gamesResponse.data.filter(item => item.userId == userId).length > 0) {
                await deleteUserGamesAPI(userId);
            }
            const memResponse=await getAllMemoriesAPI()
            if (memResponse.data.filter(item => item.userId == userId).length > 0) {
                await deleteUserMemoriesAPI(userId);
            }
            logout()
            toast.info("User has been deleted successfully!")
        }
    }

    return (
        <AppBar style={{ backgroundColor: 'black' }} position="static">
            <Container maxWidth="xl">
                <Toolbar disableGutters>
                    <Box
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src="/gamercaveicon.png"
                            alt="logo"
                            sx={{
                                width: '50px',
                                mr: 2,
                            }}
                        />
                        <Typography
                            variant="h4"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'Audiowide',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                            }}
                        >
                            GamerCave
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                        <IconButton
                            size="large"
                            aria-label="account of current user"
                            aria-controls="menu-appbar"
                            aria-haspopup="true"
                            onClick={handleOpenNavMenu}
                            color="inherit"
                        >
                            <MdMenu />
                        </IconButton>
                        <Menu
                            id="menu-appbar"
                            anchorEl={anchorElNav}
                            anchorOrigin={{
                                vertical: 'bottom',
                                horizontal: 'left',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                            open={Boolean(anchorElNav)}
                            onClose={handleCloseNavMenu}
                            sx={{ display: { xs: 'flex', md: 'none' } }}
                        >
                            <MenuItem component="a" href='/wishlist' sx={{ color: 'white', backgroundColor: '#802D1A', mb: 1, '&:hover': { backgroundColor: '#552214' } }} onClick={handleCloseNavMenu}>
                                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Wishlist</Typography>
                            </MenuItem>
                            <MenuItem component="a" href='/library' sx={{ color: 'white', backgroundColor: '#802D1A', mb:1, '&:hover': { backgroundColor: '#552214' } }} onClick={handleCloseNavMenu}>
                                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Library</Typography>
                            </MenuItem>
                            <MenuItem component="a" href='/add-game' sx={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} onClick={handleCloseNavMenu}>
                                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Add Game</Typography>
                            </MenuItem>
                        </Menu>
                    </Box>
                    <Box
                        component="a"
                        href="/"
                        sx={{
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        <Box
                            component="img"
                            src="/gamercaveicon.png"
                            alt="logo"
                            sx={{
                                width: '40px',
                                mr: 2,
                            }}
                        />
                        <Typography
                            variant="h5"
                            noWrap
                            sx={{
                                mr: 2,
                                fontFamily: 'Audiowide',
                                fontWeight: 500,
                                letterSpacing: '.3rem',
                            }}
                        >
                            GamerCave
                        </Typography>
                    </Box>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        <Button
                            component="a"
                            href='/wishlist'
                            onClick={handleCloseNavMenu}
                            sx={{ fontFamily: 'Audiowide', my: 2, mx: 4, color: 'white', display: 'block', '&:hover': { backgroundColor: '#552214' } }}
                        >
                            Wishlist
                        </Button>
                        <Button
                            component="a"
                            href='/library'
                            onClick={handleCloseNavMenu}
                            sx={{ fontFamily: 'Audiowide', mx: 4, my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: '#552214' } }}
                        >
                            Library
                        </Button>
                        <Button
                            component="a"
                            href='/add-game'
                            onClick={handleCloseNavMenu}
                            sx={{ fontFamily: 'Audiowide', mx: 4, my: 2, color: 'white', display: 'block', '&:hover': { backgroundColor: '#552214' } }}
                        >
                            Add Game
                        </Button>
                    </Box>
                    <h6 className='me-2'>{user?.username}</h6>
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
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            keepMounted
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            open={Boolean(anchorElUser)}
                            onClose={handleCloseUserMenu}
                        >
                            <MenuItem disabled={location.pathname == '/login' || location.pathname == '/register'} component="a" href='/login' sx={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} onClick={logout}>
                                <Typography sx={{ fontFamily: 'Audiowide', textAlign: 'center' }}>Logout</Typography>
                            </MenuItem>
                            <MenuItem disabled={location.pathname == '/login' || location.pathname == '/register'} sx={{ color: 'white', backgroundColor: '#802D1A', '&:hover': { backgroundColor: '#552214' } }} onClick={() => handleDeleteUser(user?.id)}>
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