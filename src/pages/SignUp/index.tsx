import React, { useState } from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { FormInstance, RuleObject } from 'antd/lib/form';
import { signUp } from 'api/authentication';
import { handleErrorMessage } from 'helper';
import { useMutation } from 'react-query';
import { ERROR_RESPONSE, MAX_LENGTH_PASSWORD, MIN_LENGTH_PASSWORD } from 'contants/constants';
import { AxiosError } from 'axios';

interface SignUpProps {
  handleShowLogin: () => void;
  handleShowForgotPassword: () => void;
}

export default function SignUp(props: SignUpProps) {
  const { handleShowLogin, handleShowForgotPassword } = props;
  const { t } = useTranslation();
  const [form]: FormInstance<any>[] = Form.useForm();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const { mutate: postSignUp } = useMutation((params: SignUpParamsInterface) => signUp(params), {
    onSuccess: () => {
      message.success(t('modalSignUp.signUpSuccess'));
      handleShowLogin();
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
            name: 'displayName',
            errors: errorMessage.response?.data?.errors?.displayName
              ? [errorMessage.response?.data?.errors?.displayName]
              : [],
          },
          {
            name: 'email',
            errors: errorMessage.response?.data?.errors?.email ? [errorMessage.response?.data?.errors?.email] : [],
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
    const data: SignUpParamsInterface = {
      username: payload.username,
      displayName: payload.displayName,
      email: payload.email,
      password: payload.password,
    };

    postSignUp(data);
  };

  return (
    <Form onFinish={handleSubmit} form={form} className={styles.signUpForm}>
      <Row justify="center">
        <h2>{t('modalSignUp.title')}</h2>
      </Row>
      <Form.Item label={t('modalSignUp.email')} name="email" className={styles.form} labelCol={{ span: 24 }}>
        <Input
          name="email"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalSignUp.email')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item
        label={t('modalSignUp.displayName')}
        name="displayName"
        className={styles.form}
        labelCol={{ span: 24 }}
      >
        <Input
          name="displayName"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalSignUp.displayName')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item label={t('modalSignUp.username')} name="username" className={styles.form} labelCol={{ span: 24 }}>
        <Input
          name="username"
          onChange={(e) => removeErrorOnChange(e)}
          placeholder={t('modalSignUp.username')}
          className={styles.input}
        />
      </Form.Item>
      <Form.Item label={t('modalSignUp.password')} name="password" className={styles.form} labelCol={{ span: 24 }} rules={[
          ({ getFieldValue }) => ({
            validator(_: RuleObject, value: string) {
              if (
                value &&
                (value.length > MAX_LENGTH_PASSWORD || value.length < MIN_LENGTH_PASSWORD)
              ) {
                return Promise.reject(new Error('Độ dài mật khẩu là từ 6 đến 24 ký tự!'));
              }
              return Promise.resolve();
            },
          }),
        ]}>
        <Input.Password
          name="password"
          onChange={(e) => removeErrorOnChange(e)}
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
        rules={[
          ({ getFieldValue }) => ({
            validator(_: RuleObject, value: string) {
              if (!value || getFieldValue('password') !== value) {
                return Promise.reject(new Error(t('modalSignUp.validate.confirmPasswordInvalid')));
              }
              return Promise.resolve();
            },
          }),
          ({ getFieldValue }) => ({
            validator(_: RuleObject, value: string) {
              if (
                value &&
                getFieldValue('password') === value &&
                (value.length > MAX_LENGTH_PASSWORD || value.length < MIN_LENGTH_PASSWORD)
              ) {
                return Promise.reject(new Error('Độ dài mật khẩu là từ 6 đến 24 ký tự!'));
              }
              return Promise.resolve();
            },
          }),
        ]}
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
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
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
          <span className={styles.showPopup} onClick={handleShowForgotPassword}>
            {t('modalSignUp.forgotPassword')}
          </span>
        </div>
      </Row>
    </Form>
  );
}
