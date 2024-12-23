// src/components/Header.tsx
import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Header.module.css';
import logo from '/src/assets/logo_edt.jpg';


interface HeaderProps {
  isLoggedIn: boolean;
  onLogin: () => void;
  onLogout: () => void;
}

const Header: React.FC<HeaderProps> = ({ isLoggedIn, onLogin, onLogout }) => {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img src={logo} alt="Логотип" className={styles.logo} />
      </div>
      <nav className={styles.navigation}>
        <NavLink to="/" className={styles.navLink}>Главная</NavLink>
        <NavLink to="/about" className={styles.navLink}>О нас</NavLink>
        <NavLink to="/contacts" className={styles.navLink}>Контакты</NavLink>
        {/* Добавьте другие ссылки по мере необходимости */}
      </nav>
      <div className={styles.userActions}>
        {isLoggedIn ? (
          <>
            <NavLink to="/profile" className={styles.navLink}>Профиль</NavLink>
            <button onClick={onLogout} className={styles.userButton}>Выйти</button>
          </>
        ) : (
          <button onClick={onLogin} className={styles.userButton}>Войти</button>
        )}
      </div>
    </header>
  );
};

export default Header;