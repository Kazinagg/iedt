import { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import Students from './pages/Students';
import NewsPage from './pages/NewsPage';

import Navigation from './components/layout/Navigation';
import Header from './components/layout/Header';
import Footer from './components/layout/Footer';
import RoleSelectionModal from './components/modals/RoleSelectionModal';

import styles from './App.module.css'


const roleKey = 'selectedRole'

function App() {

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  // const [selectedRole, setSelectedRole] = useState<string | null>(null); 
  const [showModal, setShowModal] = useState(true);



  useEffect(() => {
    const storedRole = localStorage.getItem(roleKey);
    if (storedRole) {
      // setSelectedRole(storedRole);
      setShowModal(false); // Если роль выбрана, модальное окно не показываем
      // navigate(storedRole)
    }
  }, []);


  const handleRoleSelect = (role: string) => {
    // setSelectedRole(role);
    localStorage.setItem(roleKey, role); // Сохраняем роль в localStorage
    setShowModal(false);
    // navigate(role);
  };


  const handleLogin = () => {
    setIsLoggedIn(true);
    // Здесь вы можете реализовать логику входа
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    // Здесь вы можете реализовать логику выхода
  };




  return (
    <>
      <BrowserRouter>
        <div className={styles.appContainer}>
            <Navigation />
            <div className={styles.mainContent}>
                <Header isLoggedIn={isLoggedIn} onLogout={handleLogout} />
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/students" element={<Students />} />
                  <Route path="/news/:newsSlug" element={<NewsPage />} /> {/* Маршрут для страницы новости */}
                </Routes> 
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
