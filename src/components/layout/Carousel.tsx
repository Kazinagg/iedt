// src/components/Carousel.tsx
import React, { useState, useEffect, useCallback } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import 'swiper/css/autoplay';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { useTheme } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
// import DeleteIcon from '@mui/icons-material/Delete'; //  Больше не нужен здесь
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import { getCarousel, updateCarousel } from '../../api/carouselApi';
import { CarouselItem } from '../../types';
import styles from './Carousel.module.css';
import DeleteSlidesDialog from '../modals/DeleteSlidesDialog'; //  Импортируем новый компонент


interface CarouselProps {
    isEditMode: boolean;
}

const CarouselComponent: React.FC<CarouselProps> = ({ isEditMode }) => {
    const theme = useTheme();
    const [slides, setSlides] = useState<CarouselItem[]>([]);
    const [newSlideUrl, setNewSlideUrl] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [swiperInstance, setSwiperInstance] = useState<any>(null);
    const [showDeleteDialog, setShowDeleteDialog] = useState(false); //  Состояние для модального окна


    useEffect(() => {
        const fetchCarousel = async () => {
            setLoading(true);
            setError(null);
            try {
                const data = await getCarousel();
                setSlides(data);
            } catch (error: any) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchCarousel();
    }, []);

     const handleAddSlide = useCallback(async () => {
        if (newSlideUrl.trim() === '') {
            return;
        }
        const newSlide = { id: Date.now(), imgPath: newSlideUrl, label: `Слайд ${slides.length + 1}` };

        try{
            const updatedSlides = [...slides, newSlide];
            await updateCarousel(updatedSlides);
            setSlides(updatedSlides);
            setNewSlideUrl('');
            swiperInstance?.slideTo(updatedSlides.length - 1);

        } catch(error: any){
            setError(error.message)
        }
    }, [newSlideUrl, slides, swiperInstance]);

    //  Удаляем handleDeleteSlide

    const handleDeleteSlides = useCallback(async (slidesToDelete: number[]) => {
      //  Функция для удаления слайдов (принимает массив id)
        try {
          const updatedSlides = slides.filter(slide => !slidesToDelete.includes(slide.id)); //  Фильтруем
          await updateCarousel(updatedSlides);
          setSlides(updatedSlides);
          //  Переходим на первый слайд, если удалили текущий
          if (swiperInstance && slidesToDelete.includes(slides[swiperInstance.activeIndex]?.id)) {
              swiperInstance.slideTo(0);
          }
          setShowDeleteDialog(false); // Закрываем диалог
        } catch (error: any) {
          setError(error.message);
        }
    }, [slides, swiperInstance]);


    if (loading) {
      return <Box sx={{display: 'flex', justifyContent: 'center'}}><Typography>Загрузка...</Typography></Box>;
    }

    if (error) {
      return <Box sx={{display: 'flex', justifyContent: 'center'}}><Typography color="error">Ошибка: {error}</Typography></Box>;
    }

    return (
        <Box sx={{ width: '100%' }}>
            <Swiper
                modules={[Navigation, Pagination, Autoplay]}
                spaceBetween={0}
                slidesPerView={1}
                navigation
                pagination={{ clickable: true }}
                autoplay={{ delay: 3000 }}
                loop={true}
                className={styles.swiperContainer}
                onSwiper={(swiper) => setSwiperInstance(swiper)}
            >
                {slides.map((slide) => (  //  Убираем index
                    <SwiperSlide key={slide.id}>
                        <Box className={styles.slideImageContainer}>
                            <img
                                src={slide.imgPath}
                                alt={slide.label}
                                className={styles.slideImage}
                            />

                            {/* <Box className={styles.slideLabel}>
                                <Typography>{slide.label}</Typography>
                            </Box> */}
                            {/* Убираем кнопку удаления */}
                        </Box>
                    </SwiperSlide>
                ))}
            </Swiper>

            {/* Добавление нового слайда */}
            {isEditMode && (
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, p: 1 }}>
                    <TextField
                        label="URL изображения"
                        variant="outlined"
                        value={newSlideUrl}
                        onChange={(e) => setNewSlideUrl(e.target.value)}
                        fullWidth
                        size="small"
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleAddSlide}
                        startIcon={<AddPhotoAlternateIcon />}
                    >
                        Добавить
                    </Button>
                </Box>
            )}
            {/* Кнопка "Удалить слайды" */}
            {isEditMode && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => setShowDeleteDialog(true)}
                sx={{ margin: 1 }}
              >
                Удалить слайды
              </Button>
            )}

            {/* Модальное окно для удаления слайдов */}
            <DeleteSlidesDialog
              open={showDeleteDialog}
              onClose={() => setShowDeleteDialog(false)}
              slides={slides}
              onDelete={handleDeleteSlides}
            />
        </Box>
    );
};

export default CarouselComponent;