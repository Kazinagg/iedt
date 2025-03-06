import React, { useState } from 'react';
import { Layout, Menu, MenuProps } from 'antd';
import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  LoginOutlined, // Пример иконки для выхода
} from '@ant-design/icons';
import { Link, useLocation } from 'react-router-dom'; // Для навигации


const { Sider } = Layout;

type MenuItem = Required<MenuProps>['items'][number]; //Тип для элементов меню


const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation(); // Хук для получения текущего пути

  // Функция для создания элементов меню.  Она нужна, чтобы не дублировать код.
  function getItem(
    label: React.ReactNode,
    key: React.Key,
    icon?: React.ReactNode,
    children?: MenuItem[],
    type?: 'group'
  ): MenuItem {
    return {
      key,
      icon,
      children,
      label,
      type,
    } as MenuItem;
  }


  const items: MenuItem[] = [
    getItem(<Link to="/">Home</Link>, '/', <HomeOutlined />), //Пункт меню со ссылкой на главную. Link из react-router-dom
    getItem(<Link to="/users">Users</Link>, '/users', <UserOutlined />),
    getItem('Settings', 'sub1', <SettingOutlined />, [ //Подменю
      getItem(<Link to="/settings/profile">Profile</Link>, '/settings/profile'),
      getItem(<Link to="/settings/account">Account</Link>, '/settings/account'),
    ]),
    getItem(<Link to="/login">Login</Link>, '/login', <LoginOutlined/>), // Пример пункта меню для входа/выхода

    // Добавьте здесь свои пункты меню
  ];


  const siderStyle: React.CSSProperties = {
    overflow: 'auto',
    height: '100vh',
    position: 'sticky',
    top: 0,
  };

  return (
    <Sider style={siderStyle} collapsible collapsed={collapsed} onCollapse={(value) => setCollapsed(value)} width={250}>
      <div style={{
        height: 32,
        margin: 16,
        background: 'rgba(255, 255, 255, 0.2)', //Пример стиля для логотипа (замените на свой)
        borderRadius: 6,
      }}
      />
      <Menu
        theme="dark"  //Темная тема
        mode="inline" // Вертикальное расположение
        defaultSelectedKeys={[location.pathname]} // Выделяем текущий пункт меню
        items={items}
      />
    </Sider>
  );
};

export default Sidebar;