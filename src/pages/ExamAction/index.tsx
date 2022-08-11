import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, message, Modal, Row } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import { ERROR_RESPONSE, TYPE_SHOW_QUESTION_BOX } from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import imageDefault from 'assets/images/image-default.svg';
import iconTime from 'assets/images/clock.svg';
import CountDownTime from 'components/CountDownTime';
import classNames from 'classnames';
import { useLocation, useNavigate } from 'react-router-dom';
import { AxiosError } from 'axios';
import { handleErrorMessage } from 'helper';
import { submitExam } from 'api/actionExam';
import { useMutation } from 'react-query';

const { confirm } = Modal;

export default function ExamAction() {
  const { t } = useTranslation();
  const { state }: any = useLocation();
  const navigate = useNavigate();
  const [questionShowIndex, setQuestionShowIndex] = useState<number>(1);
  const [timeRemain, setTimeRemain] = useState<number>(Math.floor(new Date().getTime() / 1000));
  const [examState, setExamState] = useState<any>(state?.examDetail);
  const [listQuestion, setListQuestion] = useState<any>([]);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [successExam, setSuccessExam] = useState<boolean>(false);
  const [totalMark, setTotalMark] = useState<number>(0);

  const { mutate: submitPost } = useMutation((params: any) => submitExam(params), {
    onSuccess: (response: any) => {
      message.success('Nộp bài thi thành công.');
      setIsLoadingSubmit(false);
      setSuccessExam(true);
      setTotalMark(response?.mark);
    },
    onError: (error) => {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        console.log(errorMessage.response?.data?.errors);
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
      setSuccessExam(true);
    },
  });

  const handleSubmitExam = useCallback(() => {
    confirm({
      title: (
        <>
          <div>Bạn thật sự muốn nộp bài thi ?</div>
        </>
      ),
      okText: t('common.btnOk'),
      cancelText: t('common.btnCancel'),
      icon: <></>,
      className: 'modal-confirm-normal',
      centered: true,
      onOk() {
        setIsLoadingSubmit(true);
        submitPost(examState);
      },
    });
  }, [examState, submitPost, t]);

  const handleRedirectSucssess = () => {
    navigate('/exam-history');
  };

  useEffect(() => {
    if (examState) {
      if (examState?.time) {
        setTimeRemain(
          examState?.time * 60 -
            (Math.floor(new Date().getTime() / 1000) - Math.floor(state?.startTime.getTime() / 1000))
        );
      } else {
        setTimeRemain(9999999999999999999999999999);
      }
    }
  }, [examState, state]);

  const questionNumberShow = useMemo(() => {
    return listQuestion?.map((question: QuestionDetailInterface, index: number) => (
      <div
        className={classNames({
          [styles.questionNumber]: true,
          [styles.questionNumberActive]: index + 1 === questionShowIndex,
        })}
        onClick={() => setQuestionShowIndex(index + 1)}
      >
        {index + 1}
      </div>
    ));
  }, [listQuestion, questionShowIndex]);

  useEffect(() => {
    if (timeRemain === 0) {
      setIsLoadingSubmit(true);
      submitPost(examState);
    }
  }, [timeRemain, submitPost, examState]);

  useEffect(() => {
    // window.history.pushState(
    //   {
    //     startTime: state?.startTime,
    //     examDetail: examState,
    //   },
    //   document.title
    // );
    if (examState) {
      const listQuestions = examState?.examQuestionMappings?.map((questions: any) => {
        return questions?.question;
      });
      setListQuestion(listQuestions);
    }
  }, [examState, state]);

  return (
    <div className={styles.examAction}>
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{examState?.name}</h2>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.formExam}>
        <Col span={16} className={styles.formAddExam}>
          <Row className={styles.listExamQuestion}>
            {listQuestion?.map(
              (question: QuestionDetailInterface, index: number) =>
                questionShowIndex === index + 1 && (
                  <CommonQuestionBox
                    questionDetail={question}
                    numberQuestion={index + 1}
                    typeShow={TYPE_SHOW_QUESTION_BOX.EXAM}
                    setExamState={setExamState}
                  />
                )
            )}
          </Row>
        </Col>
        <Col span={8} className={styles.formInfoExam}>
          <Row className={styles.rowUploadAvatar}>
            <img src={examState?.image?.url || imageDefault} className={styles.avatar} alt="Avatar" />
          </Row>
          <Row className={styles.infoExam}>
            <div className={styles.nameExam}>{examState?.name}</div>
            <div className={styles.infoMore}>
              <div className={styles.countInfo}>
                <img src={iconTime} className={styles.icon} alt="countQuestion" />{' '}
                {examState?.time && !successExam ? (
                  <CountDownTime timeRemain={timeRemain} setTimeRemain={setTimeRemain} />
                ) : (
                  t('previewExam.timeExamNoLimit')
                )}
              </div>
            </div>
          </Row>
          <Row className={styles.listQuestionNumber}>{questionNumberShow}</Row>
          <Button
            type="primary"
            htmlType="button"
            className={styles.btnSubmit}
            onClick={handleSubmitExam}
            loading={isLoadingSubmit}
          >
            {t('examAction.btnSubmit').toUpperCase()}
          </Button>
        </Col>
      </Row>
      <Modal className={styles.modalSuccess} visible={successExam} closable={false} centered={true} footer={false}>
        <div className={styles.title}>
          <strong>Chúc mừng bạn đã hoàn thành bài thi</strong>
          <strong>Số điểm của bạn là: {totalMark}</strong>
        </div>
        <div className={styles.button}>
          <Button type="primary" htmlType="button" onClick={handleRedirectSucssess} className={styles.buttonOk}>
            {t('common.btnOk')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
