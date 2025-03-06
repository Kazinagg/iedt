// src/components/layout/UsefulBlock.tsx
import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getCards } from '../../api/cardsApi';
import { Card as CardType } from '../../types';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid2'; //  Используем Grid2
import Box from '@mui/material/Box';
import styles from './UsefulBlock.module.css';

const UsefulBlock: React.FC = () => {
  const location = useLocation();
  const [cards, setCards] = useState<CardType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCards = async () => {
      setLoading(true);
      setError(null);
      try {
        const fetchedCards = await getCards(location.pathname);
        setCards(fetchedCards);
      } catch (error: any) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchCards();
  }, [location.pathname]);

  if (loading) {
    return <p>Загрузка карточек...</p>;
  }
  if (error) {
    return <p>Ошибка: {error}</p>;
  }

  return (
    <section className={styles.section}>
      <Typography variant="h4" component="h2" align="center" gutterBottom className={styles.title}>
        Полезное
      </Typography>
      <Grid container spacing={5} justifyContent="center" className={styles.cardContainer}>
        {cards.map((card) => (
          <Grid  key={card.title} gridColumn={{ xs: 'span 12', sm: 'span 6', md: 'span 4' }}> {/* Удалили item */}
            <Card className={styles.card}>
              <CardMedia
                component="img"
                height="140"
                image={card.backgroundImage}
                alt={card.title}
                className={styles.cardImage}
              />
              <CardContent className={styles.cardContent}>
                <Typography gutterBottom variant="h5" component="div" className={styles.cardTitle}>
                  {card.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" className={styles.cardText}  dangerouslySetInnerHTML={{ __html: card.content }} />
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </section>
  );
};

export default UsefulBlock;