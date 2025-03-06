// src/pages/NewsPage/NewsPage.tsx
import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog'; //  Импортируем Dialog
import DialogContent from '@mui/material/DialogContent'; //  Импортируем DialogContent
import { getNewsBySlug } from '../../api/newsApi';
import { NewsItem } from '../../types';
import { useAuth } from '../../context/AuthContext';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const NewsPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const [newsItem, setNewsItem] = useState<NewsItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { isAdmin } = useAuth();
    const [open, setOpen] = useState(false); //  Состояние для модального окна
  const [selectedImage, setSelectedImage] = useState(''); //  Состояние для выбранного изображения

  useEffect(() => {
    const fetchNews = async () => {
      setLoading(true);
      setError(null);
      try {
        if (slug) {
          const fetchedNews = await getNewsBySlug(slug);
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
  }, [slug]);

    const handleClickOpen = (imageUrl: string) => { //  Функция открытия модального окна
        setSelectedImage(imageUrl);
        setOpen(true);
    };

    const handleClose = () => {  //  Функция закрытия модального окна
        setOpen(false);
    };

  if (loading) {
    return <p>Загрузка новости...</p>;
  }

  if (error) {
    return (
      <Box mt={4} mb={4}>
        <Typography variant="body1" color="error">
          Ошибка: {error}
        </Typography>
      </Box>
    );
  }

  if (!newsItem) {
    return (
      <Box mt={4} mb={4}>
        <Typography variant="body1">Новость не найдена.</Typography>
      </Box>
    );
  }

  return (
    <Container maxWidth="md">
      {isAdmin && (
        <Box sx={{ display: 'flex', justifyContent: 'flex-end', marginTop: 2 }}>
          <Button variant="outlined" color="primary" component={Link} to={`/admin/news/edit/${newsItem.slug}`}>
            Редактировать
          </Button>
        </Box>
      )}
      <Paper elevation={3} sx={{ padding: 3, marginTop: 2 }}>
        <Typography variant="h4" component="h1" gutterBottom>
          {newsItem.title}
        </Typography>
        <Typography variant="h6" component="h2" gutterBottom>
          {newsItem.headline}
        </Typography>
        <Box
          component="img"
          src={newsItem.mainPhotoUrl}
          alt={newsItem.title}
          sx={{ width: '100%', maxHeight: 400, objectFit: 'cover', marginBottom: 2 }}
        />
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Дата публикации: {newsItem.date}
        </Typography>
        <Typography variant="body1" paragraph dangerouslySetInnerHTML={{ __html: newsItem.content }} />

        {newsItem.additionalPhotoUrls && newsItem.additionalPhotoUrls.length > 0 && (
          <Box mt={4}>
            <Typography variant="h6" component="h3" gutterBottom>
              Фотогалерея
            </Typography>
            <Grid container spacing={2}>
              {newsItem.additionalPhotoUrls.map((photoUrl, index) => (
                <Grid  key={index} xs={12} sm={6} md={4}>
                  <Box
                    component="img"
                    src={photoUrl}
                    alt={`Дополнительное фото ${index + 1}`}
                    sx={{ width: '100%', height: 'auto', cursor: 'pointer' }} //  Добавляем cursor: pointer
                    onClick={() => handleClickOpen(photoUrl)}  //  Добавляем обработчик клика
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
      </Paper>

        {/*  Модальное окно */}
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogContent sx={{ padding: 0, position: 'relative' }}>
            <IconButton
              aria-label="close"
              onClick={handleClose}
              sx={{
                position: 'absolute',
                right: 8,
                top: 8,
                color: (theme) => theme.palette.grey[500],
              }}
            >
              <CloseIcon />
            </IconButton>
                <Box
                    component="img"
                    src={selectedImage}
                    alt="Увеличенное фото"
                    sx={{ width: '100%', height: 'auto' }}
                />
            </DialogContent>
        </Dialog>
    </Container>
  );
};

export default NewsPage;