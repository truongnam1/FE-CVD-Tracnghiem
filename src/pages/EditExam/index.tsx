import React from 'react';
import CreateExam from 'pages/CreateExam';
import { useParams } from 'react-router-dom';
import { useGetMyExamDetail } from 'hooks/useExam';
import { Spin } from 'antd';

export default function EditExam() {
  const params = useParams();
  const examId = Number(params.id);

  const { data: myExamDetail, isLoading: isLoadingMyExamDetail } = useGetMyExamDetail({
    id: examId,
  });

  return (
    <>
      {(isLoadingMyExamDetail || !myExamDetail) && <Spin size="large" />}
      {!isLoadingMyExamDetail && myExamDetail && <CreateExam myExamDetail={myExamDetail} />}
    </>
  );
}
