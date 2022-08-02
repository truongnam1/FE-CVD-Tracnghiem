import React from 'react';
import Cookies from 'js-cookie';
import _ from 'lodash';
import styles from './style.module.scss';
import { Input, Button, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { login } from 'api/authentication';
import { handleErrorMessage } from 'helper';

interface LoginProps {
  handleShowSignUp: () => void;
  handleShowForgotPassword: () => void;
}

export default function Login(props: LoginProps) {
  const { handleShowSignUp, handleShowForgotPassword } = props;
  const { t } = useTranslation();

  const handleSubmit = async (payload: any) => {
    const params = _.pick(payload, ['username', 'password']);
    try {
      const data = await login(params);
      const { token, refreshToken } = data.data;
      Cookies.set('token', token, {
        expires: undefined,
      });
      Cookies.set('refreshToken', refreshToken, {
        expires: undefined,
      });
    } catch (error) {
      handleErrorMessage(error);
    }
  };

  return (
    <Form onFinish={handleSubmit} hideRequiredMark className={styles.loginForm}>
      <Row justify="center">
        <h2>{t('modalLogin.title')}</h2>
      </Row>
      <Form.Item label={t('modalLogin.username')} name="username" className={styles.form} labelCol={{ span: 24 }}>
        <Input placeholder={t('modalLogin.username')} className={styles.input} />
      </Form.Item>
      <Form.Item label={t('modalLogin.password')} name="password" className={styles.form} labelCol={{ span: 24 }}>
        <Input.Password placeholder={t('modalLogin.password')} className={styles.input} />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.form}>
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit}>
          {t('common.login').toUpperCase()}
        </Button>
      </Form.Item>
      <Row className={styles.cantLogin}>
        <div className={styles.notHaveAccount}>
          {t('modalLogin.notHaveAccount')}
          <span className={styles.showPopup} onClick={handleShowSignUp}>
            {t('common.signUp')}
          </span>
        </div>
        <div className={styles.forgotPassword}>
          <span className={styles.showPopup} onClick={handleShowForgotPassword}>
            {t('modalLogin.forgotPassword')}
          </span>
        </div>
      </Row>
    </Form>
  );
}
