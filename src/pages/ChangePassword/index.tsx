import React, { useEffect, useState } from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row, Col, message } from 'antd';
import { useTranslation } from 'react-i18next';
import { RuleObject } from 'antd/lib/form';
import { handleErrorMessage } from 'helper';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import { changePassword } from 'api/profile';
import SideNav from 'components/SideNav';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import Cookies from 'js-cookie';
import { TOKEN_CUSTOMER } from 'contants/constants';

export default function ChangePassword() {
  const { t } = useTranslation();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();

  const [form] = Form.useForm();

  const { mutate: postChangePassword } = useMutation(
    (params: ChangePasswordParamsInterface) => changePassword(params),
    {
      onSuccess: (response: any) => {
        form.resetFields();
        message.success('Thay đổi mật khẩu thành công!');
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

    const data: any = {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
      confirmPassword: payload.confirmPassword,
      id: profile?.id,
    };

    postChangePassword(data);
  };

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([GET_CUSTOMER_PROFILE, isAuthenticated]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

  return (
    <div className={styles.changePassword}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('modalChangePassword.title')}</h2>
        </Col>
      </Row>
      <Form onFinish={handleSubmit} form={form} className={styles.changePasswordForm}>
        <Form.Item
          label={t('modalChangePassword.oldPassword')}
          name="oldPassword"
          className={styles.form}
          labelCol={{ span: 24 }}
        >
          <Input.Password
            placeholder={t('modalChangePassword.oldPassword')}
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
          label={t('modalChangePassword.newPassword')}
          name="newPassword"
          className={styles.form}
          labelCol={{ span: 24 }}
        >
          <Input.Password
            placeholder={t('modalChangePassword.newPassword')}
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
          label={t('modalChangePassword.confirmPassword')}
          dependencies={['newPassword']}
          hasFeedback
          name="confirmPassword"
          className={styles.form}
          labelCol={{ span: 24 }}
          rules={[
            ({ getFieldValue }) => ({
              validator(_: RuleObject, value: string) {
                if (!value || getFieldValue('newPassword') !== value) {
                  return Promise.reject(new Error(t('modalChangePassword.validate.confirmPasswordInvalid')));
                }
                return Promise.resolve();
              },
            }),
          ]}
        >
          <Input.Password
            placeholder={t('modalChangePassword.confirmPassword')}
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
            {t('common.changePassword').toUpperCase()}
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
