// src/components/AdminRoute.tsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

interface AdminRouteProps {
  children?: React.ReactNode; //  children необязательный
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { isAdmin, loading: authLoading } = useAuth();

  if (authLoading) {
    return <div>Loading...</div>; //  Показываем индикатор загрузки
  }

  if (!isAdmin) {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>; //  Рендерим children
};

export default AdminRoute;