import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListHistoryExam = (params: any) => sendPost('/rpc/tracnghiem/exam-history/list', params);
export const getCountHistoryExam = (params: any) => sendPost('/rpc/tracnghiem/exam-history/count', params);
