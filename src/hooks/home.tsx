import { sendPost } from 'api/axios';
import { GET_CATEGORY, GET_COUNT_PUBLIC_EXAM, GET_LIST_EXAM, GET_SINGLE_LIST } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetCategory = () => {
  const { data } = useQuery([GET_CATEGORY], async () => {
    const response = await sendPost('rpc/tracnghiem/exam/filter-list-subject', {});
    return response;
  });
  return data;
};

export const useGetSingleSubject = () => {
  const { data, isLoading } = useQuery([GET_SINGLE_LIST], async () => {
    const response = await sendPost('rpc/tracnghiem/subject/list', {});
    return response;
  });
  return { data, isLoading };
};

export enum ESort {
  DESC = 0,
  ASC,
}
export interface IBodyListExam {
  search?: string;
  subjectId?: { equal: number };
  orderBy?: number;
  orderType?: ESort;
  skip?: number;
  take?: number;
}
export const useGetListExam = (body: IBodyListExam) => {
  const { data, isLoading } = useQuery([GET_LIST_EXAM, body], async () => {
    const response = await sendPost('rpc/tracnghiem/public-exam/list', body);
    return response;
  });
  return { data, isLoading };
};

export const useGetCountPublicExam = (body: IBodyListExam) => {
  const { data, isLoading } = useQuery([GET_COUNT_PUBLIC_EXAM, body], async () => {
    const response = await sendPost('rpc/tracnghiem/public-exam/count', body);
    return response;
  });
  return { data, isLoading };
};
