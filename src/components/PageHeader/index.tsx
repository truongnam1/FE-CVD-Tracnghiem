import React from 'react';
import Cookies from 'js-cookie';
import { Menu, Dropdown, Button, Spin, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import useProfile from 'hooks/useProfile';
import styles from './styles.module.scss';
import { TOKEN_CUSTOMER } from 'contants/constants';

import logoHeader from 'assets/images/logo-header.svg';
import avatarImg from 'assets/images/avatar.svg';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';

export default function PageHeader() {
  const { t } = useTranslation();
  const isAuthenticated: boolean = !!Cookies.get(TOKEN_CUSTOMER);
  const { data: profile, isLoading: isLoadingProfile }: any = useProfile(isAuthenticated);
  const [isModalLoginVisible, setIsModalLoginVisible] = useState<boolean>(false);
  const [isModalSignUpVisible, setIsModalSignUpVisible] = useState<boolean>(false);

  // const handleLogout = () => {
  //   Cookies.remove('token');
  //   Cookies.remove('refreshToken');
  //   navigate('/login');
  // };

  const handleShowLogin = () => {
    setIsModalSignUpVisible(false);
    setIsModalLoginVisible(true);
  };

  const handleShowSignUp = () => {
    setIsModalLoginVisible(false);
    setIsModalSignUpVisible(true);
  };

  const menu = (
    <Menu style={{ minWidth: 200 }}>
      {/* <Menu.Item key="1">Profile</Menu.Item>
      <Menu.Item key="2">Change Password</Menu.Item>
      <Menu.Item key="3" onClick={handleLogout}>
        Logout
      </Menu.Item> */}
    </Menu>
  );

  return (
    <div className={styles.headerWrapper}>
      <div className={styles.menuWrapper}>
        <div className={styles.logoHeader}>
          <img src={logoHeader} alt="logo top" />
        </div>
        <div className={styles.redirectTab}>
          <a href="/">{t('common.home')}</a>
          <a href="/category">{t('common.category')}</a>
        </div>
        {!isAuthenticated && (
          <div className={styles.authen}>
            <Button type="primary" className={styles.btnLogin} onClick={() => setIsModalLoginVisible(true)}>
              {t('common.login')}
            </Button>
            <Button type="primary" className={styles.btnSignUp} onClick={() => setIsModalSignUpVisible(true)}>
              {t('common.signUp')}
            </Button>
          </div>
        )}
        {!!isAuthenticated && (
          <div className={styles.menuItem}>
            {!isLoadingProfile && (
              <Dropdown overlay={menu} trigger={['click']}>
                <div className={styles.dropdownToggle}>
                  <img className={styles.icon} src={avatarImg} alt="avatar user" />
                  <span className={styles.userName}>{profile?.name}</span>
                </div>
              </Dropdown>
            )}
            {isLoadingProfile && <Spin size="small" />}
          </div>
        )}
      </div>
      <Modal
        className={styles.modalLogin}
        visible={isModalLoginVisible}
        onCancel={() => setIsModalLoginVisible(false)}
        closable={false}
        centered={true}
        footer={false}
      >
        <Login handleShowSignUp={handleShowSignUp} />
      </Modal>
      <Modal
        className={styles.modalSignUp}
        visible={isModalSignUpVisible}
        onCancel={() => setIsModalSignUpVisible(false)}
        closable={false}
        centered={true}
        footer={false}
      >
        <SignUp handleShowLogin={handleShowLogin} />
      </Modal>
    </div>
  );
}
