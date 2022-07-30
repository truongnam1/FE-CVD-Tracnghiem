import { sendPost } from './axios';

export const login = (payload: any) => sendPost('/v1/app/auth/login', payload);
export const signUp = (payload: any) => sendPost('/v1/app/auth/signup', payload);
