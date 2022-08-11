import React, { useState } from 'react';
import Cookies from 'js-cookie';
import styles from './style.module.scss';
import { Input, Button, Form, Row, FormInstance, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { login } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import { AxiosError } from 'axios';
import { ERROR_RESPONSE } from 'contants/constants';
import { useMutation } from 'react-query';

interface LoginProps {
  handleShowSignUp: () => void;
  handleShowForgotPassword: () => void;
  handleHidenAllPopup: () => void;
  setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function Login(props: LoginProps) {
  const { handleShowSignUp, handleShowForgotPassword, handleHidenAllPopup, setIsAuthenticated } = props;
  const { t } = useTranslation();
  const [form]: FormInstance<any>[] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const { mutate: postLogin } = useMutation((params: LoginParamsInterface) => login(params), {
    onSuccess: (response: any) => {
      Cookies.set('token', response?.token, {
        expires: undefined,
      });
      Cookies.set('refreshToken', response?.refreshToken, {
        expires: undefined,
      });
      setIsAuthenticated(true);
      handleHidenAllPopup();
      message.success(t('modalLogin.loginSuccess'));
      setIsLoadingSubmit(false);
    },
    onError: (error) => {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        form.setFields([
          {
            name: 'username',
            errors: errorMessage.response?.data?.errors?.username
              ? [errorMessage.response?.data?.errors?.username]
              : [],
          },
          {
            name: 'password',
            errors: errorMessage.response?.data?.errors?.password
              ? [errorMessage.response?.data?.errors?.password]
              : [],
          },
        ]);
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
    },
  });

  const removeErrorOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    form.setFields([
      {
        name: e.target.name,
        errors: [],
      },
    ]);
  };

  const handleSubmit = (payload: any) => {
    setIsLoadingSubmit(true);
    const data: LoginParamsInterface = {
      username: payload.username,
      password: payload.password,
    };

    postLogin(data);
  };

  return (
    <Form onFinish={handleSubmit} form={form} hideRequiredMark className={styles.loginForm}>
      <Row justify="center">
        <h2>{t('modalLogin.title')}</h2>
      </Row>
      <Form.Item label={t('modalLogin.username')} name="username" className={styles.form} labelCol={{ span: 24 }}>
        <Input
          name="username"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalLogin.username')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item label={t('modalLogin.password')} name="password" className={styles.form} labelCol={{ span: 24 }}>
        <Input.Password
          name="password"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalLogin.password')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.form}>
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
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
