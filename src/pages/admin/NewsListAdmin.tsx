// src/pages/admin/NewsListAdmin.tsx

import React, { useState, useEffect } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Typography,
  Box
} from '@mui/material';
import { getNews, deleteNews } from '../../api/newsApi';
import { NewsItem } from '../../types';
import { Link as RouterLink } from 'react-router-dom';

const NewsListAdmin: React.FC = () => {
    const [news, setNews] = useState<NewsItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchNews = async () => {
            setLoading(true);
            try {
                const data = await getNews();
                setNews(data);
            } catch (err: any) {
                setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        fetchNews();
    }, []);

    const handleDelete = async (id: number) => {
      try {
        await deleteNews(id);  // Вызываем API для удаления
        // Обновляем список новостей после удаления
        setNews(prevNews => prevNews.filter(item => item.id !== id));
      } catch (error: any) {
        setError(error.message);  // Обрабатываем ошибки
      }
    }

    if (loading) {
        return <Box sx={{display: 'flex', justifyContent: 'center'}}><Typography>Загрузка...</Typography></Box>;
    }
    if (error) {
         return <Box sx={{display: 'flex', justifyContent: 'center'}}><Typography color="error">Ошибка: {error}</Typography></Box>;
    }


    return (
        <Box>
            <Typography variant="h4" gutterBottom>
                News Management
            </Typography>
            <Button component={RouterLink} to="/admin/news/create" variant="contained" color="primary" sx={{marginBottom: 2}}>
              Create News
            </Button>
            <TableContainer component={Paper}>
                <Table sx={{ minWidth: 650 }} aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Title</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {news.map((item) => (
                            <TableRow key={item.id} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                                <TableCell component="th" scope="row">
                                    {item.id}
                                </TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>{item.date}</TableCell>
                                <TableCell>
                                    <Button component={RouterLink} to={`/admin/news/edit/${item.id}`} variant="outlined" color="primary" sx={{marginRight: 1}}>
                                        Edit
                                    </Button>
                                    <Button variant="outlined" color="error" onClick={()=> handleDelete(item.id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </Box>
    );
};

export default NewsListAdmin;