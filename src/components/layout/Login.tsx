// src/components/Login.tsx
import React, { useState } from 'react';
import styles from './Login.module.css'; // Импортируем стили

interface LoginProps {
  onClose: () => void;
  onLoginSuccess: () => void;
}

const Login: React.FC<LoginProps> = ({ onClose, onLoginSuccess }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Здесь должна быть логика проверки учетных данных
    // ...

    // Если вход успешен:
    onLoginSuccess();
    onClose();
  };

  return (
    <div className={styles.overlay}>
      <div className={styles.box}>
        <h2>Вход</h2>
        <input
          type="text"
          placeholder="Имя пользователя"
          className={styles.input} // Добавляем класс для стилей
          value={username} 
          onChange={e => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Пароль"
          className={styles.input} // Добавляем класс для стилей
          value={password} 
          onChange={e => setPassword(e.target.value)}
        />
        <button onClick={handleLogin} className={styles.button}>Войти</button>
        <button onClick={onClose} className={styles.button}>Отмена</button>
      </div>
    </div>
  );
};



export default Login;