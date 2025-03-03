import React, { useState, useEffect } from 'react';
import styles from './UsefulBlock.module.css';
import { useLocation } from 'react-router-dom'; // Импортируем
import { getCards } from '../../api/cardsApi';  // Импортируем
import { Card } from '../../types'; 

const UsefulBlock: React.FC = () => {
    const location = useLocation(); // Получаем текущий путь
    const [cards, setCards] = useState<Card[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchCards = async () => {
            setLoading(true);
            setError(null);
            try {
                const fetchedCards = await getCards(location.pathname); // Передаем текущий путь
                setCards(fetchedCards);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchCards();
    }, [location.pathname]); // Добавляем location.pathname в зависимости useEffect

    if (loading) {
        return <p>Загрузка карточек...</p>;
    }
    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        // ... (разметка, как и раньше) ...
        <section className={styles.section}>
            <h2 className={styles.title}>Полезное</h2>
            <div className={styles.cardContainer}>
                {cards.map((card, index) => (
                    <article
                        key={index}
                        className={styles.card}
                        style={{ backgroundImage: `url(${card.backgroundImage})` }}
                    >
                        <div className={styles.cardTop}>
                            <h3 className={styles.cardTitle}>{card.title}</h3>
                        </div>
                        <div className={styles.cardContent}>
                            {/*  Тут надо как-то преобразовывать строку в реакт элемент  */}
                            <div dangerouslySetInnerHTML={{ __html: card.content }}></div>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    );
};

export default UsefulBlock;