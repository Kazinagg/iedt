import React from 'react';
import styles from './NotFoundPage.module.css'; // Создайте файл NotFoundPage.module.css

const NotFoundPage: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>404</h1>
      <p className={styles.message}>Страница не найдена.</p>
      <p className={styles.message}>Возможно, вы ввели неверный адрес или страница была удалена.</p>
      <p className={styles.message}>Вы можете вернуться на <a href="/">главную страницу</a>.</p>
    </div>
  );
};

export default NotFoundPage;