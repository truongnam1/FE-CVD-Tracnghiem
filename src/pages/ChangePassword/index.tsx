import React, { useState } from 'react';
import styles from './style.module.scss';
import { Input, Button, Form, Row, Col } from 'antd';
import { useTranslation } from 'react-i18next';
import { RuleObject } from 'antd/lib/form';
import { handleErrorMessage } from 'helper';
import { useMutation } from 'react-query';
import { changePassword } from 'api/profile';
import SideNav from 'components/SideNav';

export default function ChangePassword() {
  const { t } = useTranslation();
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const { mutate: postChangePassword } = useMutation(
    (params: ChangePasswordParamsInterface) => changePassword(params),
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
    const data: ChangePasswordParamsInterface = {
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
      confirmPassword: payload.confirmPassword,
    };

    postChangePassword(data);
  };

  return (
    <div className={styles.changePassword}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('modalChangePassword.title')}</h2>
        </Col>
      </Row>
      <Form onFinish={handleSubmit} className={styles.changePasswordForm}>
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
