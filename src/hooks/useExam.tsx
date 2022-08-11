import {
  getCountMyExam,
  getListAllQuestion,
  getListGradeExam,
  getListLevelExam,
  getListMyExam,
  getListPublicExam,
  getListStatus,
  getListStatusExam,
  getListSubjectExam,
  getMyExamDetail,
  getMyListExam,
  getPublicExamDetail,
} from 'api/exam';
import {
  GET_COUNT_LIST_EXAM,
  GET_LIST_ALL_QUESTION_EXAM,
  GET_LIST_GRADE_EXAM,
  GET_LIST_LEVEL_EXAM,
  GET_LIST_PUBLIC_EXAM,
  GET_LIST_STATUS,
  GET_LIST_STATUS_EXAM,
  GET_LIST_SUBJECT_EXAM,
  GET_MY_EXAM_DETAIL,
  GET_MY_LIST_EXAM,
  GET_PUBLIC_EXAM_DETAIL,
} from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetListPublicExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_PUBLIC_EXAM, params], async () => {
    const response = await getListPublicExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListSubjectExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_SUBJECT_EXAM, params], async () => {
    const response = await getListSubjectExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListGradeExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_GRADE_EXAM, params], async () => {
    const response = await getListGradeExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListLevelExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_LEVEL_EXAM, params], async () => {
    const response = await getListLevelExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListStatusExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_STATUS_EXAM, params], async () => {
    const response = await getListStatusExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListStatus = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_STATUS, params], async () => {
    const response = await getListStatus(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListAllQuestion = (params: any, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_ALL_QUESTION_EXAM, params],
    async () => {
      const response = await getListAllQuestion(params);
      return response;
    },
    {
      enabled: enabled,
    }
  );
  return { data: data, isLoading };
};

export const useGetMyListExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_MY_LIST_EXAM, params], async () => {
    const response = await getMyListExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetPublicExamDetail = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_PUBLIC_EXAM_DETAIL, params],
    async () => {
      const response = await getPublicExamDetail(params);
      return response;
    },
    {
      enabled: !!params?.id,
    }
  );
  return { data: data, isLoading };
};

export const useGetListMyExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_MY_LIST_EXAM, params], async () => {
    const response = await getListMyExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetCountMyExam = (params: any) => {
  const { data, isLoading } = useQuery([GET_COUNT_LIST_EXAM, params], async () => {
    const response = await getCountMyExam(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetMyExamDetail = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_MY_EXAM_DETAIL, params],
    async () => {
      const response = await getMyExamDetail(params);
      return response;
    },
    {
      enabled: !!params?.id,
    }
  );
  return { data: data, isLoading };
};
