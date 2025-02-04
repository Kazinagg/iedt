import React from 'react';
import styles from './NewsAndEvents.module.css';
import { Link } from 'react-router-dom'; // Импортируем Link

interface NewsEvent {
  id: number;
  slug: string;
  title: string;
  description?: string;
}

interface NewsAndEventsProps {
  newsEvents: NewsEvent[];
}

const NewsAndEvents: React.FC<NewsAndEventsProps> = ({ newsEvents }) => {
  return (
    <div className={styles.container}>
      <section>
        <h2>Новости и события</h2>
        <ul>
          {newsEvents.map((item) => (
            <li key={item.id} className={styles.newsItem}>
              <Link to={`/news/${item.slug}`} className={styles.newsLink}> {/* Используем Link и путь к новости */}
                <h3>{item.title}</h3>
              </Link>
              {item.description && <p>{item.description}</p>}
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
};

export default NewsAndEvents;