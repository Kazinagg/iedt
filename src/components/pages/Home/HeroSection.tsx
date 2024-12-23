// src/components/HeroSection.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import styles from './HeroSection.module.css';
import heroImage from '/src/assets/00566896_1.jpg';

const HeroSection: React.FC = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.heroContent}>
        <h1>Добро пожаловать в Институт инженерных и цифровых технологий!</h1>
        <p>Лучшее место для получения качественного образования.</p>
        <Link to="/about" className={styles.heroButton}>Узнать больше</Link>
      </div>
      <img src={heroImage} alt="Hero" className={styles.heroImage} />
    </section>
  );
};

export default HeroSection;