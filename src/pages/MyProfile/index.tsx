import React, { useEffect, useRef, useState } from 'react';
import { Button, Row, Col, Form, Input, FormInstance, Upload, message } from 'antd';
import Cookies from 'js-cookie';
import { useQueryClient, useIsFetching, useMutation } from 'react-query';
import { UploadChangeParam } from 'antd/lib/upload/interface';

import styles from './style.module.scss';
import { trimSpaceInput, handleErrorMessage } from 'helper';
import SideNav from 'components/SideNav';

import AvatarDefault from '../../assets/images/avatar-default.svg';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import { ERROR_RESPONSE, TOKEN_CUSTOMER } from 'contants/constants';
import { sendPost } from 'api/axios';
import { AxiosError } from 'axios';

interface IDataResponseprofile {
  message: string;
  success: boolean;
}

interface IBodyUpdateProfile {
  displayName?: string;
  imageId?: number;
}

export default function MyPageProfile() {
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();

  const [form]: FormInstance<any>[] = Form.useForm();
  const [isLoadingBtnSubmitProfile, setIsLoadingBtnSubmitProfile] = useState<boolean>(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [avatarURL, setAvatarURL] = useState<string>(AvatarDefault);
  const imageIdRef = useRef<number | undefined>(undefined);

  const { mutate: postUpdateProfile } = useMutation(
    async (body: IBodyUpdateProfile) => {
      return sendPost('rpc/tracnghiem/profile/update-limit', body);
    },
    {
      onSuccess: (response: IDataResponseprofile) => {
        message.success('Cập nhật thành công!');
        setIsLoadingBtnSubmitProfile(false);
        queryClient.refetchQueries([GET_CUSTOMER_PROFILE]);
      },
      onError: (error) => {
        const errorMessage = error as AxiosError;
        if (errorMessage.response?.status === ERROR_RESPONSE) {
          form.setFields([
            {
              name: 'displayName',
              errors: errorMessage.response?.data?.errors?.displayName
                ? [errorMessage.response?.data?.errors?.displayName]
                : [],
            },
          ]);
        } else {
          handleErrorMessage(error);
        }
        setIsLoadingBtnSubmitProfile(false);
      },
    }
  );

  const handleChangeAvatar = async (info: UploadChangeParam<any>) => {
    const formData = new FormData();
    formData.append('file', info?.file);
    setIsLoadingAvatar(true);
    sendPost('rpc/tracnghiem/profile/save-image', formData)
      .then((res) => {
        setAvatarURL(res?.url);
        imageIdRef.current = res?.id;
        setIsLoadingAvatar(false);
      })
      .catch((err) => {
        setIsLoadingAvatar(false);
        message.error(err?.response?.message);
      });
  };

  const handleDeleteAvatar = () => {
    setAvatarURL(AvatarDefault);
    imageIdRef.current = undefined;
  };

  const handleTrimSpaceInput = (e: React.FocusEvent<HTMLInputElement, Element>) => {
    form.setFieldsValue({
      [e.target.name]: trimSpaceInput(e.target.value),
    });
  };

  const handleSubmitForm = (payload: any) => {
    setIsLoadingBtnSubmitProfile(true);

    const displayName = form?.getFieldValue('displayName');

    postUpdateProfile({ displayName, imageId: imageIdRef.current });
  };

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([GET_CUSTOMER_PROFILE, isAuthenticated]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

  useEffect(() => {
    if (profile) {
      form?.setFieldsValue({ username: profile?.username, displayName: profile?.displayName, email: profile?.email });
      setAvatarURL(profile?.image?.url || AvatarDefault);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [profile]);

  return (
    <div className={styles.myPageProfile}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <h2>{'Thông tin cá nhân'}</h2>
      </Row>
      <Form
        className={styles.formProfile}
        form={form}
        // initialValues={profileForm}
        onFinish={handleSubmitForm}
        scrollToFirstError={true}
      >
        <Row className={styles.rowForm}>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.colAvatar}>
            <h3>
              <strong>{'Ảnh đại diện'}</strong>
            </h3>
            <Row className={styles.rowUploadAvatar}>
              <img src={avatarURL} className={styles.avatar} alt="Avatar" />
              <Row className={styles.rowBtnUpload}>
                <Col span={12} className={styles.colBtnUpload}>
                  <Upload
                    listType="picture"
                    showUploadList={false}
                    onChange={handleChangeAvatar}
                    beforeUpload={() => {
                      return false;
                    }}
                    multiple={false}
                    maxCount={1}
                    accept=".jpg,.jpeg,.png,.heic,.jfif,.gif"
                    className={styles.uploadAvatar}
                  >
                    <Button type="primary" htmlType="button" className={styles.btnUpload} loading={isLoadingAvatar}>
                      {'Chọn ảnh'}
                    </Button>
                  </Upload>
                </Col>
                <Col span={12} className={styles.colBtnDelete}>
                  <Button
                    type="primary"
                    htmlType="button"
                    className={styles.btnDeleteAvatar}
                    onClick={handleDeleteAvatar}
                  >
                    {'Xóa ảnh'}
                  </Button>
                </Col>
              </Row>
              {/* <div className={styles.textValidate}>{t('myPageProfile.avatar.textMb')}</div>
              <div className={styles.textValidate}>{t('myPageProfile.avatar.textType')}</div> */}
            </Row>
          </Col>

          <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.colFormProfile}>
            <Row className={styles.rowName}>
              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  className={styles.inputFormProfile}
                  colon={false}
                  name="displayName"
                  label="Tên người dùng"
                >
                  <Input
                    placeholder={'Nhập thông tin người dùng'}
                    className={styles.inputProfile}
                    name="displayName"
                    onBlur={handleTrimSpaceInput}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  className={styles.inputFormProfile}
                  colon={false}
                  name="username"
                  label="Username"
                >
                  <Input
                    disabled={true}
                    className={styles.inputProfile}
                    name="username"
                    onBlur={handleTrimSpaceInput}
                  />
                </Form.Item>
              </Col>

              <Col span={12}>
                <Form.Item
                  labelCol={{ span: 24 }}
                  className={styles.inputFormProfile}
                  colon={false}
                  name="email"
                  label="Email"
                >
                  <Input disabled={true} className={styles.inputProfile} name="email" onBlur={handleTrimSpaceInput} />
                </Form.Item>
              </Col>
            </Row>
          </Col>
        </Row>
        <Row className={styles.rowButton}>
          <Col xs={12} sm={12} md={8} lg={8} xl={8}>
            <Form.Item labelCol={{ span: 24 }}>
              <Button
                type="primary"
                htmlType="submit"
                className={styles.btnSubmitProfile}
                loading={isLoadingBtnSubmitProfile}
              >
                {'Lưu thông tin'}
              </Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
}
