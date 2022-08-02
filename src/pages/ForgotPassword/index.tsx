import React, { useState } from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row } from 'antd';
import { useTranslation } from 'react-i18next';
import { handleErrorMessage } from 'helper';
import { useMutation } from 'react-query';
import { forgotPassword } from 'api/authentication';

interface ForgotPasswordProps {
  handleShowLogin: () => void;
}

export default function ForgotPassword(props: ForgotPasswordProps) {
  const { handleShowLogin } = props;
  const { t } = useTranslation();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const { mutate: postForgotPassword } = useMutation(
    (params: ForgotPasswordParamsInterface) => forgotPassword(params),
    {
      onSuccess: (response: any) => {
        console.log(response);
        setIsLoadingSubmit(false);
      },
      onError: (error) => {
        handleErrorMessage(error);
        setIsLoadingSubmit(false);
      },
    }
  );

  const handleSubmit = (payload: any) => {
    setIsLoadingSubmit(true);
    const data: ForgotPasswordParamsInterface = {
      email: payload.email,
    };

    postForgotPassword(data);
  };

  return (
    <Form onFinish={handleSubmit} className={styles.forgotPasswordForm}>
      <Row justify="center">
        <h2>{t('modalForgotPassword.title')}</h2>
      </Row>
      <Form.Item label={t('modalForgotPassword.email')} name="email" className={styles.form} labelCol={{ span: 24 }}>
        <Input placeholder={t('modalForgotPassword.email')} className={styles.input} />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.form}>
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
          {t('common.check').toUpperCase()}
        </Button>
      </Form.Item>
      <Row className={styles.cantLogin}>
        <div className={styles.hadAccount}>
          {t('modalSignUp.hadAccount')}
          <span className={styles.showPopup} onClick={handleShowLogin}>
            {t('common.login')}
          </span>
        </div>
      </Row>
    </Form>
  );
}
