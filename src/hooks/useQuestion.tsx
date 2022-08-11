import {
  getCountQuestions,
  getListContentQuestion,
  getListGradeQuestion,
  getListGroupQuestion,
  getListQuestion,
  getListStatusQuestion,
  getListSubjectQuestion,
  getListTypeQuestion,
  getQuestionDetail,
} from 'api/question';
import {
  GET_COUNT_QUESTION,
  GET_LIST_CONTENT_QUESTION,
  GET_LIST_GRADE_QUESTION,
  GET_LIST_GROUP_QUESTION,
  GET_LIST_QUESTION,
  GET_LIST_STATUS_QUESTION,
  GET_LIST_SUBJECT_QUESTION,
  GET_LIST_TYPE_QUESTION,
  GET_QUESTION_DETAIL,
} from 'contants/keyQuery';
import { isNumber } from 'lodash';
import { useQuery } from 'react-query';

export const useGetListGradeQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_GRADE_QUESTION], async () => {
    const response = await getListGradeQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListSubjectQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_SUBJECT_QUESTION], async () => {
    const response = await getListSubjectQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListGroupQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_GROUP_QUESTION], async () => {
    const response = await getListGroupQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListContentQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_CONTENT_QUESTION], async () => {
    const response = await getListContentQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListStatustQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_STATUS_QUESTION], async () => {
    const response = await getListStatusQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetListTypeQuestion = (params: any) => {
  const { data, isLoading } = useQuery([GET_LIST_TYPE_QUESTION], async () => {
    const response = await getListTypeQuestion(params);
    return response;
  });
  return { data: data, isLoading };
};

export const useGetQuestionDetail = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_QUESTION_DETAIL, params],
    async () => {
      const response = await getQuestionDetail(params);
      return response;
    },
    {
      enabled: !!params?.id && isNumber(params?.id),
    }
  );
  return { data: data, isLoading };
};

export const useListQuestion = (params: any, enabled?: boolean) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_QUESTION, params],
    async () => {
      const response = await getListQuestion(params);
      return response;
    },
    {
      enabled: enabled,
    }
  );
  return { data: data, isLoading };
};

export const useGetCountQuestions = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_COUNT_QUESTION, params],
    async () => {
      const response = await getCountQuestions(params);
      return response;
    },
    {
      enabled: !!params?.creatorId?.equal && isNumber(params?.creatorId?.equal),
    }
  );
  return { data: data, isLoading };
};
