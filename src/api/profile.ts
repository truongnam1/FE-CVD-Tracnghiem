import { sendGet, sendPost, sendPut } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const loadProfile = () => sendGet('/v1/app/profile');
export const updateProfile = () => sendPut('/v1/app/profile');
export const changePassword = (payload: ChangePasswordParamsInterface) =>
  sendPost('/rpc/tracnghiem/profile/change-password', payload);
