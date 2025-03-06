// src/components/layout/Sidebar.tsx
import React from 'react';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton'; //  Добавили ListItemButton
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import HomeIcon from '@mui/icons-material/Home'; //  Иконки
import SchoolIcon from '@mui/icons-material/School';
import ArticleIcon from '@mui/icons-material/Article';
import { Link as RouterLink } from 'react-router-dom'; //  Используем RouterLink

const drawerWidth = 240; //  Ширина сайдбара

const Sidebar: React.FC = () => {
  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': { //  Стили для "бумаги" Drawer
          width: drawerWidth,
          boxSizing: 'border-box',
        },
      }}
      variant="permanent" //  Постоянный сайдбар
      anchor="left"      //  Слева
    >
      <Divider />
      <List>
        <ListItem key="home" disablePadding>
             <ListItemButton component={RouterLink} to="/">
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Главная" />
          </ListItemButton>
        </ListItem>
        <ListItem key="students" disablePadding>
           <ListItemButton component={RouterLink} to="/students">
            <ListItemIcon>
              <SchoolIcon />
            </ListItemIcon>
            <ListItemText primary="Студенты" />
          </ListItemButton>
        </ListItem>
        <ListItem key="all-news" disablePadding>
           <ListItemButton component={RouterLink} to="/all-news">
            <ListItemIcon>
              <ArticleIcon />
            </ListItemIcon>
            <ListItemText primary="Все новости" />
           </ListItemButton>
        </ListItem>
      </List>
      <Divider />
    </Drawer>
  );
};

export default Sidebar;