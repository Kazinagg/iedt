// src/pages/admin/NewsEditForm.tsx
import React, { useState, useEffect, useCallback } from 'react'; // Добавили useCallback
import { useParams, useNavigate } from 'react-router-dom';
import {
    TextField,
    Button,
    Box,
    Typography,
    CircularProgress,
} from '@mui/material';
import { getNewsBySlug, createNews, updateNews } from '../../api/newsApi';
import { NewsItem } from '../../types';

// Импорты для TipTap
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder';

const NewsEditForm: React.FC = () => {
    const { newsId } = useParams<{ newsId?: string }>();
    const navigate = useNavigate();
    const [newsItem, setNewsItem] = useState<NewsItem>({} as NewsItem);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isNew, setIsNew] = useState(true);

    //  Создаем редактор
    const editor = useEditor({
      extensions: [
        StarterKit,
        Link.configure({
          openOnClick: false,
          HTMLAttributes: {
            target: '_blank',
            rel: 'noopener noreferrer',
          },
        }),
        Image,
        Placeholder.configure({
          placeholder: 'Введите текст новости...',
        }),
      ],
      content: '', // Начальное значение
    });


    useEffect(() => {
        const fetchData = async () => {
            if (newsId) {
                setIsNew(false);
                setLoading(true);
                try {
                    const data = await getNewsBySlug(newsId);
                    setNewsItem(data);

                    //  Устанавливаем контент в редактор, если это редактирование
                    if (editor && data.content) {
                         editor.commands.setContent(data.content);
                    }
                } catch (err: any) {
                    setError(err.message);
                } finally {
                    setLoading(false);
                }
            } else {
                setIsNew(true);
                setLoading(false);
                 // Если это создание, очищаем контент редактора
                if (editor) {
                    editor.commands.clearContent();
                }

            }
        };
        fetchData();
    }, [newsId, editor]);

    //  Очищаем редактор при размонтировании
    useEffect(() => {
        return () => {
            if (editor) {
                editor.destroy();
            }
        };
    }, [editor]);


    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setNewsItem({
            ...newsItem,
            [event.target.name]: event.target.value,
        });
    };

    const handleSubmit = useCallback(async (event: React.FormEvent) => {
        event.preventDefault();
        setLoading(true);

        if (!editor) {
          setError("Редактор не инициализирован");
          setLoading(false);
          return;
        }

        try {
          const htmlContent = editor.getHTML(); // Получаем HTML из TipTap
          const updatedNewsItem = { ...newsItem, content: htmlContent }; // Обновляем content
          let savedNewsItem:NewsItem;

            if (isNew) {
                savedNewsItem = await createNews(updatedNewsItem);
            } else {
              savedNewsItem = await updateNews(updatedNewsItem);
            }

            navigate('/admin/news');
        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }, [editor, isNew, navigate, newsItem]);


    if (loading) {
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}><CircularProgress /></Box>;
    }

    if (error) {
        return <Box sx={{ display: 'flex', justifyContent: 'center' }}><Typography color="error">Ошибка: {error}</Typography></Box>;
    }

     if (!editor) {
        return null; // Или сообщение об ошибке
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <Typography variant="h4" gutterBottom>{isNew ? "Create News" : "Edit News"}</Typography>

            <TextField
                label="Title"
                name="title"
                value={newsItem.title}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Headline"
                name="headline"
                value={newsItem.headline}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Slug"
                name="slug"
                value={newsItem.slug}
                onChange={handleChange}
                fullWidth
                margin="normal"
                required
            />
            <TextField
                label="Main Photo URL"
                name="mainPhotoUrl"
                value={newsItem.mainPhotoUrl}
                onChange={handleChange}
                fullWidth
                margin="normal"
            />

            {/* Текстовый редактор TipTap */}
            <Box sx={{ marginBottom: 2 }}>
                <EditorContent editor={editor} />
            </Box>

            <Button type="submit" variant="contained" color="primary" disabled={loading}>
                {isNew ? "Create" : "Save"}
            </Button>
        </Box>
    );
};

export default NewsEditForm;