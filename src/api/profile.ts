import { sendGet, sendPut } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const loadProfile = () => sendGet('/v1/app/profile');
export const updateProfile = () => sendPut('/v1/app/profile');
