// src/components/Footer.tsx
import React from 'react';
import styles from './Footer.module.css';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className={styles.footer}>
      <div className={styles.footerContainer}>
        <p className={styles.copyright}>© {currentYear} Институт инженерных и цифровых технологий</p>
        <nav className={styles.footerNav}>
          <a href="/contacts" className={styles.footerLink}>Контакты</a>
          <a href="/privacy" className={styles.footerLink}>Политика конфиденциальности</a>
          {/* Добавьте другие ссылки по мере необходимости */}
        </nav>
        <div className={styles.socialLinks}>
          {/* Добавьте ссылки на социальные сети */}
          <a href="https://vk.com/iedt_bsu/" target="_blank" rel="noopener noreferrer" className={styles.socialLink}>
           VK </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;