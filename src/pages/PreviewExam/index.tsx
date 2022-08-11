import React, { useMemo } from 'react';
import { Button, Col, Row, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { TYPE_SHOW_QUESTION_BOX } from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import imageDefault from 'assets/images/image-default.svg';
import iconQuestion from 'assets/images/question.svg';
import iconPeople from 'assets/images/people.svg';
import iconTime from 'assets/images/clock.svg';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetExamDetailPreview } from 'hooks/useActionExam';

export default function PreviewExam() {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const params = useParams();
  const examId = Number(params.id);

  const { data: examDetail, isLoading: isLoadingExamDetail } = useGetExamDetailPreview({
    id: examId,
  });
  const listQuestion = examDetail?.examQuestionMappings?.map((questions: any) => {
    return questions?.question;
  });

  const listQuestionShow = useMemo(() => {
    return listQuestion?.map((question: QuestionDetailInterface, index: number) => (
      <CommonQuestionBox
        questionDetail={question}
        numberQuestion={index + 1}
        typeShow={TYPE_SHOW_QUESTION_BOX.PREVIEW}
      />
    ));
  }, [listQuestion]);

  return (
    <div className={styles.previewExam}>
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{examDetail?.name}</h2>
        </Col>
      </Row>
      {(isLoadingExamDetail || !examDetail) && <Spin size="large" />}
      {!isLoadingExamDetail && examDetail && (
        <Row justify="space-between" className={styles.formExam}>
          <Col span={16} className={styles.formAddExam}>
            <Row className={styles.listExamQuestion}>{listQuestionShow}</Row>
          </Col>
          <Col span={8} className={styles.formInfoExam}>
            <Row className={styles.rowUploadAvatar}>
              <img src={examDetail?.image?.url || imageDefault} className={styles.avatar} alt="Avatar" />
            </Row>
            <Row className={styles.infoExam}>
              <div className={styles.nameExam}>{examDetail?.name}</div>
              <div className={styles.infoMore}>
                <div className={styles.countInfo}>
                  <img src={iconTime} className={styles.icon} alt="time" />{' '}
                  {examDetail?.time
                    ? t('previewExam.timeExamLimit', { time: examDetail?.time })
                    : t('previewExam.timeExamNoLimit')}
                </div>
                <div className={styles.countInfo}>
                  <img src={iconQuestion} className={styles.icon} alt="countQuestion" />{' '}
                  {t('searchExam.countQuestion', { count: listQuestion?.length })}
                </div>
                <div className={styles.countInfo}>
                  <img src={iconPeople} className={styles.icon} alt="countExam" />{' '}
                  {t('searchExam.countExam', { count: examDetail?.totalNumberTest })}
                </div>
              </div>
            </Row>
            <Button
              type="primary"
              htmlType="submit"
              className={styles.btnSubmit}
              onClick={() =>
                navigate('/exam-action/' + examDetail.id, {
                  state: {
                    startTime: new Date(),
                    examDetail: examDetail,
                  },
                })
              }
            >
              {t('previewExam.start').toUpperCase()}
            </Button>
          </Col>
        </Row>
      )}
    </div>
  );
}
