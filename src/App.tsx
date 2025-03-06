// src/App.tsx
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { ConfigProvider, Layout, Menu, theme as antdTheme } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  ReadOutlined,
  DashboardOutlined,
  LogoutOutlined
} from '@ant-design/icons';
import Home from './pages/Home/Home';
import Students from './pages/Students/Students';
import NewsPage from './pages/NewsPage/NewsPage';
import NotFoundPage from './pages/NotFoundPage/NotFoundPage';
import AllNewsPage from './pages/AllNewsPage/AllNewsPage';
import AdminDashboard from './pages/admin/AdminDashboard';
import NewsListAdmin from './pages/admin/NewsListAdmin';
import NewsEditForm from './pages/admin/NewsEditForm';
import { AuthProvider, useAuth } from './context/AuthContext';
import AdminRoute from './components/AdminRoute';
import { customTheme } from './theme';
import './App.module.css';
import 'antd/dist/reset.css';
import MyHeader from './components/layout/MyHeader'; //  Импортируем MyHeader
import MySidebar from './components/layout/MySidebar';


const { Content, Footer, Sider } = Layout;

const AppContent: React.FC = () => {
  const { logout, user } = useAuth();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [isDark, setIsDark] = useState(false);

  const currentTheme = isDark ? {
        ...customTheme,
        algorithm: antdTheme.darkAlgorithm,
        token: {
            ...customTheme.token,
             colorBgContainer: '#141414',
        }
    } : customTheme;

    const toggleTheme = () => {
        setIsDark(!isDark);
    };

    const handleMenuClick = (e: any) => {
    if (e.key === 'logout') {
      logout();
      navigate('/');
    } else {
      navigate(e.key);
    }
  };

    const getMenuItems = () => {
      const commonItems = [
        { key: '/', label: 'Главная', icon: <HomeOutlined /> },
        { key: '/students', label: 'Студенты', icon: <UserOutlined /> },
        { key: '/all-news', label: 'Все новости', icon: <ReadOutlined /> },
      ];

        const adminItems = [
            { key: '/admin', label: 'Админ панель', icon: <DashboardOutlined /> },
            { key: 'logout', label: 'Выход', icon: <LogoutOutlined /> },
        ]

      return user && user.role === 'admin' ? [...commonItems, ...adminItems] : commonItems;
  };


  return (
    <Layout style={{ minHeight: '100vh' }}>
      <MySidebar isDark={isDark}/>
      <Layout>
        <MyHeader isDark={isDark} toggleTheme={toggleTheme} currentTheme={currentTheme} />
        <Content style={{ margin: '24px 16px 0' }}>
            <div style={{ padding: 24, minHeight: 360, background: currentTheme.token.colorBgContainer }}>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/students" element={<Students />} />
                    <Route path="/news/:slug" element={<NewsPage />} />
                    <Route path="/all-news" element={<AllNewsPage />} />
                    <Route path="/admin" element={<AdminRoute><AdminDashboard /></AdminRoute>}>
                        <Route index element={<NewsListAdmin />} />
                        <Route path="news" element={<NewsListAdmin />} />
                        <Route path="news/edit/:slug" element={<NewsEditForm />} />
                    </Route>
                    <Route path="*" element={<NotFoundPage />} />
                </Routes>
            </div>
        </Content>
        <Footer style={{ textAlign: 'center', background: currentTheme.token.colorBgContainer }}>Ant Design ©2023 Created by Ant UED</Footer>
      </Layout>
    </Layout>
  );
};

const App: React.FC = () => (
  <ConfigProvider theme={customTheme}>
    <AuthProvider>
      <Router>
        <AppContent />
      </Router>
    </AuthProvider>
  </ConfigProvider>
);

export default App;