// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/src/assets/logo_edt.png';
import Login from './Login';

interface HeaderProps {
  // isLoggedIn: boolean; // Больше не нужно передавать isLoggedIn как пропс
  // onLogin: () => void;
  onLogout: () => void;
  onToggleEditMode?: (isEditMode: boolean) => void; // Добавляем новый пропс
}

const Header: React.FC<HeaderProps> = ({ onLogout, onToggleEditMode }) => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false); // Добавляем состояние для режима редактирования


  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.pageYOffset;
      const isScrollingDown = prevScrollY < currentScrollY && currentScrollY > 0 ;

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
    }

  }, [prevScrollY, isVisible, showLogin]);

  useEffect(() => {
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
    // Достаем режим редактирования
    const storedEditMode = localStorage.getItem('isEditMode');
    if (storedEditMode === 'true') {
        setIsEditMode(true);
        onToggleEditMode && onToggleEditMode(true); // Уведомляем родительский компонент
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true');
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn');
    // Сбрасываем режим редактирования при выходе
    setIsEditMode(false);
    localStorage.removeItem('isEditMode');
    onLogout();
    onToggleEditMode && onToggleEditMode(false); // Уведомляем родителя
  };

    const handleToggleEditMode = () => {
        const newEditMode = !isEditMode;
        setIsEditMode(newEditMode);
        localStorage.setItem('isEditMode', String(newEditMode)); // Сохраняем
        onToggleEditMode && onToggleEditMode(newEditMode); // Важно! Уведомляем родителя
    };


  return (
    <header ref={headerRef} className={`${styles.header} ${!isVisible && styles.hidden}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Логотип" className={styles.logo} />
      </div>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.navLink}>Главная</NavLink>
        <NavLink to="/about" className={styles.navLink}>О нас</NavLink>
        <NavLink to="/contacts" className={styles.navLink}>Контакты</NavLink>
      </nav>
      <div className={styles.userActions}>
        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className={styles.navLink}>Профиль</NavLink>
             {/* Переключатель режима редактирования */}
            {isLoggedIn && (
              <label className={styles.switch}>
                <input
                  type="checkbox"
                  checked={isEditMode}
                  onChange={handleToggleEditMode}
                />
                <span className={styles.slider}></span>
              </label>
            )}
            <button onClick={handleLogout} className={styles.userButton}>Выйти</button>
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