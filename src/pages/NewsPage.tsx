import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewsPage.module.css'; // Создайте NewsPage.module.css при необходимости

interface NewsItem {
  id: number;
  slug: string;
  title: string;
  headline: string;        // Заголовок
  mainPhotoUrl: string;    // URL главного фото
  content: string;         // Текст новости
  additionalPhotoUrls: string[]; // Массив URL остальных фото
  date: string;           // Дата публикации
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
        // const response = await fetch(`/api/news/${slug}`); // Замените на ваш API endpoint - для реального запроса по slug
        const response = await fetch('/api/news/list.json'); // Тестовый Запрос к JSON файлу - пока используем list.json для примера
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
        <h1 className={styles.title}>{newsItem.title}</h1> {/* Название */}
        <h2 className={styles.headline}>{newsItem.headline}</h2> {/* Заголовок */}

        <div className={styles.mainPhotoContainer}>
          <img src={newsItem.mainPhotoUrl} alt={newsItem.title} className={styles.mainPhoto} /> {/* Главное фото */}
        </div>

        <p className={styles.date}>Дата публикации: {newsItem.date}</p>

        <div className={styles.content} dangerouslySetInnerHTML={{ __html: newsItem.content }}>
          {/* Текст новости с поддержкой стилей */}
        </div>

        {newsItem.additionalPhotoUrls && newsItem.additionalPhotoUrls.length > 0 && (
          <div className={styles.additionalPhotosContainer}>
            <h3>Фотогалерея</h3>
            <div className={styles.additionalPhotosGallery}>
              {newsItem.additionalPhotoUrls.map((photoUrl, index) => (
                <img key={index} src={photoUrl} alt={`Дополнительное фото ${index + 1}`} className={styles.additionalPhoto} />
              ))}
            </div>
          </div>
        )}
      </article>
    </div>
  );
};

export default NewsPage;