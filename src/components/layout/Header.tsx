// src/components/Header.tsx
import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/src/assets/logo_edt.jpg';
import Login from './Login'; // Импортируем компонент входа


interface HeaderProps {
  isLoggedIn: boolean;
  // onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ onLogout }) => {
  const [prevScrollY, setPrevScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const headerRef = useRef<HTMLDivElement>(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [showLogin, setShowLogin] = useState(false);



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
      document.body.style.overflow = 'auto'; // Разрешаем скролл, когда окно входа закрыто
    }

    return () => {
        window.removeEventListener('scroll', handleScroll);
        document.body.style.overflow = 'auto';
    }

  }, [prevScrollY, isVisible, showLogin]);

  useEffect(() => {
    // Проверяем localStorage при монтировании компонента
    const storedLoggedIn = localStorage.getItem('isLoggedIn');
    if (storedLoggedIn === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    localStorage.setItem('isLoggedIn', 'true'); // Сохраняем состояние входа
    setShowLogin(false);
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('isLoggedIn'); // Удаляем состояние входа
    onLogout(); // Вызываем обработчик выхода, переданный в props
  };

  // const handleLoginClick = () => {
  //   setShowLogin(true); // Показываем компонент входа
  // };

  // const handleLoginClose = () => {
  //   setShowLogin(false); // Скрываем компонент входа
  // };


  return (
    <header ref={headerRef} className={`${styles.header} ${!isVisible && styles.hidden}`}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Логотип" className={styles.logo} />
      </div>
      <nav className={styles.navigation}>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.navLink}>Главная</NavLink>
        <NavLink to="/about" className={styles.navLink}>О нас</NavLink>
        <NavLink to="/contacts" className={styles.navLink}>Контакты</NavLink>
        {/* Добавьте другие ссылки по мере необходимости */}
      </nav>
      </nav>
      <div className={styles.userActions}>
        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className={styles.navLink}>Профиль</NavLink>
            <button onClick={handleLogout} className={styles.userButton}>Выйти</button>
          </>
        ) : (
          <button onClick={() => setShowLogin(true)} className={styles.userButton}>Войти</button>
        )}
      </div>

      {/* Условный рендеринг компонента Login */}
      {showLogin && (
        <Login onClose={() => setShowLogin(false)} onLoginSuccess={handleLoginSuccess} />
      )}

    </header>
  );
};

export default Header;