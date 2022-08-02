import { sendPost } from './axios';

export const login = (payload: any) => sendPost('/rpc/tracnghiem/account/login', payload);
export const signUp = (payload: SignUpParamsInterface) => sendPost('/rpc/tracnghiem/app-user/user-create', payload);
export const forgotPassword = (payload: ForgotPasswordParamsInterface) =>
  sendPost('/rpc/tracnghiem/profile/forgot-password', payload);
