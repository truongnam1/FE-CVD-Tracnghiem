import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getExamDetailPreview = (params: any) => sendPost('/rpc/tracnghiem/exam/get-detail-exam', params);
export const submitExam = (params: any) => sendPost('/rpc/tracnghiem/exam/submit-exam', params);
