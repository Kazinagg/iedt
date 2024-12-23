import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import styles from './Navigation.module.css'; // CSS Modules

// Импорт иконок
import pageStudent from '/src/assets/page-student.svg';
import pageStudentActive from '/src/assets/page-student-active.svg';
import pageEmployee from '/src/assets/page-employee.svg';
import pageEmployeeActive from '/src/assets/page-employee-active.svg';

interface NavItemHomeP {
  to: string;
  text: string;
  icon: string;
  iconActive: string;
}

// const navItems: NavItemHomeP[] = [
//   { to: '/', text: 'Основная' },
//   { to: '/employees', text: 'Сотрудникам' },
//   { to: '/admission', text: 'Поступающим' },
//   { to: '/alumni', text: 'Выпускникам' },
//   { to: '/students', text: 'Студентам' },
//   { to: '/partners', text: 'Партнёрам' },
// ];

const navItems: NavItemHomeP[] = [
  { to: '/', text: 'Основная', icon: pageStudent, iconActive: pageStudentActive },
  { to: '/employees', text: 'Сотрудникам', icon: pageEmployee, iconActive: pageEmployeeActive },
  { to: '/students', text: 'Студентам', icon: pageEmployee, iconActive: pageEmployeeActive },
  // ... остальные элементы навигации
];

const Navigation: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className={styles.sidebar}>
      <div className={styles.map}>
        <button className={styles.burger} onClick={toggleMenu} title="Меню">
          <span className={styles.burgerIcon} />
        </button>

        <ul className={isOpen ? styles.navListOpen : styles.navList}>
          <li className={styles.navItem}>
              sxdsd
          </li>
          <li className={styles.navItem}>
              sxdsd
          </li>
          <li className={styles.navItem}>
              sxdsd
          </li>
        </ul>
      </div>
      

      <div className={styles.HomeP}>
        <div className={styles.languageSwitch}>
          <button className={styles.langButton}>RU</button>
          <button className={styles.langButton}>EN</button>
        </div>


        <ul className={styles.navListHomeP}>
          {navItems.map((item) => (
            <li key={item.to} className={styles.navItem}>
              <NavLink
                to={item.to}
                className={({ isActive }: { isActive: boolean }) =>
                  isActive ? styles.navLinkActive : styles.navLink
                }
              >
                <img
                  src={item.iconActive}
                  alt={item.text}
                  className={styles.navIcon}
                />
                {item.text}
              </NavLink>
            </li>
          ))}
        </ul>

        
      </div>
      
    </nav>
  );
};

export default Navigation;