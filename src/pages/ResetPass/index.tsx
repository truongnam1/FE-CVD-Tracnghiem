import React, { useState } from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row } from 'antd';
import { handleErrorMessage } from 'helper';
import { useMutation } from 'react-query';
import { sendPost } from 'api/axios';

interface ForgotPasswordProps {
  handleShowResetPass: (value: boolean) => void;
}

export default function ResetPass(props: ForgotPasswordProps) {
  const { handleShowResetPass } = props;
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [form] = Form.useForm();

  const { mutate: sendOtp } = useMutation(
    async (params: {password: string}) => {
      return sendPost('/rpc/tracnghiem/profile/recovery-password', params);
    },
    {
      onSuccess: (response: any) => {
        setIsLoadingSubmit(false);
        handleShowResetPass(true);
        form.resetFields();
      },
      onError: (error) => {
        handleErrorMessage(error);
        setIsLoadingSubmit(false);
      },
    }
  );

  const handleSubmit = (payload: any) => {
    setIsLoadingSubmit(true);
    const data: {password: string} = {
      password: payload.password,
    };

    sendOtp(data);
  };

  return (
    <Form form={form} onFinish={handleSubmit} className={styles.forgotPasswordForm}>
      <Row justify="center">
        <h2>{'Mật khẩu mới'}</h2>
      </Row>
      <Form.Item label={'Mật khẩu'} name="password" className={styles.form} labelCol={{ span: 24 }} >
        <Input placeholder={'Nhập mật khẩu'} className={styles.input} type="password"/>
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
