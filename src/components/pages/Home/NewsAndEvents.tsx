// src/components/pages/Home/NewsAndEvents.tsx
import React, { useState, useEffect } from 'react';
import styles from './NewsAndEvents.module.css';
import { Link } from 'react-router-dom';
import { getNews } from '../../../api/newsApi'; //  Путь к newsApi
import { NewsItem } from '../../../types';
import AddNewsForm from '../../layout/AddNewsForm'; // ИСПРАВЛЕННЫЙ ИМПОРТ


interface NewsAndEventsProps {
    isEditMode: boolean;
}

const NewsAndEvents: React.FC<NewsAndEventsProps> = ({ isEditMode }) => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);


    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedNews = await getNews();
                setNews(fetchedNews);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchNews();
    }, []);

      if (loading) {
        return <p>Загрузка новостей...</p>;
      }

      if (error) {
        return <p>Ошибка: {error}</p>;
      }

    return (
        <div className={styles.container}>
            <section>
                <h2>Новости и события</h2>
                {isEditMode && (
                    <button onClick={() => setShowAddForm(true)} className={styles.addButton}>
                        Добавить новость
                    </button>
                )}
                <ul>
                    {news.map((item) => (
                        <li key={item.id} className={styles.newsItem}>
                            <Link to={`/news/${item.slug}`} className={styles.newsLink}>
                                <h3>{item.title}</h3>
                            </Link>
                            <p>{item.date}</p>
                            {item.headline && <p>{item.headline}</p>}
                        </li>
                    ))}
                </ul>
            </section>
            {showAddForm && <AddNewsForm onClose={() => setShowAddForm(false)} />}
        </div>
    );
};

export default NewsAndEvents;