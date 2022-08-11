import { getCountHistoryExam, getListHistoryExam } from 'api/examHistory';
import { GET_COUNT_HISTORY_EXAM, GET_LIST_HISTORY_EXAM } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetHistoryExam = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_LIST_HISTORY_EXAM, params],
    async () => {
      const response = await getListHistoryExam(params);
      return response;
    },
    {
      enabled: !!params.appUserId.equal,
    }
  );
  return { data: data, isLoading };
};

export const useCountHistoryExam = (params: any) => {
  const { data, isLoading } = useQuery(
    [GET_COUNT_HISTORY_EXAM, params],
    async () => {
      const response = await getCountHistoryExam(params);
      return response;
    },
    {
      enabled: !!params.appUserId.equal,
    }
  );
  return { data: data, isLoading };
};
