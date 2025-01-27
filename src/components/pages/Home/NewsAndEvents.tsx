import React from 'react';
import styles from './NewsAndEvents.module.css';

// Определите интерфейс для типа данных новости/события (опционально, но рекомендуется)
interface NewsEvent {
  title: string;
  description?: string; // Описание может быть необязательным
}

// Определите интерфейс для пропсов компонента NewsAndEvents
interface NewsAndEventsProps {
  newsEvents: NewsEvent[]; // Пропс newsEvents - это массив объектов NewsEvent
}

const NewsAndEvents: React.FC<NewsAndEventsProps> = ({ newsEvents }) => { // Принимаем пропсы деструктуризацией
  return (
    <div className={styles.container}>
      <section>
        <h2>Новости и события</h2>
        <ul>
          {newsEvents.map((item, index) => ( // Итерируем по массиву newsEvents
            <li key={index} className={styles.newsItem}> {/* Добавьте key для React и класс для стилизации */}
              <h3>{item.title}</h3> {/* Отображаем заголовок */}
              {item.description && <p>{item.description}</p>} {/* Отображаем описание, если есть */}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NewsAndEvents;