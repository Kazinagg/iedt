// src/NewsPage.tsx (Компонент)
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './NewsPage.module.css';
import { getNewsBySlug } from '../api/newsApi'; // Импортируем getNewsBySlug
import DOMPurify from 'dompurify';
import { NewsItem } from '../types';

const NewsPage: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
    const { newsSlug } = useParams<{ newsSlug: string }>();
    const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                if (newsSlug) {
                    console.log("newsSlug:", newsSlug); // ДОБАВЬ ЭТУ СТРОКУ
                    const fetchedNews = await getNewsBySlug(newsSlug);
                    setNewsItem(fetchedNews);
                }
            } catch (error: any) {
                if (error.message === "Not found") {
                    setError("Новость не найдена.");
                } else {
                    setError(error.message);
                }
            } finally {
                setLoading(false);
            }
        };
    
        fetchNews();
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
                <h1 className={styles.title}>{newsItem.title}</h1>
                <h2 className={styles.headline}>{newsItem.headline}</h2>
                <div className={styles.mainPhotoContainer}>
                    <img src={newsItem.mainPhotoUrl} alt={newsItem.title} className={styles.mainPhoto} />
                </div>
                <p className={styles.date}>Дата публикации: {newsItem.date}</p>
                <div className={styles.content} dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(newsItem.content) }}>

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