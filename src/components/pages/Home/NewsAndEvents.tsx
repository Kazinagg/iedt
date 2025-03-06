// src/components/pages/Home/NewsAndEvents.tsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import styles from './NewsAndEvents.module.css';
import { getNews } from '../../../api/newsApi';
import { NewsItem } from '../../../types';
import { useAuth } from '../../../context/AuthContext';
import AddNewsForm from '../../layout/AddNewsForm';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';

const NewsAndEvents: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [showAddForm, setShowAddForm] = useState(false);
    const { isAdmin } = useAuth();
    const [newsPerPage, setNewsPerPage] = useState(3); //  Начинаем с 3
    const [currentPage, setCurrentPage] = useState(1);

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

    const handleShowMore = () => {
        setCurrentPage(currentPage + 1);
    };

    const handleChangeNewsPerPage = (event: SelectChangeEvent) => {
        setNewsPerPage(parseInt(event.target.value, 10));
        setCurrentPage(1);
    };

    const displayedNews = news.slice(0, currentPage * newsPerPage);

    //  Генерируем массив значений, кратных 3 (до, например, 12)
    const perPageOptions = [];
    for (let i = 3; i <= 12; i += 3) {
        perPageOptions.push(i);
    }

    if (loading) {
        return <p>Загрузка новостей...</p>;
    }
    if (error) {
        return <p>Ошибка: {error}</p>;
    }

    return (
        <section className={styles.section}>
            <Typography variant="h4" component="h2" align="center" gutterBottom>
                Новости и события
            </Typography>

            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 2 }}>
                {isAdmin && (
                    <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)}>
                        Добавить новость
                    </Button>
                )}
                <FormControl sx={{ m: 1, minWidth: 120 }} size="small">
                    <Select
                        value={newsPerPage.toString()}
                        onChange={handleChangeNewsPerPage}
                        displayEmpty
                        inputProps={{ 'aria-label': 'Новости на странице' }}
                    >
                        {/*  Используем сгенерированный массив */}
                        {perPageOptions.map((option) => (
                            <MenuItem key={option} value={option.toString()}>
                                {option}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </Box>
            <Grid container spacing={2} justifyContent="center">
                {displayedNews.map((item) => (
                    <Grid item key={item.id} xs={12} sm={6} md={4}>
                        <Card className={styles.card}>
                            <CardMedia
                                component="img"
                                height="140"
                                image={item.mainPhotoUrl}
                                alt={item.title}
                            />
                            <CardContent className={styles.cardContent}>
                                <Typography gutterBottom variant="h5" component="div">
                                    <Link to={`/news/${item.slug}`} className={styles.newsLink}>{item.title}</Link>
                                </Typography>
                                <Typography variant="body2" color="text.secondary" className={styles.newsDescription}>
                                    {item.headline}
                                </Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {news.length > displayedNews.length && (
                <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: 2 }}>
                    <Button variant="outlined" color="primary" onClick={handleShowMore}>
                        Показать ещё
                    </Button>
                </Box>
            )}
            {showAddForm && <AddNewsForm onClose={() => setShowAddForm(false)} />}
        </section>
    );
};

export default NewsAndEvents;