// App.tsx
import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Students from './pages/Students';
import NewsPage from './pages/NewsPage';
import NotFoundPage from './pages/NotFoundPage';

import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RoleSelectionModal from './components/modals/RoleSelectionModal';


import styles from './App.module.css'


const roleKey = 'selectedRole'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Это состояние больше не используется для Header
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


  const handleLogin = () => { //  Это все еще используется, но не передается в Header
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
      setIsLoggedIn(false); // Это состояние все еще используется, но не передается в Header
      setIsEditMode(false);
      localStorage.removeItem('isEditMode');
  };

    const handleToggleEditMode = (newEditMode: boolean) => {
        setIsEditMode(newEditMode);
        localStorage.setItem('isEditMode', String(newEditMode));
    };


  return (
    <>
      <BrowserRouter>
        <div className={styles.appContainer}>
            <Navigation />
            <div className={styles.mainContent}>
                {/* Убираем isLoggedIn */}
                <Header onLogout={handleLogout} onToggleEditMode={handleToggleEditMode} />
                <div className={styles.Container}>
                  <div className={styles.Content}>
                    <Routes>
                        <Route path="/" element={<Home isEditMode={isEditMode} />} />
                        <Route path="/students" element={<Students />} />
                        <Route path="/news/:newsSlug" element={<NewsPage isEditMode={isEditMode} />} />
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
    </>
  )
}

export default App