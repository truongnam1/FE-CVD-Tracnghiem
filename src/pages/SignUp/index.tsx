import React from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';

interface SignUpProps {
  handleShowLogin: () => void;
}

export default function SignUp(props: SignUpProps) {
  const { handleShowLogin } = props;
  const { t } = useTranslation();

  const handleSubmit = (payload: any) => null;

  return (
    <Form onFinish={handleSubmit} className={styles.signUpForm}>
      <Row justify="center">
        <h2>{t('modalSignUp.title')}</h2>
      </Row>
      <Form.Item label={t('modalSignUp.fullName')} name="fullName" className={styles.form} labelCol={{ span: 24 }}>
        <Input placeholder={t('modalSignUp.fullName')} className={styles.input} />
      </Form.Item>
      <Form.Item label={t('modalSignUp.username')} name="username" className={styles.form} labelCol={{ span: 24 }}>
        <Input placeholder={t('modalSignUp.username')} className={styles.input} />
      </Form.Item>
      <Form.Item label={t('modalSignUp.password')} name="password" className={styles.form} labelCol={{ span: 24 }}>
        <Input.Password
          placeholder={t('modalSignUp.password')}
          className={styles.input}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            return false;
          }}
          onCopy={(e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            return false;
          }}
        />
      </Form.Item>
      <Form.Item
        label={t('modalSignUp.confirmPassword')}
        dependencies={['password']}
        hasFeedback
        name="confirmPassword"
        className={styles.form}
        labelCol={{ span: 24 }}
      >
        <Input.Password
          placeholder={t('modalSignUp.confirmPassword')}
          className={styles.input}
          onPaste={(e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            return false;
          }}
          onCopy={(e: React.ClipboardEvent<HTMLInputElement>) => {
            e.preventDefault();
            return false;
          }}
        />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.form}>
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit}>
          {t('common.signUp').toUpperCase()}
        </Button>
      </Form.Item>
      <Row className={styles.cantLogin}>
        <div className={styles.hadAccount}>
          {t('modalSignUp.hadAccount')}
          <span className={styles.showPopup} onClick={handleShowLogin}>
            {t('common.login')}
          </span>
        </div>
        <div className={styles.forgotPassword}>
          <span className={styles.showPopup}>{t('modalSignUp.forgotPassword')}</span>
        </div>
      </Row>
    </Form>
  );
}
