// src/components/AddNewsForm.tsx
import React, { useState, useCallback } from 'react';
import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Link from '@tiptap/extension-link';
import Image from '@tiptap/extension-image';
import Placeholder from '@tiptap/extension-placeholder'; // Импортируем Placeholder
import { createNews } from '../../api/newsApi';
import { NewsItem } from '../../types';

interface AddNewsFormProps {
    onClose: () => void;
}

const AddNewsForm: React.FC<AddNewsFormProps> = ({ onClose }) => {
    const [title, setTitle] = useState('');
    const [headline, setHeadline] = useState('');
    const [mainPhotoUrl, setMainPhotoUrl] = useState('');
    const [additionalPhotoUrls, setAdditionalPhotoUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);


    const editor = useEditor({
        extensions: [
            StarterKit,
            Link.configure({ // Конфигурируем Link
              openOnClick: false, //Открывать по двойному клику
              HTMLAttributes: {
                    target: '_blank', // Открывать в новой вкладке
                    rel: 'noopener noreferrer',
                },
            }),
            Image, // Добавляем Image
            Placeholder.configure({ // Добавляем и конфигурируем Placeholder
                placeholder: 'Введите текст новости...',
            }),
        ],
        content: '', // Начальное содержимое (пусто)
        autofocus: true, // Автофокус при открытии
    });
  const addImage = useCallback(() => {
    const url = prompt('URL изображения'); //TODO: Сделать загрузку

    if (url) {
      editor?.chain().focus().setImage({ src: url }).run(); //Добавляем в редактор
      setMainPhotoUrl(url); // Устанавливаем как главное фото
    }
  }, [editor]);


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);
        setSuccess(false);

         if (!editor) {
            setError('Редактор не инициализирован.');
            setLoading(false);
            return;
        }

        const newSlug = title.toLowerCase().replace(/ /g, '-');
        const htmlContent = editor.getHTML(); // Получаем HTML-контент из TipTap


        const newNewsItem: Omit<NewsItem, 'id' | 'date'> = {
            slug: newSlug,
            title: title,
            headline,
            mainPhotoUrl, // Используем mainPhotoUrl
            content: htmlContent,
            additionalPhotoUrls,  //TODO: пока оставим как есть
        };

        try {
            const createdNewsItem = await createNews(newNewsItem);
            console.log('News item created:', createdNewsItem);
            setSuccess(true);

            setTitle('');
            setHeadline('');
            setMainPhotoUrl('');
            setAdditionalPhotoUrls([]);
            editor.commands.clearContent();  // Очищаем содержимое редактора

            setTimeout(() => {
                onClose();
            }, 2000);

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    };

    if (!editor) {
        return null; // Или сообщение об ошибке
    }

    return (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1000 }}>
            <form onSubmit={handleSubmit} style={{ backgroundColor: 'white', padding: '20px', borderRadius: '5px', width: '80%', maxWidth: '600px' }}>
                <button type="button" onClick={onClose} style={{ position: 'absolute', top: '10px', right: '10px' }}>X</button>
                <div>
                    <label htmlFor="title">Заголовок:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="headline">Headline:</label>
                    <input
                        type="text"
                        id="headline"
                        value={headline}
                        onChange={(e) => setHeadline(e.target.value)}
                        required
                    />
                </div>
                {/* Добавляем панель инструментов (по желанию) */}
                <div className="toolbar">
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleBold().run()}
                        className={editor.isActive('bold') ? 'is-active' : ''}
                    >
                        Bold
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleItalic().run()}
                        className={editor.isActive('italic') ? 'is-active' : ''}
                    >
                        Italic
                    </button>
                    <button
                      type="button"
                      onClick={() => editor.chain().focus().toggleStrike().run()}
                      className={editor.isActive('strike') ? 'is-active' : ''}
                    >
                      Strike
                    </button>
                   <button type="button" onClick={() => editor.chain().focus().setParagraph().run()}>
                        p
                    </button>
                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                        className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
                    >
                        H2
                    </button>

                    <button
                        type="button"
                        onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}
                        className={editor.isActive('heading', { level: 3 }) ? 'is-active' : ''}
                    >
                        H3
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        ul
                    </button>
                    <button type="button" onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        ol
                    </button>
                      <button
                        type="button"
                        onClick={() => {
                          const previousUrl = editor.getAttributes('link').href;
                          const url = window.prompt('URL', previousUrl);

                          // cancelled
                          if (url === null) {
                            return;
                          }

                          // empty
                          if (url === '') {
                            editor.chain().focus().unsetLink().run();

                            return;
                          }

                          // update link
                          editor.chain().focus().setLink({ href: url }).run();
                        }}

                        className={editor.isActive('link') ? 'is-active' : ''}
                      >
                        link
                    </button>
                     <button type="button" onClick={addImage}>
                        Image
                    </button>
                </div>

                {/*  Редактор */}
                <EditorContent editor={editor} />

                 <div>
                    <label htmlFor="mainPhotoUrl">Ссылка на главное фото:</label>
                    <input
                        type="text"
                        id="mainPhotoUrl"
                        value={mainPhotoUrl}
                        onChange={(e) => setMainPhotoUrl(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="additionalPhotoUrls">Ссылки на дополнительные фото (через запятую):</label>
                    <input
                        type="text"
                        id="additionalPhotoUrls"
                        value={additionalPhotoUrls.join(',')}
                        onChange={(e) => setAdditionalPhotoUrls(e.target.value.split(',').map(s => s.trim()))}
                    />
                </div>

                {loading && <p>Добавление...</p>}
                {error && <p style={{ color: 'red' }}>Ошибка: {error}</p>}
                {success && <p style={{ color: 'green' }}>Новость успешно добавлена!</p>}

                <button type="submit" disabled={loading}>
                    {loading ? 'Добавление...' : 'Добавить новость'}
                </button>
            </form>
        </div>
    );
};

export default AddNewsForm;