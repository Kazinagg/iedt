// src/pages/admin/AdminDashboard.tsx
import React, { useState } from 'react';
import {
  AppBar,
  Box,
  CssBaseline,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home'; //  Иконки
import ArticleIcon from '@mui/icons-material/Article';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import { Link as RouterLink, Outlet } from 'react-router-dom'; //  Используем RouterLink
import { useAuth } from '../../context/AuthContext'; //  Получаем данные об аутентификации

const drawerWidth = 240;

interface AdminDashboardProps {
  window?: () => Window;
}

function AdminDashboard(props: AdminDashboardProps) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);
  const { logout } = useAuth(); // Получаем функцию выхода из системы

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = async () => {
      try {
        await logout();
      } catch (error) {
        console.error("Failed to log out", error);
      }

  }

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          Admin Panel
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        <ListItem key="Dashboard" disablePadding>
          <ListItemButton component={RouterLink} to="/admin">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </ListItem>
        <ListItem key="News" disablePadding>
          <ListItemButton component={RouterLink} to="/admin/news">
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="News" />
          </ListItemButton>
        </ListItem>
        <ListItem key="Carousel" disablePadding>
          <ListItemButton component={RouterLink} to="/admin/carousel">
            <ListItemIcon>
              <PhotoLibraryIcon />
            </ListItemIcon>
            <ListItemText primary="Carousel" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
        <ListItem key="logout" disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemText primary="Log Out" />
          </ListItemButton>
        </ListItem>
    </div>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' } }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Admin Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: 'none', sm: 'block' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{ flexGrow: 1, p: 3, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
      >
        <Toolbar /> {/*  Отступ от AppBar */}
        <Outlet/> {/*  Здесь будут отображаться дочерние роуты */}
      </Box>
    </Box>
  );
}

export default AdminDashboard;