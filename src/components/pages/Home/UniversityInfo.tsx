// src/components/pages/Home/UniversityInfo.tsx
import React from 'react';
import styles from './UniversityInfo.module.css';
import { useAuth } from '../../../context/AuthContext'; // Импортируем useAuth
import CarouselComponent from '../../layout/Carousel';


const UniversityInfo: React.FC = () => {  //  Не принимаем пропсы
  const { isAdmin } = useAuth(); //  Получаем isAdmin из AuthContext

  return (
    <section className={styles.container}>
      <div className={styles.textBlock}>
        <h2>О нашем университете</h2>
        <p>
            Началом истории института инженерных и цифровых технологий считается 2002 год, когда в Белгородском государственном университете был создан факультет компьютерных наук и телекоммуникаций (КНиТ). Факультет возглавил доктор технических наук, профессор Жиляков Евгений Георгиевич. Первыми кафедрами на факультете стали кафедра математических методов и информационных технологий в экономике и управлении и кафедра информатики и программирования..
        </p>
        {/* Добавьте больше текста или другой контент */}
      </div>
      <div className={styles.carouselBlock}>
        <CarouselComponent isEditMode={isAdmin} /> {/*  Передаём isAdmin как isEditMode */}
      </div>
    </section>
  );
};

export default UniversityInfo;