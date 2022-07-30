import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu } from 'antd';
import classNames from 'classnames';
import { useQueryClient } from 'react-query';

import useToggleSideNav from 'hooks/useToggleSideNav';
import styles from './styles.module.scss';

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
      text: '店舗の情報',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.00977 11.22V15.71C3.00977 20.2 4.80977 22 9.29977 22H14.6898C19.1798 22 20.9798 20.2 20.9798 15.71V11.22"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0005 12C13.8305 12 15.1805 10.51 15.0005 8.68L14.3405 2H9.67048L9.00048 8.68C8.82048 10.51 10.1705 12 12.0005 12Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M18.3108 12C20.3308 12 21.8108 10.36 21.6108 8.35L21.3308 5.6C20.9708 3 19.9708 2 17.3508 2H14.3008L15.0008 9.01C15.1708 10.66 16.6608 12 18.3108 12Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.64037 12C7.29037 12 8.78037 10.66 8.94037 9.01L9.16037 6.8L9.64037 2H6.59037C3.97037 2 2.97037 3 2.61037 5.6L2.34037 8.35C2.14037 10.36 3.62037 12 5.64037 12Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 17C10.33 17 9.5 17.83 9.5 19.5V22H14.5V19.5C14.5 17.83 13.67 17 12 17Z"
            stroke="white"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '2',
      text: '商品管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3.16992 7.44L11.9999 12.55L20.7699 7.46997"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M12 21.61V12.54" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M9.9306 2.48L4.59061 5.45003C3.38061 6.12003 2.39062 7.80001 2.39062 9.18001V14.83C2.39062 16.21 3.38061 17.89 4.59061 18.56L9.9306 21.53C11.0706 22.16 12.9406 22.16 14.0806 21.53L19.4206 18.56C20.6306 17.89 21.6206 16.21 21.6206 14.83V9.18001C21.6206 7.80001 20.6306 6.12003 19.4206 5.45003L14.0806 2.48C12.9306 1.84 11.0706 1.84 9.9306 2.48Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.9998 13.24V9.58002L7.50977 4.09998"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '3',
      text: '注文管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 6V8.42C22 10 21 11 19.42 11H16V4.01C16 2.9 16.91 2 18.02 2C19.11 2.01 20.11 2.45 20.83 3.17C21.55 3.9 22 4.9 22 6Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M2 7V21C2 21.83 2.93998 22.3 3.59998 21.8L5.31 20.52C5.71 20.22 6.27 20.26 6.63 20.62L8.28998 22.29C8.67998 22.68 9.32002 22.68 9.71002 22.29L11.39 20.61C11.74 20.26 12.3 20.22 12.69 20.52L14.4 21.8C15.06 22.29 16 21.82 16 21V4C16 2.9 16.9 2 18 2H7H6C3 2 2 3.79 2 6V7Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M6 9H12" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path d="M6.75 13H11.25" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: '4',
      text: '収入管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.2598 18.9V7.1C19.2598 5.6 18.6198 5 17.0298 5H15.9898C14.3998 5 13.7598 5.6 13.7598 7.1V18.9"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.25977 18.9V12.1C5.25977 10.6 5.89977 10 7.48977 10H8.52977C10.1198 10 10.7598 10.6 10.7598 12.1V18.9"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M2 19H22" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      ),
    },
    {
      key: '5',
      text: 'スタッフ管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M18.0001 7.16C17.9401 7.15 17.8701 7.15 17.8101 7.16C16.4301 7.11 15.3301 5.98 15.3301 4.58C15.3301 3.15 16.4801 2 17.9101 2C19.3401 2 20.4901 3.16 20.4901 4.58C20.4801 5.98 19.3801 7.11 18.0001 7.16Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16.9695 14.44C18.3395 14.67 19.8495 14.43 20.9095 13.72C22.3195 12.78 22.3195 11.24 20.9095 10.3C19.8395 9.59004 18.3095 9.35003 16.9395 9.59003"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.96852 7.16C6.02852 7.15 6.09852 7.15 6.15852 7.16C7.53852 7.11 8.63852 5.98 8.63852 4.58C8.63852 3.15 7.48852 2 6.05852 2C4.62852 2 3.47852 3.16 3.47852 4.58C3.48852 5.98 4.58852 7.11 5.96852 7.16Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M6.99945 14.44C5.62945 14.67 4.11945 14.43 3.05945 13.72C1.64945 12.78 1.64945 11.24 3.05945 10.3C4.12945 9.59004 5.65945 9.35003 7.02945 9.59003"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12.0001 14.63C11.9401 14.62 11.8701 14.62 11.8101 14.63C10.4301 14.58 9.33008 13.45 9.33008 12.05C9.33008 10.62 10.4801 9.46997 11.9101 9.46997C13.3401 9.46997 14.4901 10.63 14.4901 12.05C14.4801 13.45 13.3801 14.59 12.0001 14.63Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.0907 17.78C7.6807 18.72 7.6807 20.26 9.0907 21.2C10.6907 22.27 13.3107 22.27 14.9107 21.2C16.3207 20.26 16.3207 18.72 14.9107 17.78C13.3207 16.72 10.6907 16.72 9.0907 17.78Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '6',
      text: 'スケジュール管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8 2V5"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M16 2V5"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M3.5 9.08997H20.5"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M21 8.5V17C21 20 19.5 22 16 22H8C4.5 22 3 20 3 17V8.5C3 5.5 4.5 3.5 8 3.5H16C19.5 3.5 21 5.5 21 8.5Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9945 13.7H12.0035"
            stroke="#3B3B3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.29529 13.7H8.30427"
            stroke="#3B3B3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.29529 16.7H8.30427"
            stroke="#3B3B3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '7',
      text: '日程管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M17 18.4301H13L8.54999 21.39C7.88999 21.83 7 21.3601 7 20.5601V18.4301C4 18.4301 2 16.4301 2 13.4301V7.42999C2 4.42999 4 2.42999 7 2.42999H17C20 2.42999 22 4.42999 22 7.42999V13.4301C22 16.4301 20 18.4301 17 18.4301Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9998 11.36V11.15C11.9998 10.47 12.4198 10.11 12.8398 9.82001C13.2498 9.54001 13.6598 9.18002 13.6598 8.52002C13.6598 7.60002 12.9198 6.85999 11.9998 6.85999C11.0798 6.85999 10.3398 7.60002 10.3398 8.52002"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.9955 13.75H12.0045"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '8',
      text: 'クーポン管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M19.5 12.5C19.5 11.12 20.62 10 22 10V9C22 5 21 4 17 4H7C3 4 2 5 2 9V9.5C3.38 9.5 4.5 10.62 4.5 12C4.5 13.38 3.38 14.5 2 14.5V15C2 19 3 20 7 20H17C21 20 22 19 22 15C20.62 15 19.5 13.88 19.5 12.5Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path d="M9 14.75L15 8.75" stroke="#3B3B3B" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          <path
            d="M14.9945 14.75H15.0035"
            stroke="#3B3B3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M8.99451 9.25H9.00349"
            stroke="#3B3B3B"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '9',
      text: 'チャットリスト',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M22 6.25V11.35C22 12.62 21.58 13.69 20.83 14.43C20.09 15.18 19.02 15.6 17.75 15.6V17.41C17.75 18.09 16.99 18.5 16.43 18.12L15.46 17.48C15.55 17.17 15.59 16.83 15.59 16.47V12.4C15.59 10.36 14.23 9 12.19 9H5.39999C5.25999 9 5.13 9.01002 5 9.02002V6.25C5 3.7 6.7 2 9.25 2H17.75C20.3 2 22 3.7 22 6.25Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M15.59 12.4V16.47C15.59 16.83 15.55 17.17 15.46 17.48C15.09 18.95 13.87 19.87 12.19 19.87H9.47L6.45 21.88C6 22.19 5.39999 21.86 5.39999 21.32V19.87C4.37999 19.87 3.53 19.53 2.94 18.94C2.34 18.34 2 17.49 2 16.47V12.4C2 10.5 3.18 9.19002 5 9.02002C5.13 9.01002 5.25999 9 5.39999 9H12.19C14.23 9 15.59 10.36 15.59 12.4Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeMiterlimit="10"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '10',
      text: 'ライブ配信管理',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M12.53 20.42H6.21C3.05 20.42 2 18.32 2 16.21V7.78999C2 4.62999 3.05 3.57999 6.21 3.57999H12.53C15.69 3.57999 16.74 4.62999 16.74 7.78999V16.21C16.74 19.37 15.68 20.42 12.53 20.42Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M19.5202 17.1L16.7402 15.15V8.84001L19.5202 6.89001C20.8802 5.94001 22.0002 6.52001 22.0002 8.19001V15.81C22.0002 17.48 20.8802 18.06 19.5202 17.1Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M11.5 11C12.3284 11 13 10.3284 13 9.5C13 8.67157 12.3284 8 11.5 8C10.6716 8 10 8.67157 10 9.5C10 10.3284 10.6716 11 11.5 11Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '11',
      text: '設定',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M3 9.10998V14.88C3 17 3 17 5 18.35L10.5 21.53C11.33 22.01 12.68 22.01 13.5 21.53L19 18.35C21 17 21 17 21 14.89V9.10998C21 6.99998 21 6.99999 19 5.64999L13.5 2.46999C12.68 1.98999 11.33 1.98999 10.5 2.46999L5 5.64999C3 6.99999 3 6.99998 3 9.10998Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M12 15C13.6569 15 15 13.6569 15 12C15 10.3431 13.6569 9 12 9C10.3431 9 9 10.3431 9 12C9 13.6569 10.3431 15 12 15Z"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
    },
    {
      key: '12',
      text: 'ログアウト',
      url: '/',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M8.90039 7.55999C9.21039 3.95999 11.0604 2.48999 15.1104 2.48999H15.2404C19.7104 2.48999 21.5004 4.27999 21.5004 8.74999V15.27C21.5004 19.74 19.7104 21.53 15.2404 21.53H15.1104C11.0904 21.53 9.24039 20.08 8.91039 16.54"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M14.9991 12H3.61914"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M5.85 8.64999L2.5 12L5.85 15.35"
            stroke="#3B3B3B"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      ),
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
            {collapsed ? 'メニュー' : ''}
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
