import React, { useState } from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row } from 'antd';
import { handleErrorMessage } from 'helper';
import { useMutation } from 'react-query';
import { sendPost } from 'api/axios';
import Cookies from 'js-cookie';

interface ForgotPasswordProps {
  handleShowResetPass: (value: boolean) => void;
  email: string;
}

export default function EnterOtp(props: ForgotPasswordProps) {
  const { handleShowResetPass, email } = props;
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { mutate: sendOtp } = useMutation(
    async (params: {otpCode: string, email: string}) => {
      return sendPost('/rpc/tracnghiem/profile/recovery-password-by-otp', params);
    },
    {
      onSuccess: (response: any) => {
        Cookies.set('token', response?.token, {
          expires: undefined,
        });
        Cookies.set('refreshToken', response?.refreshToken, {
          expires: undefined,
        });
        form.resetFields();
        setIsLoadingSubmit(false);
        handleShowResetPass(true);
      },
      onError: (error) => {
        handleErrorMessage(error);
        setIsLoadingSubmit(false);
      },
    }
  );

  const handleSubmit = (payload: any) => {
    setIsLoadingSubmit(true);
    const data: {otpCode: string, email: string} = {
      otpCode: payload.otpCode,
      email,
    };

    sendOtp(data);
  };

  return (
    <Form onFinish={handleSubmit} form={form} className={styles.forgotPasswordForm}>
      <Row justify="center">
        <h2>{'Mã OTP'}</h2>
      </Row>
      <Form.Item label={'Mã OTP'} name="otpCode" className={styles.form} labelCol={{ span: 24 }}>
        <Input placeholder={'Nhập mã OTP'} className={styles.input} />
      </Form.Item>
      <Form.Item labelCol={{ span: 24 }} className={styles.form}>
        <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
          {'GỬI'}
        </Button>
      </Form.Item>
      {/* <Row className={styles.cantLogin}>
        <div className={styles.hadAccount}>
          {t('modalSignUp.hadAccount')}
          <span className={styles.showPopup} onClick={handleShowLogin}>
            {t('common.login')}
          </span>
        </div>
      </Row> */}
    </Form>
  );
}
