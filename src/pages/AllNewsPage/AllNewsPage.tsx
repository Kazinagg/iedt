// src/pages/AllNewsPage/AllNewsPage.tsx
import React, { useState, useEffect } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import { getNews } from '../../api/newsApi';
import { NewsItem } from '../../types';
import AddNewsForm from '../../components/layout/AddNewsForm';
import { useAuth } from '../../context/AuthContext'; // Импортируем useAuth

// Импорты из MUI
import {
    Container,
    Typography,
    List,
    ListItem,
    ListItemText,
    TextField,
    Button,
    ButtonGroup,
    CircularProgress,
    Link,
    Box,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const AllNewsPage: React.FC = () => { //  Не принимаем пропсы
  const [news, setNews] = useState<NewsItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('desc');
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const { isAdmin } = useAuth(); //  Используем AuthContext


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

  const sortedNews = [...news].sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
  });

  const filteredNews = sortedNews.filter((newsItem) =>
    newsItem.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsItem.headline.toLowerCase().includes(searchTerm.toLowerCase()) ||
    newsItem.content.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <Container>
        <Box display="flex" justifyContent="center" mt={4}>
          <CircularProgress />
        </Box>
      </Container>
    );
  }

  if (error) {
    return (
      <Container>
        <Typography color="error">Ошибка: {error}</Typography>
      </Container>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Все новости
      </Typography>

      {/* Поле поиска */}
      <TextField
        label="Поиск"
        variant="outlined"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        fullWidth
        margin="normal"
        InputProps={{
          startAdornment: (
            <SearchIcon color="action" />
          ),
        }}
      />

      {/* Кнопки сортировки */}
      <ButtonGroup variant="outlined" aria-label="outlined button group" sx={{ marginBottom: 2 }}>
        <Button onClick={() => setSortOrder('asc')} color={sortOrder === 'asc' ? 'primary' : 'inherit'}>
          Сначала старые
        </Button>
        <Button onClick={() => setSortOrder('desc')} color={sortOrder === 'desc' ? 'primary' : 'inherit'}>
          Сначала новые
        </Button>
      </ButtonGroup>

      {/* Кнопка добавления новости */}
      {isAdmin && (
        <Button variant="contained" color="primary" onClick={() => setShowAddForm(true)} sx={{ marginBottom: 2 }}>
          Добавить новость
        </Button>
      )}

      {/* Список новостей */}
      <List>
        {filteredNews.map((newsItem) => (
          <ListItem key={newsItem.id} disablePadding>
            <Link component={RouterLink} to={`/news/${newsItem.slug}`} underline="none" color="inherit">
              <ListItemText
                primary={<Typography variant="h6">{newsItem.title}</Typography>}
                secondary={
                  <>
                    <Typography component="span" variant="body2" color="text.secondary">
                      {newsItem.date}
                    </Typography>
                    {' — '}
                    {newsItem.headline}
                  </>
                }
              />
            </Link>
          </ListItem>
        ))}
      </List>
      {showAddForm && <AddNewsForm onClose={() => setShowAddForm(false)} />}
    </Container>
  );
};

export default AllNewsPage;