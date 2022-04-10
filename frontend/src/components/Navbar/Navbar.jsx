import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import { Link } from 'react-router-dom'
import { AuthContext } from '../../context/AuthContext'
import { styled } from '@mui/material/styles';
import Constants from '../../Constants'

const ResponsiveAppBar = () => {

  const { role, authenticated } = React.useContext(AuthContext)

  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);

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

  const navLinks = [
    {
      nav: '',
      route: '/',
      isAuthenticated: false
    },
    {
      nav: 'Dashboard',
      route: `/${role}/dashboard`,
      isAuthenticated: true
    },
    {
      nav: 'Products',
      route: `/${role}/products`,
      isAuthenticated: true
    },
    {
      nav: role == Constants.ROLE[2] ? 'My Purchases' : 'Inventory',
      route: role == Constants.ROLE[2] ? `/${role}/purchases` : `/${role}/inventory`,
      isAuthenticated: true
    }
  ]

  const CustomLink = styled(Link)`
    textDecoration: none !important;
    color: white;
    underline: none;
 `

  return (
    <AppBar position="sticky" color="black">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h5"
            noWrap
            component="div"
            sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, color: 'white' }}

          >
            <Avatar src="/logo.png" alt="logo" />&nbsp;DeTrace
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
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
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {navLinks.map((link) => (link.isAuthenticated == authenticated &&
                <MenuItem key={link.nav} onClick={handleCloseNavMenu}>
                  <Typography textAlign="center">{link.nav}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
          >
            <Avatar src="/logo.png" alt="logo" />
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (link.isAuthenticated == authenticated &&
              <Button
                key={link.nav}
                onClick={handleCloseNavMenu}
                sx={{ my: 2, color: 'white', display: 'block' }}
              >
                <CustomLink to={link.route} style={{ textDecoration: 'none', transform: 'none', }}>{link.nav}</CustomLink>
              </Button>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;
