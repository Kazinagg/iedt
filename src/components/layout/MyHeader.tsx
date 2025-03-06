// src/components/layout/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './MyHeader.module.css';
import logo from '/src/assets/logo_edt.png';
import Login from './Login';
import { useAuth } from '../../context/AuthContext';

interface HeaderProps {
  onLogout: () => void; //  onLogout всё ещё нужен для вызова в App.tsx
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [showLogin, setShowLogin] = useState(false);
  const { isLoggedIn, isAdmin, logout } = useAuth(); //  Используем AuthContext


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const isScrollingDown = prevScrollY < currentScrollY && currentScrollY > 0;

      if (isScrollingDown && isVisible) {
        setIsVisible(false);
      } else if (!isScrollingDown && !isVisible) {
        setIsVisible(true);
      }
      setPrevScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);

    if (showLogin) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
      document.body.style.overflow = 'auto';
    };

  }, [prevScrollY, isVisible, showLogin]);


  const handleLoginSuccess = () => {  // Теперь просто закрывает модалку
    setShowLogin(false);
  };

  const handleLogoutLocal = () => { //  Вызывает logout из AuthContext и локальный
    logout(); //  Вызываем logout из AuthContext
    onLogout(); // И onLogout из пропсов (для App.tsx)
  }


  return (
    <header ref={headerRef} className={`${styles.header} ${!isVisible && styles.hidden}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Логотип" className={styles.logo} />
      </div>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.navLink}>Главная</NavLink>
        <NavLink to="/students" className={styles.navLink}>Студенты</NavLink>
        <NavLink to="/all-news" className={styles.navLink}>Все новости</NavLink>
        {/*  Админ-ссылка показывается только админам  */}
        {isAdmin && (
          <NavLink to="/admin" className={styles.navLink}>
            Админ панель
          </NavLink>
        )}
      </nav>
      <div className={styles.userActions}>
        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className={styles.navLink}>Профиль</NavLink>
            <button onClick={handleLogoutLocal} className={styles.userButton}>Выйти</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)} className={styles.userButton}>Войти</button>
        )}
      </div>

      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      )}
    </header>
  );
};

export default Header;