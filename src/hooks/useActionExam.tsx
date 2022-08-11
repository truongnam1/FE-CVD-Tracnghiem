import { getExamDetailPreview } from 'api/actionExam';
import { GET_EXAM_DETAIL_PREVIEW } from 'contants/keyQuery';
import { useQuery } from 'react-query';

export const useGetExamDetailPreview = (params: any) => {
  const { data, isLoading } = useQuery([GET_EXAM_DETAIL_PREVIEW, params], async () => {
    const response = await getExamDetailPreview(params);
    return response;
  });
  return { data: data, isLoading };
};
