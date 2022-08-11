import React, { useCallback } from 'react';
import Cookies from 'js-cookie';
import { Menu, Dropdown, Button, Spin, Modal } from 'antd';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';

import { useCustomerProfile } from 'hooks/useProfile';
import styles from './styles.module.scss';
import { TOKEN_CUSTOMER } from 'contants/constants';
import Login from 'pages/Login';
import SignUp from 'pages/SignUp';
import { useNavigate } from 'react-router-dom';
import ForgotPassword from 'pages/ForgotPassword';

import logoHeader from 'assets/images/logo-header.svg';
import avatarImg from 'assets/images/profile.png';
import questionImg from 'assets/images/question.png';
import examHistoryImg from 'assets/images/history-exam.png';
import examImg from 'assets/images/exam.png';
import passwordImg from 'assets/images/password.png';
import logoutImg from 'assets/images/logout.png';
import EnterOtp from 'pages/EnterOtp';
import ResetPass from 'pages/ResetPass';

const { confirm } = Modal;

export default function PageHeader() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(!!Cookies.get(TOKEN_CUSTOMER));
  const profile: any = useCustomerProfile(isAuthenticated);
  const [isModalLoginVisible, setIsModalLoginVisible] = useState<boolean>(false);
  const [isModalSignUpVisible, setIsModalSignUpVisible] = useState<boolean>(false);
  const [isModalForgotPasswordVisible, setIsModalForgotPasswordVisible] = useState<boolean>(false);
  const [visibleOtp, setVisibleOtp] = useState<boolean>(false);

  const [visibleReset, setVisibleReset] = useState<boolean>(false);
  const [email, setEmail] = useState<string>('');

  const handleLogout = useCallback(() => {
    if (!isAuthenticated) return;
    confirm({
      title: (
        <>
          <div>{t('common.confirmLogOut')}</div>
        </>
      ),
      okText: t('common.btnOk'),
      cancelText: t('common.btnCancel'),
      icon: <></>,
      className: 'modal-confirm-normal',
      centered: true,
      onOk() {
        Cookies.remove('token');
        Cookies.remove('refreshToken');
        setIsAuthenticated(false);
        navigate('/');
        handleShowLogin();
      },
    });
    // eslint-disable-next-line
  }, [isAuthenticated, navigate, t]);

  const handleHidenAllPopup = () => {
    setIsModalSignUpVisible(false);
    setIsModalForgotPasswordVisible(false);
    setIsModalLoginVisible(false);
  };

  const handleShowLogin = useCallback(() => {
    if (isAuthenticated) return;
    setIsModalSignUpVisible(false);
    setIsModalForgotPasswordVisible(false);
    setIsModalLoginVisible(true);
  }, [isAuthenticated]);

  const handleShowSignUp = useCallback(() => {
    if (isAuthenticated) return;
    setIsModalLoginVisible(false);
    setIsModalForgotPasswordVisible(false);
    setIsModalSignUpVisible(true);
  }, [isAuthenticated]);

  const handleShowForgotPassword = useCallback(() => {
    if (isAuthenticated) return;
    setIsModalLoginVisible(false);
    setIsModalSignUpVisible(false);
    setIsModalForgotPasswordVisible(true);
  }, [isAuthenticated]);

  const handleShowResetPass = (value: boolean) => {
    setVisibleOtp(false);
    setVisibleReset(value);
  };

  const menu = (
    <Menu style={{ minWidth: 200 }}>
      <Menu.Item key="1" onClick={() => navigate('/profile')}>
        <img className={styles.icon} height={24} width={24} src={profile?.image?.url || avatarImg} alt="profile" />
        &ensp;{t('common.profile')}
      </Menu.Item>
      <Menu.Item key="2" onClick={() => navigate('/question')}>
        <img className={styles.icon} height={24} width={24} src={questionImg} alt="questionManagement" />
        &ensp;
        {t('common.questionManagement')}
      </Menu.Item>
      <Menu.Item key="3" onClick={() => navigate('/exam')}>
        <img className={styles.icon} height={24} width={24} src={examImg} alt="examManagement" />
        &ensp;
        {t('common.examManagement')}
      </Menu.Item>
      <Menu.Item key="4" onClick={() => navigate('/exam-history')}>
        <img className={styles.icon} height={24} width={24} src={examHistoryImg} alt="examhistory" />
        &ensp;Lịch sử bài thi
      </Menu.Item>
      <Menu.Item key="5" onClick={() => navigate('/change-password')}>
        <img className={styles.icon} height={24} width={24} src={passwordImg} alt="changePassword" />
        &ensp;
        {t('common.changePassword')}
      </Menu.Item>
      <Menu.Item key="6" onClick={handleLogout}>
        <img className={styles.icon} height={24} width={24} src={logoutImg} alt="logout" />
        &ensp;{t('common.logout')}
      </Menu.Item>
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
            {!profile.isLoading && (
              <Dropdown overlay={menu} trigger={['click']}>
                <div className={styles.dropdownToggle}>
                  <img
                    className={styles.icon}
                    height={32}
                    width={32}
                    src={profile?.image?.url || avatarImg}
                    alt="avatar user"
                  />
                  <span className={styles.userName}>{profile?.displayName}</span>
                </div>
              </Dropdown>
            )}
            {profile.isLoading && <Spin size="small" />}
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
        <Login
          handleShowSignUp={handleShowSignUp}
          handleShowForgotPassword={handleShowForgotPassword}
          handleHidenAllPopup={handleHidenAllPopup}
          setIsAuthenticated={setIsAuthenticated}
        />
      </Modal>
      <Modal
        className={styles.modalSignUp}
        visible={isModalSignUpVisible}
        onCancel={() => setIsModalSignUpVisible(false)}
        closable={false}
        centered={true}
        footer={false}
      >
        <SignUp handleShowLogin={handleShowLogin} handleShowForgotPassword={handleShowForgotPassword} />
      </Modal>
      <Modal
        className={styles.modalSignUp}
        visible={isModalForgotPasswordVisible}
        onCancel={() => setIsModalForgotPasswordVisible(false)}
        closable={false}
        centered={true}
        footer={false}
      >
        <ForgotPassword
          setEmail={setEmail}
          handleShowLogin={handleShowLogin}
          onSetVisible={{ setVisibleOtp, setVisibleForGot: setIsModalForgotPasswordVisible }}
        />
      </Modal>

      <Modal
        className={styles.modalSignUp}
        visible={visibleOtp}
        onCancel={() => setVisibleOtp(false)}
        closable={false}
        centered={true}
        footer={false}
      >
        <EnterOtp email={email} handleShowResetPass={handleShowResetPass} />
      </Modal>

      <Modal
        className={styles.modalSignUp}
        visible={visibleReset}
        onCancel={() => setVisibleReset(false)}
        closable={false}
        centered={true}
        footer={false}
      >
        <ResetPass handleShowResetPass={handleShowResetPass} />
      </Modal>
    </div>
  );
}
