// src/pages/Home/Home.tsx
import React from 'react';
import UniversityInfo from "../../components/pages/Home/UniversityInfo";
import HeroSection from "../../components/pages/Home/HeroSection";
import NewsAndEvents from "../../components/pages/Home/NewsAndEvents";
import UsefulBlock from '../../components/layout/UsefulBlock';
import styles from './Home.module.css';

const Home: React.FC = () => { //  Больше не принимаем пропсы

  return (
    <>
      <div className={styles.main}>
        <div className={styles.Block}>
          <HeroSection />
        </div>
        <div className={styles.Block}>
          <UniversityInfo /> {/*  Больше не передаём isEditMode */}
        </div>
        <div className={styles.Block}>
          <NewsAndEvents />  {/*  Больше не передаём isEditMode */}
        </div>
        <div className={styles.Block}>
          <UsefulBlock />
        </div>
      </div>
    </>
  )
}

export default Home;