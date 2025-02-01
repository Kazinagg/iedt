// src/components/Login.tsx
import React, { useState } from 'react';

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
    <div className="login-overlay"> {/* Добавьте стили */}
      <div className="login-box"> {/* Добавьте стили */}
        <h2>Вход</h2>
        <input type="text" placeholder="Имя пользователя" value={username} onChange={e => setUsername(e.target.value)} />
        <input type="password" placeholder="Пароль" value={password} onChange={e => setPassword(e.target.value)} />
        <button onClick={handleLogin}>Войти</button>
        <button onClick={onClose}>Отмена</button>
      </div>
    </div>
  );
};

export default Login;