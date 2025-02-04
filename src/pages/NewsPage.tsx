import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewsPage.module.css'; // Создайте NewsPage.module.css при необходимости

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  content: string;
  date: string; // или Date, если работаете с датами
  // ... другие поля новости
}

const NewsPage: React.FC = () => {
  const { newsSlug } = useParams<{ newsSlug: string }>(); // Получаем slug из URL параметров
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);

    // Функция для получения данных новости с сервера по slug
    const fetchNewsBySlug = async (slug: string) => {
      try {
        const response = await fetch(`/api/news/${slug}`); // Замените на ваш API endpoint
        if (!response.ok) {
          if (response.status === 404) {
            setError('Новость не найдена.');
          } else {
            throw new Error(`Ошибка при загрузке новости: ${response.status}`);
          }
          return;
        }
        const data: NewsItem = await response.json();
        setNewsItem(data);
      } catch (error: any) {
        setError(`Произошла ошибка: ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    if (newsSlug) {
      fetchNewsBySlug(newsSlug);
    }
  }, [newsSlug]);

  if (loading) {
    return <p>Загрузка новости...</p>;
  }

  if (error) {
    return <p className={styles.error}>Ошибка: {error}</p>;
  }

  if (!newsItem) {
    return <p>Новость не найдена.</p>; // Дополнительная проверка на null
  }

  return (
    <div className={styles.container}>
      <article>
        <h1>{newsItem.title}</h1>
        <p className={styles.date}>Дата публикации: {newsItem.date}</p> {/* Форматируйте дату как нужно */}
        <div className={styles.content} dangerouslySetInnerHTML={{ __html: newsItem.content }}>
          {/* Используйте dangerouslySetInnerHTML для HTML контента (если контент приходит в HTML формате) */}
        </div>
      </article>
    </div>
  );
};

export default NewsPage;