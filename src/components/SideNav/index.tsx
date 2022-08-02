import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import classNames from 'classnames';
import { useQueryClient } from 'react-query';

import useToggleSideNav from 'hooks/useToggleSideNav';
import styles from './styles.module.scss';

import avatarImg from 'assets/images/profile.png';
import questionImg from 'assets/images/question.png';
import examImg from 'assets/images/exam.png';
import passwordImg from 'assets/images/password.png';

const collapseIcon = (
  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M3 7H21" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 12H21" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M3 17H21" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const collapsedIcon = (
  <svg width="38" height="24" viewBox="0 0 38 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9.57 5.93005L3.5 12.0001L9.57 18.0701"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M33.6699 12H3.66992"
      stroke="#3B3B3B"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export default function SideNav() {
  const collapsed = useToggleSideNav();
  const location = useLocation();
  const [selectedKey, setSelectedKey] = useState('1');
  const queryClient = useQueryClient();

  const routes = [
    {
      key: '1',
      text: 'Trang cá nhân',
      url: '/profile',
      icon: <img className={styles.icon} height={24} width={24} src={avatarImg} alt="profile" />,
    },
    {
      key: '2',
      text: 'Quản lý câu hỏi',
      url: '/question',
      icon: <img className={styles.icon} height={24} width={24} src={questionImg} alt="questionManagement" />,
    },
    {
      key: '3',
      text: 'Quản lý bài thi',
      url: '/exam',
      icon: <img className={styles.icon} height={24} width={24} src={examImg} alt="examManagement" />,
    },
    {
      key: '4',
      text: 'Đổi mật khẩu',
      url: '/change-password',
      icon: <img className={styles.icon} height={24} width={24} src={passwordImg} alt="changePassword" />,
    },
  ];

  useEffect(() => {
    routes.forEach((route) => {
      if (location.pathname.startsWith(route.url || '###')) {
        setSelectedKey(route.key);
      }
    });
  }, [location.pathname, routes]);

  const toggleSideNav = () => {
    queryClient.setQueryData('showSideNav', (value: boolean | undefined) => !value);
  };

  return (
    <div
      className={classNames({
        [styles.sideNav]: true,
        [styles.sideNavCollapsed]: collapsed,
        [styles.isCollapsed]: !collapsed,
      })}
    >
      <Menu
        selectedKeys={[selectedKey]}
        defaultOpenKeys={[]}
        mode="inline"
        // inlineCollapsed={collapsed}
        className={classNames({
          [styles.antMenu]: true,
        })}
      >
        <Menu.Item key="0" icon={collapsed ? collapsedIcon : collapseIcon} onClick={toggleSideNav}>
          <a href="#toggle" onClick={(e) => e.preventDefault()}>
            {''}
          </a>
        </Menu.Item>
        {routes.map((route) => {
          return (
            <Menu.Item key={route.key} icon={route.icon}>
              <Link to={route.url || ''}>{collapsed ? route.text : ''}</Link>
            </Menu.Item>
          );
        })}
      </Menu>
    </div>
  );
}
