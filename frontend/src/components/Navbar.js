import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  Container,
  IconButton,
  Menu,
  MenuItem,
  Avatar,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Tooltip,
  Divider,
} from '@mui/material';
import {
  Quiz as QuizIcon,
  Menu as MenuIcon,
  Person as PersonIcon,
  Logout as LogoutIcon,
  Add as AddIcon,
  List as ListIcon,
  Home as HomeIcon,
} from '@mui/icons-material';
import { Link as RouterLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { toast } from 'react-toastify';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);
const MotionButton = motion(Button);

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const handleLogout = () => {
    logout();
    navigate('/login');
    toast.success('Successfully logged out!');
  };

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleProfileMenuClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const menuItems = user ? [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Quizzes', icon: <ListIcon />, path: '/quizzes' },
    { text: 'Create Quiz', icon: <AddIcon />, path: '/create-quiz' },
  ] : [
    { text: 'Home', icon: <HomeIcon />, path: '/' },
    { text: 'Login', icon: <PersonIcon />, path: '/login' },
    { text: 'Register', icon: <PersonIcon />, path: '/register' },
  ];

  const drawer = (
    <Box 
      sx={{ 
        width: 280,
        background: 'linear-gradient(135deg, #f8fafc 0%, #eef2ff 100%)',
        height: '100%',
      }} 
      role="presentation" 
      onClick={handleDrawerToggle}
    >
      <Box sx={{ p: 2, display: 'flex', alignItems: 'center', gap: 1 }}>
        <QuizIcon sx={{ color: '#4f46e5' }} />
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            background: 'linear-gradient(45deg, #4f46e5 30%, #ec4899 90%)',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Quiz Maker
        </Typography>
      </Box>
      <Divider />
      <List>
        {menuItems.map((item) => (
          <ListItem
            button
            key={item.text}
            component={RouterLink}
            to={item.path}
            sx={{
              '&:hover': {
                backgroundColor: 'rgba(79, 70, 229, 0.04)',
              },
            }}
          >
            <ListItemIcon sx={{ color: '#4f46e5' }}>{item.icon}</ListItemIcon>
            <ListItemText 
              primary={item.text} 
              primaryTypographyProps={{
                fontWeight: 500,
              }}
            />
          </ListItem>
        ))}
        {user && (
          <>
            <Divider />
            <ListItem
              button
              onClick={handleLogout}
              sx={{
                '&:hover': {
                  backgroundColor: 'rgba(239, 68, 68, 0.04)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#ef4444' }}><LogoutIcon /></ListItemIcon>
              <ListItemText 
                primary="Logout" 
                primaryTypographyProps={{
                  fontWeight: 500,
                  color: '#ef4444',
                }}
              />
            </ListItem>
          </>
        )}
      </List>
    </Box>
  );

  return (
    <AppBar 
      position="sticky" 
      elevation={0} 
      sx={{ 
        background: 'rgba(255, 255, 255, 0.9)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)',
        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <MotionBox
            component={RouterLink}
            to="/"
            sx={{
              display: 'flex',
              alignItems: 'center',
              textDecoration: 'none',
              color: 'inherit',
              flexGrow: 1,
            }}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.2 }}
          >
            <QuizIcon sx={{ mr: 1, color: '#4f46e5' }} />
            <Typography
              variant="h6"
              sx={{
                fontWeight: 800,
                letterSpacing: '-0.5px',
                background: 'linear-gradient(45deg, #4f46e5 30%, #ec4899 90%)',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
              }}
            >
              Quiz Maker
            </Typography>
          </MotionBox>

          {isMobile ? (
            <>
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={handleDrawerToggle}
                sx={{ 
                  ml: 2,
                  color: '#4f46e5',
                  '&:hover': {
                    backgroundColor: 'rgba(79, 70, 229, 0.04)',
                  },
                }}
              >
                <MenuIcon />
              </IconButton>
              <Drawer
                anchor="right"
                open={mobileOpen}
                onClose={handleDrawerToggle}
                ModalProps={{
                  keepMounted: true,
                }}
              >
                {drawer}
              </Drawer>
            </>
          ) : (
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              {user ? (
                <>
                  {menuItems.map((item) => (
                    <MotionButton
                      key={item.text}
                      color="inherit"
                      component={RouterLink}
                      to={item.path}
                      startIcon={item.icon}
                      sx={{
                        color: '#4f46e5',
                        '&:hover': {
                          backgroundColor: 'rgba(79, 70, 229, 0.04)',
                        },
                      }}
                      whileHover={{ scale: 1.02 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.text}
                    </MotionButton>
                  ))}
                  <Tooltip title="Account">
                    <IconButton
                      onClick={handleProfileMenuOpen}
                      size="small"
                      sx={{ 
                        ml: 2,
                        '&:hover': {
                          backgroundColor: 'rgba(79, 70, 229, 0.04)',
                        },
                      }}
                    >
                      <Avatar 
                        sx={{ 
                          width: 32, 
                          height: 32,
                          background: 'linear-gradient(45deg, #4f46e5 30%, #ec4899 90%)',
                          fontWeight: 600,
                        }}
                      >
                        {user.email[0].toUpperCase()}
                      </Avatar>
                    </IconButton>
                  </Tooltip>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={handleProfileMenuClose}
                    onClick={handleProfileMenuClose}
                    PaperProps={{
                      elevation: 0,
                      sx: {
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.1))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                          width: 32,
                          height: 32,
                          ml: -0.5,
                          mr: 1,
                        },
                        '&:before': {
                          content: '""',
                          display: 'block',
                          position: 'absolute',
                          top: 0,
                          right: 14,
                          width: 10,
                          height: 10,
                          bgcolor: 'background.paper',
                          transform: 'translateY(-50%) rotate(45deg)',
                          zIndex: 0,
                        },
                      },
                    }}
                    transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                    anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
                  >
                    <MenuItem onClick={handleLogout}>
                      <ListItemIcon>
                        <LogoutIcon fontSize="small" sx={{ color: '#ef4444' }} />
                      </ListItemIcon>
                      <Typography color="#ef4444">Logout</Typography>
                    </MenuItem>
                  </Menu>
                </>
              ) : (
                menuItems.map((item) => (
                  <MotionButton
                    key={item.text}
                    variant={item.text === 'Home' ? 'text' : 'contained'}
                    component={RouterLink}
                    to={item.path}
                    startIcon={item.icon}
                    sx={{
                      color: item.text === 'Home' ? '#4f46e5' : 'white',
                      background: item.text === 'Home' ? 'transparent' : 'linear-gradient(45deg, #4f46e5 30%, #818cf8 90%)',
                      boxShadow: item.text === 'Home' ? 'none' : '0 4px 12px rgba(79, 70, 229, 0.3)',
                      '&:hover': {
                        background: item.text === 'Home' ? 'rgba(79, 70, 229, 0.04)' : 'linear-gradient(45deg, #4338ca 30%, #6366f1 90%)',
                        boxShadow: item.text === 'Home' ? 'none' : '0 6px 16px rgba(79, 70, 229, 0.4)',
                      },
                    }}
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.2 }}
                  >
                    {item.text}
                  </MotionButton>
                ))
              )}
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Navbar; 