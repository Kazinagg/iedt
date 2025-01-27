// import React from 'react'
import UniversityInfo from "../components/pages/Home/UniversityInfo";
import HeroSection from "../components/pages/Home/HeroSection";
import NewsAndEvents from "../components/pages/Home/NewsAndEvents";
import UsefulBlock from '../components/layout/UsefulBlock';
import styles from './Home.module.css';

export default function Home() {

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
    
    // ... другие карточки
  ];

  const newsEventsData = [
    {
      title: 'Новость 1: Открытие новой лаборатории',
      description: 'В университете открылась новая современная лаборатория для исследований в области...',
    },
    {
      title: 'Событие 1: День открытых дверей',
      description: 'Приглашаем всех желающих на День открытых дверей, который состоится...',
    },
    {
      title: 'Новость 2: Успехи наших студентов на конференции',
      description: 'Студенты нашего университета успешно выступили на международной научной конференции...',
    },
    {
      title: 'Событие 2: Мастер-класс от ведущего эксперта',
      description: 'Приглашаем на мастер-класс от известного эксперта в области...',
    },
    // ... добавьте больше новостей и событий
  ];

  return (
    <>
      <div className={styles.main}>
        <HeroSection />
        <UniversityInfo />
        <NewsAndEvents newsEvents={newsEventsData} />
        <UsefulBlock cards={cards} />
        <UsefulBlock cards={cards} />
        <UsefulBlock cards={cards} />
        <UsefulBlock cards={cards} />
        <UsefulBlock cards={cards} />
        <UsefulBlock cards={cards} />
        <UsefulBlock cards={cards} />
      </div>
      
    </>
  )
}
