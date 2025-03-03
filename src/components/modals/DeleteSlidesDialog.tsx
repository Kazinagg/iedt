// src/components/DeleteSlidesDialog.tsx
import React, { useState, useCallback } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  List,
  ListItem,
  ListItemText,
  Checkbox,
  ListItemIcon
} from '@mui/material';
import { CarouselItem } from '../../types';

interface DeleteSlidesDialogProps {
  open: boolean;
  onClose: () => void;
  slides: CarouselItem[];
  onDelete: (slideIds: number[]) => void;
}

const DeleteSlidesDialog: React.FC<DeleteSlidesDialogProps> = ({
  open,
  onClose,
  slides,
  onDelete,
}) => {
  const [selectedSlides, setSelectedSlides] = useState<number[]>([]);

  const handleToggle = useCallback((slideId: number) => {
      //  Функция для переключения состояния чекбокса
    const currentIndex = selectedSlides.indexOf(slideId);
    const newChecked = [...selectedSlides];

    if (currentIndex === -1) {
      newChecked.push(slideId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setSelectedSlides(newChecked);
  }, [selectedSlides]);

  const handleConfirmDelete = () => {
    onDelete(selectedSlides);
    // onClose();  //  Закрываем в handleDeleteSlides
    setSelectedSlides([]); //  Сбрасываем выбранные слайды
  };

  return (
    <Dialog open={open} onClose={onClose} fullWidth maxWidth="sm">
      <DialogTitle>Удалить слайды</DialogTitle>
      <DialogContent>
        <List>
          {slides.map((slide) => (
            <ListItem
              key={slide.id}
              button
              onClick={() => handleToggle(slide.id)}
              secondaryAction={  //  Чекбокс как secondaryAction
                <Checkbox
                  edge="end"
                  onChange={() => handleToggle(slide.id)}
                  checked={selectedSlides.indexOf(slide.id) !== -1}
                />
              }
            >
                <ListItemIcon>
                    <img src={slide.imgPath} alt={slide.label} style={{ width: 50, height: 50, objectFit: 'cover' }} />
                </ListItemIcon>

              <ListItemText primary={slide.label} />
            </ListItem>
          ))}
        </List>
      </DialogContent>
      <DialogActions>
        <Button onClick={onClose} color="primary">
          Отмена
        </Button>
        <Button onClick={handleConfirmDelete} color="error" variant="contained" disabled={selectedSlides.length === 0}>
          Удалить
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteSlidesDialog;