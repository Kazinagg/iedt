// src/context/AuthContext.tsx
import React, { createContext, useState, useContext, useEffect, ReactNode } from 'react';

interface AuthContextProps {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: () => void;  //  Замени на реальную функцию входа
  logout: () => void; //  Замени на реальную функцию выхода
  loading: boolean;
}

const AuthContext = createContext<AuthContextProps>({
  isLoggedIn: false,
  isAdmin: false,
  login: () => {},
  logout: () => {},
  loading: false,
});

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [loading, setLoading] = useState(true); //  Добавили состояние загрузки

  //  Здесь должна быть реальная логика аутентификации (например, с использованием Firebase, JWT или другого метода)
  //  В этом примере мы используем localStorage для простоты

    useEffect(() => {
        const storedLoggedIn = localStorage.getItem('isLoggedIn');
        const storedIsAdmin = localStorage.getItem('isAdmin');

        if (storedLoggedIn === 'true') {
            setIsLoggedIn(true);
        }
        if (storedIsAdmin === 'true') {
            setIsAdmin(true);
        }
        setLoading(false); //  Устанавливаем loading в false после проверки
    }, []);

    const login = () => {
        //  Реальная логика входа (например, запрос к серверу)
        setIsLoggedIn(true);
        setIsAdmin(true); //  Временно, для примера, делаем пользователя админом
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('isAdmin', 'true');

    };

    const logout = () => {
      setIsLoggedIn(false);
      setIsAdmin(false);
      localStorage.removeItem('isLoggedIn');
      localStorage.removeItem('isAdmin');
    };



  const value = {
    isLoggedIn,
    isAdmin,
    login,
    logout,
    loading
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => useContext(AuthContext);