// src/App.tsx
import React from 'react';
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles'; // Импортируем ThemeProvider
import theme from './theme'; // Импортируем тему
import Home from './pages/Home/Home';
import Students from './pages/Students/Students';
import NewsPage from './pages/NewsPage/NewsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AllNewsPage from './pages/AllNewsPage/AllNewsPage'; //  Импортируем

import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RoleSelectionModal from './components/modals/RoleSelectionModal';

import styles from './App.module.css';

const roleKey = 'selectedRole';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showModal, setShowModal] = useState(true);
  const [isEditMode, setIsEditMode] = useState(false);

  useEffect(() => {
    const storedRole = localStorage.getItem(roleKey);
    if (storedRole) {
      setShowModal(false);
    }
    const storedEditMode = localStorage.getItem('isEditMode');
    if (storedEditMode === 'true') {
      setIsEditMode(true);
    }
  }, []);

  const handleRoleSelect = (role: string) => {
    localStorage.setItem(roleKey, role);
    setShowModal(false);
  };

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      setIsEditMode(false);
      localStorage.removeItem('isEditMode');
  };
  const handleToggleEditMode = (newEditMode: boolean) => {
      setIsEditMode(newEditMode);
      localStorage.setItem('isEditMode', String(newEditMode));
  };

  return (
    <ThemeProvider theme={theme}> {/* Оборачиваем в ThemeProvider */}
      <BrowserRouter>
        <div className={styles.appContainer}>
          <Navigation />
          <div className={styles.mainContent}>
            <Header onLogout={handleLogout} onToggleEditMode={handleToggleEditMode} />
            <div className={styles.Container}>
              <div className={styles.Content}>
                <Routes>
                  <Route path="/" element={<Home isEditMode={isEditMode} />} />
                  <Route path="/students" element={<Students isEditMode={isEditMode} />} />
                  <Route path="/news/:newsSlug" element={<NewsPage isEditMode={isEditMode} />} />
                  <Route path="/all-news" element={<AllNewsPage isEditMode={isEditMode} />} />
                  <Route path="*" element={<NotFoundPage />} />
                </Routes>
              </div>
            </div>
            <Footer />
          </div>
        </div>
        {showModal && (
          <RoleSelectionModal onSelect={handleRoleSelect} />
        )}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;