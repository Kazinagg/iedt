// src/theme.ts
import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', //  Твой основной цвет
    },
    secondary: {
      main: '#dc004e', //  Твой вторичный цвет
    },
    error: {
      main: '#f44336', // Цвет ошибки
    },
    // Добавь другие цвета, если нужно
  },
  typography: {
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontSize: '2rem', //  Например, другой размер для h1
      fontWeight: 500,
    },
    // Настрой другие стили текста
  },
  // Другие настройки темы (spacing, breakpoints, shadows и т.д.)
});

export default theme;