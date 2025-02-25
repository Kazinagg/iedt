// src/pages/Home/Home.tsx
import React from 'react';  // Убираем лишний комментарий
import UniversityInfo from "../components/pages/Home/UniversityInfo";
import HeroSection from "../components/pages/Home/HeroSection";
import NewsAndEvents from "../components/pages/Home/NewsAndEvents";
import UsefulBlock from '../components/layout/UsefulBlock';
import styles from './Home.module.css';

interface HomeProps { // Добавляем интерфейс для пропсов
    isEditMode: boolean;
}

const Home: React.FC<HomeProps> = ({ isEditMode }) => { // Принимаем isEditMode

  const cards = [
    {
      title: 'Мобильное приложение',
      backgroundImage: 'https://api.www.bmstu.ru/upload/universal/137/65d5da5618163.png',
      content: (
        <>
            {/* Контент карточки  */}
            <p>Расписание занятий</p>
            <p>Имена преподавателей</p>

           <div>
                <button>Google Play</button>
                <button>App Store</button>

           </div>
        </>
      ),
    },
    {
      title: 'Мобильное приложение',
      backgroundImage: 'https://api.www.bmstu.ru/upload/universal/137/65d5da5618163.png',
      content: (
        <>
            {/* Контент карточки  */}
            <p>Расписание занятий</p>
            <p>Имена преподавателей</p>

           <div>
                <button>Google Play</button>
                <button>App Store</button>

           </div>
        </>
      ),
    },
    {
      title: 'Мобильное приложение',
      backgroundImage: 'https://api.www.bmstu.ru/upload/universal/137/65d5da5618163.png',
      content: (
        <>
            {/* Контент карточки  */}
            <p>Расписание занятий</p>
            <p>Имена преподавателей</p>

           <div>
                <button>Google Play</button>
                <button>App Store</button>

           </div>
        </>
      ),
    },

    // ... другие карточки
  ];

  // Убираем newsEventsData, теперь данные будут получаться через API

  return (
    <>
      <div className={styles.main}>
        <div className={styles.Block}>
          <HeroSection />
        </div>
        <div className={styles.Block}>
          <UniversityInfo />
        </div>
        <div className={styles.Block}>
          <NewsAndEvents isEditMode={isEditMode} /> {/* Передаем isEditMode */}
        </div>
        <div className={styles.Block}>
          <UsefulBlock cards={cards} />
        </div>
      </div>

    </>
  )
}

export default Home;