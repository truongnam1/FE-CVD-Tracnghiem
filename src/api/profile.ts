import { sendPost, sendPut } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const loadProfile = () => sendPost('/rpc/tracnghiem/profile/get');
export const updateProfile = () => sendPut('/v1/app/profile');
export const changePassword = (payload: ChangePasswordParamsInterface) =>
  sendPost('/rpc/tracnghiem/profile/change-password', payload);
