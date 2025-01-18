// import React from 'react'
import UniversityInfo from "../components/pages/Home/UniversityInfo";
import HeroSection from "../components/pages/Home/HeroSection";
import NewsAndEvents from "../components/pages/Home/NewsAndEvents";
import UsefulBlock from '../components/layout/UsefulBlock';

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

  return (
    <>
    {/* <div>Home</div> */}
      <HeroSection />
      <UniversityInfo />
      <NewsAndEvents />
      <UsefulBlock cards={cards} />
      <UsefulBlock cards={cards} />
      <UsefulBlock cards={cards} />
      <UsefulBlock cards={cards} />
      <UsefulBlock cards={cards} />
      <UsefulBlock cards={cards} />
      <UsefulBlock cards={cards} />
    </>
  )
}
