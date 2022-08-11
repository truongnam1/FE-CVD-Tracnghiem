import { sendPost } from './axios';

// eslint-disable-next-line import/prefer-default-export
export const getListPublicExam = (params: any) => sendPost('/rpc/tracnghiem/exam/public-list', params);
export const getListSubjectExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-subject', params);
export const getListGradeExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-grade', params);
export const getListLevelExam = (params: any) => sendPost('/rpc/tracnghiem/exam/filter-list-exam-level', params);
export const getListStatusExam = (params: any) => sendPost('/rpc/tracnghiem/exam/single-list-exam-status', params);
export const getListStatus = (params: any) => sendPost('/rpc/tracnghiem/exam/single-list-status', params);
export const uploadImageExam = (params: any) => sendPost('/rpc/tracnghiem/exam/upload-image', params);
export const getListAllQuestion = (params: any) => sendPost('/rpc/tracnghiem/exam/list-question', params);
export const getMyListExam = (params: any) => sendPost('/rpc/tracnghiem/exam/list', params);
export const createExam = (params: any) => sendPost('/rpc/tracnghiem/exam/create', params);
export const getPublicExamDetail = (params: any) => sendPost('/rpc/tracnghiem/public-exam/get', params);
export const getListMyExam = (params: any) => sendPost('/rpc/tracnghiem/exam/list', params);
export const getCountMyExam = (params: any) => sendPost('/rpc/tracnghiem/exam/count', params);
export const deleteMyExam = (params: any) => sendPost('/rpc/tracnghiem/exam/delete', params);
export const getMyExamDetail = (params: any) => sendPost('/rpc/tracnghiem/exam/get', params);
export const updateExam = (params: any) => sendPost('/rpc/tracnghiem/exam/update', params);
