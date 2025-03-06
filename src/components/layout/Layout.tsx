// src/components/Layout/AppLayout.tsx

import React, { useState, useEffect } from 'react';
import { Layout } from 'antd';
import Sidebar from './MySidebar';
import { Outlet } from 'react-router-dom';
import Header from './MyHeader';
import Footer from './Footer';
import { useAuth } from '../../context/AuthContext';

const { Header: AntHeader, Content, Footer: AntFooter } = Layout;

const AppLayout: React.FC = () => {
  const { logout } = useAuth();
  const [collapsed, setCollapsed] = useState(false); //  Состояние для collapsed
  const [marginLeft, setMarginLeft] = useState(250); //  Начальное значение marginLeft

  //  Обновляем marginLeft при изменении collapsed
  useEffect(() => {
    setMarginLeft(collapsed ? 80 : 250); //  80px - стандартная ширина свернутого Sider
  }, [collapsed]);

  return (
    <Layout style={{ minHeight: '100vh' }}>
      <Sidebar collapsed={collapsed} onCollapse={setCollapsed} /> {/* Передаем props */}
      <Layout style={{ marginLeft: marginLeft }}>
        <AntHeader style={{ padding: 0, background: '#fff', position: 'sticky', top: 0, zIndex: 1 }}>
          <Header onLogout={logout} />
        </AntHeader>
        <Content style={{ margin: '24px 16px 0', overflow: 'auto' }}>
          <div style={{ padding: 24, minHeight: 360, background: '#fff' }}>
            <Outlet />
          </div>
        </Content>
        <AntFooter style={{ textAlign: 'center', position: 'sticky', bottom: 0, width: "100%" }}>
          Ant Design ©{new Date().getFullYear()} Created by Your Name
        </AntFooter>
      </Layout>
    </Layout>
  );
};

export default AppLayout;