import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Checkbox, Col, Form, FormInstance, Input, message, Modal, Row, Select, Spin, Upload } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';
import SideNav from 'components/SideNav';
import { ERROR_RESPONSE, EXAM_STATUS, TOKEN_CUSTOMER, TYPE_IMAGE } from 'contants/constants';
import CommonQuestionBox from 'components/CommonQuestionBox';

import iconSearch from 'assets/images/SearchFilled.svg';
import iconAdd from 'assets/images/add-white.svg';
import imageDefault from 'assets/images/image-default.svg';
import { handleErrorMessage, validateSizeImg, validateTypeImg } from 'helper';
import { UploadChangeParam } from 'antd/lib/upload';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import { AxiosError } from 'axios';
import {
  useGetListAllQuestion,
  useGetListGradeExam,
  useGetListLevelExam,
  useGetListPublicExam,
  useGetListStatus,
  useGetListStatusExam,
  useGetListSubjectExam,
  useGetPublicExamDetail,
} from 'hooks/useExam';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import Cookies from 'js-cookie';
import { createExam, updateExam, uploadImageExam } from 'api/exam';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';

const { Option } = Select;

const defaultFilter: any = {
  subject: undefined,
  grade: undefined,
  level: undefined,
  keyWord: '',
};

const fomrDataDefault: any = {
  name: '',
  subjectId: undefined,
  examLevelId: undefined,
  statusId: undefined,
  gradeId: undefined,
  examStatusId: EXAM_STATUS.DRAFT,
  time: '',
};

export default function CreateExam(props: any) {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const { myExamDetail } = props;
  const [form]: FormInstance<any>[] = Form.useForm();
  const [profile, setProfile] = useState<any>();
  const [dataForm, setDataForm] = useState<any>(fomrDataDefault);
  const [filter, setFilter] = useState<any>(defaultFilter);
  const [isModalFindQuestion, setIsModalFindQuestion] = useState<boolean>(false);
  const [listQuestionSelected, setListQuestionSelected] = useState<any[]>([]);
  const [avatarURL, setAvatarURL] = useState<string>(imageDefault);
  const [imageId, setImageId] = useState<number>(0);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);
  const [isMyQuestion, setIsMyQuestion] = useState<boolean>(false);
  const [isLoadingAvatar, setIsLoadingAvatar] = useState<boolean>(false);
  const [examSelectedId, setExamSelectedId] = useState<number>(0);
  const [listQuestionForcus, setListQuestionFocus] = useState<any>([]);
  const [examDetailEdit, setExamDetailEdit] = useState<any>(myExamDetail);

  const { mutate: uploadImage } = useMutation((params: any) => uploadImageExam(params), {
    onSuccess: (response: any) => {
      message.success('Upload ảnh thành công.');
      setAvatarURL(response.url);
      setImageId(response.id);
      setIsLoadingAvatar(false);
    },
    onError: (error) => {
      handleErrorMessage(error);
      setIsLoadingAvatar(false);
    },
  });

  const { mutate: postCreate } = useMutation((params: any) => createExam(params), {
    onSuccess: () => {
      message.success('Tạo bài thi thành công.');
      setIsLoadingSubmit(false);
      navigate('/exam');
    },
    onError: (error) => {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        form.setFields([
          {
            name: 'examName',
            errors: errorMessage.response?.data?.errors?.name ? [errorMessage.response?.data?.errors?.name] : [],
          },
          {
            name: 'gradeId',
            errors: errorMessage.response?.data?.errors?.grade ? [errorMessage.response?.data?.errors?.grade] : [],
          },
          {
            name: 'subjectId',
            errors: errorMessage.response?.data?.errors?.subject ? [errorMessage.response?.data?.errors?.subject] : [],
          },
          {
            name: 'examLevelId',
            errors: errorMessage.response?.data?.errors?.examLevel
              ? [errorMessage.response?.data?.errors?.examLevel]
              : [],
          },
          {
            name: 'statusId',
            errors: errorMessage.response?.data?.errors?.status ? [errorMessage.response?.data?.errors?.status] : [],
          },
        ]);
        if (errorMessage.response?.data?.errors?.image) {
          message.error('Vui lòng upload ảnh đề thi.');
        }
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
    },
  });

  const { mutate: postUpdate } = useMutation((params: any) => updateExam(params), {
    onSuccess: () => {
      message.success('Sửa bài thi thành công.');
      setIsLoadingSubmit(false);
      navigate('/exam');
    },
    onError: (error) => {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        form.setFields([
          {
            name: 'examName',
            errors: errorMessage.response?.data?.errors?.name ? [errorMessage.response?.data?.errors?.name] : [],
          },
          {
            name: 'gradeId',
            errors: errorMessage.response?.data?.errors?.grade ? [errorMessage.response?.data?.errors?.grade] : [],
          },
          {
            name: 'subjectId',
            errors: errorMessage.response?.data?.errors?.subject ? [errorMessage.response?.data?.errors?.subject] : [],
          },
          {
            name: 'examLevelId',
            errors: errorMessage.response?.data?.errors?.examLevel
              ? [errorMessage.response?.data?.errors?.examLevel]
              : [],
          },
          {
            name: 'statusId',
            errors: errorMessage.response?.data?.errors?.status ? [errorMessage.response?.data?.errors?.status] : [],
          },
        ]);
        if (errorMessage.response?.data?.errors?.image) {
          message.error('Vui lòng upload ảnh đề thi.');
        }
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
    },
  });

  const { data: listExam, isLoading: isLoadingExam } = useGetListPublicExam({
    subjectId: {
      equal: filter.subject,
    },
    gradeId: {
      equal: filter.grade,
    },
    examLevelId: {
      equal: filter.level,
    },
    name: {
      contain: filter.keyWord,
    },
  });
  const { data: listSubject, isLoading: isLoadingSubject } = useGetListSubjectExam({});
  const { data: listGrade, isLoading: isLoadingGrade } = useGetListGradeExam({});
  const { data: listLevel, isLoading: isLoadingLevel } = useGetListLevelExam({});
  const { data: listStatusExam, isLoading: isLoadingStatusExam } = useGetListStatusExam({});
  const { data: listStatus, isLoading: isLoadingStatus } = useGetListStatus({});
  const { data: publicExamDetail, isLoading: isLoadingPublicExamDetail } = useGetPublicExamDetail({
    id: examSelectedId,
  });

  const { data: listQuestion, isLoading: isLoadingQuestion } = useGetListAllQuestion(
    {
      creatorId: {
        equal: profile?.id,
      },
      statusId: {
        equal: 1,
      },
    },
    isMyQuestion
  );

  const handleChangeAvatar = useCallback(
    (info: UploadChangeParam<any>) => {
      setIsLoadingAvatar(true);
      if (!validateTypeImg(info.file.type, TYPE_IMAGE)) {
        message.error(t('myPageProfile.avatar.errorType'));
      } else if (!validateSizeImg(info.file.size)) {
        message.error(t('myPageProfile.avatar.errorSize'));
      } else {
        const formData: FormData = new FormData();
        formData.append('file', info?.file);
        uploadImage(formData);
      }
    },
    [t, uploadImage]
  );

  const handleDeleteAvatar = () => {
    setAvatarURL(imageDefault);
  };

  const handleChangeSubject = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        subject: value,
      });
    },
    [filter]
  );

  const handleChangeGrade = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        grade: value,
      });
    },
    [filter]
  );

  const handleChangeLevel = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        level: value,
      });
    },
    [filter]
  );

  const handleChangeKeyWord = useCallback(
    (value: string) => {
      setFilter({
        ...filter,
        keyWord: value,
      });
    },
    [filter]
  );

  const handleAddQuestion = useCallback(
    (question: QuestionDetailInterface) => {
      let findQuestion = listQuestionSelected?.find((item: any) => item.id === question.id);
      if (findQuestion) {
        message.error('Câu hỏi đã tồn tại trong đề thi.');
      } else {
        setListQuestionSelected([...listQuestionSelected, question]);
        message.success(t('createExam.addQuestionSuccess'));
      }
    },
    [listQuestionSelected, t]
  );

  const handleRemoveQuestion = useCallback(
    (question: QuestionDetailInterface) => {
      setListQuestionSelected(() =>
        listQuestionSelected.filter((item: QuestionDetailInterface) => {
          return item.id !== question.id;
        })
      );
      message.success(t('createExam.removeQuestionSuccess'));
    },
    [listQuestionSelected, t]
  );

  const handleChangeIsMyQuestion = (e: any) => {
    setIsMyQuestion(e.target.checked);
    setExamSelectedId(0);
  };

  const handleSubmit = useCallback(
    (payload: any) => {
      setIsLoadingSubmit(true);
      const examQuestionMappings = listQuestionSelected?.map((question: any) => {
        return {
          examId: 0,
          questionId: question.id,
          question: question,
        };
      });
      if (listQuestionSelected.length < 1) {
        message.error('Vui lòng chọn ít nhât 1 câu hỏi');
        setIsLoadingSubmit(false);
      } else {
        let data: any = {
          id: examDetailEdit ? examDetailEdit.id : 0,
          name: payload.examName,
          subjectId: payload.subjectId,
          examLevelId: payload.examLevelId,
          statusId: payload.statusId,
          creatorId: profile?.id,
          gradeId: payload.gradeId,
          examStatusId: payload.examStatusId,
          imageId: imageId,
          time: payload.examTime,
          subject: listSubject?.find((subject: any) => subject.id === payload.subjectId),
          examLevel: listLevel?.find((examLevel: any) => examLevel.id === payload.examLevelId),
          status: listStatus?.find((status: any) => status.id === payload.statusId),
          grade: listGrade?.find((grade: any) => grade.id === payload.gradeId),
          examStatus: listStatusExam?.find((examStatus: any) => examStatus.id === payload.examStatusId),
          examQuestionMappings: examQuestionMappings,
        };
        if (examDetailEdit) {
          data.code = examDetailEdit?.code;
          postUpdate(data);
        } else {
          postCreate(data);
        }
      }
    },
    [
      imageId,
      profile,
      listQuestionSelected,
      listGrade,
      listSubject,
      listLevel,
      listStatus,
      listStatusExam,
      postCreate,
      examDetailEdit,
      postUpdate,
    ]
  );

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([GET_CUSTOMER_PROFILE, isAuthenticated]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

  useEffect(() => {
    if (myExamDetail) {
      setExamDetailEdit(myExamDetail);
    }
  }, [myExamDetail]);

  useEffect(() => {
    if (examDetailEdit) {
      setDataForm({
        examName: examDetailEdit?.name,
        subjectId: examDetailEdit?.subjectId,
        examLevelId: examDetailEdit?.examLevelId,
        statusId: examDetailEdit?.statusId,
        gradeId: examDetailEdit?.gradeId,
        examStatusId: examDetailEdit?.examStatusId,
        examTime: examDetailEdit?.time,
      });
      setAvatarURL(examDetailEdit?.image?.url);
      setImageId(examDetailEdit?.image?.id);
      const examQuestions = examDetailEdit?.examQuestionMappings?.map((questions: any) => {
        return questions?.question;
      });
      setListQuestionSelected(examQuestions);
    }
  }, [examDetailEdit]);

  useEffect(() => {
    if (isMyQuestion) {
      setListQuestionFocus(listQuestion);
    } else if (examSelectedId && publicExamDetail) {
      const examQuestions = publicExamDetail?.examQuestionMappings?.map((questions: any) => {
        return questions?.question;
      });
      setListQuestionFocus(examQuestions || []);
    } else {
      setListQuestionFocus([]);
    }
  }, [isMyQuestion, listQuestion, examSelectedId, publicExamDetail]);

  useEffect(() => {
    if (dataForm) {
      form.resetFields();
    }
  }, [dataForm, form]);

  const optionSelectSubject = useMemo(() => {
    return listSubject?.map((subject: CategoryInterface) => (
      <Option key={'subject' + subject.id} value={subject.id}>
        {subject.name}
      </Option>
    ));
  }, [listSubject]);

  const optionSelectGrade = useMemo(() => {
    return listGrade?.map((grade: GradeInterface) => (
      <Option key={'grade' + grade.id} value={grade.id}>
        {grade.name}
      </Option>
    ));
  }, [listGrade]);

  const optionSelectLevel = useMemo(() => {
    return listLevel?.map((level: GroupQuestionInterface) => (
      <Option key={'level' + level.id} value={level.id}>
        {level.name}
      </Option>
    ));
  }, [listLevel]);

  const optionSelectStatus = useMemo(() => {
    return listStatus?.map((status: GroupQuestionInterface) => (
      <Option key={'status' + status.id} value={status.id}>
        {status.name}
      </Option>
    ));
  }, [listStatus]);

  const optionSelectStatusExam = useMemo(() => {
    return listStatusExam?.map((statusExam: GroupQuestionInterface) => (
      <Option key={'statusExam' + statusExam.id} value={statusExam.id}>
        {statusExam.name}
      </Option>
    ));
  }, [listStatusExam]);

  const listExamShow = useMemo(() => {
    return listExam?.map((exam: any) => (
      <div
        className={classNames({
          [styles.boxExam]: true,
          [styles.boxExamActive]: exam.id === examSelectedId,
        })}
        onClick={() => setExamSelectedId(exam.id)}
      >
        <img src={exam?.image?.url} alt="exam" />
        <div>{`${exam.name} (${exam.totalQuestion} câu hỏi)`}</div>
      </div>
    ));
  }, [listExam, examSelectedId]);

  const listQuestionShow = useMemo(() => {
    return listQuestionForcus?.map((question: QuestionDetailInterface) => (
      <CommonQuestionBox questionDetail={question} handleAddQuestion={() => handleAddQuestion(question)} />
    ));
  }, [listQuestionForcus, handleAddQuestion]);

  const listQuestionSelectedShow = useMemo(() => {
    return listQuestionSelected?.map((question: QuestionDetailInterface) => (
      <CommonQuestionBox questionDetail={question} handleRemoveQuestion={() => handleRemoveQuestion(question)} />
    ));
  }, [listQuestionSelected, handleRemoveQuestion]);

  return (
    <div className={styles.createExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{examDetailEdit ? 'Sửa để thi' : t('createExam.title')}</h2>
        </Col>
      </Row>
      <Row justify="space-between" className={styles.formExam}>
        <Col span={16} className={styles.formAddExam}>
          <Button
            block
            type="primary"
            htmlType="button"
            className={styles.btnAdd}
            onClick={() => setIsModalFindQuestion(true)}
          >
            {t('createExam.addQuestionNew').toUpperCase()} <img height={16} width={16} src={iconAdd} alt="Add" />
          </Button>
          <Row className={styles.listExamQuestion}>{listQuestionSelectedShow}</Row>
        </Col>
        <Col span={8} className={styles.formInfoExam}>
          <Row className={styles.rowUploadAvatar}>
            <img src={avatarURL} className={styles.avatar} alt="Avatar" />
            <Row className={styles.rowBtnUpload}>
              <Col span={12} className={styles.colBtnUpload}>
                <Upload
                  listType="picture"
                  showUploadList={false}
                  onChange={handleChangeAvatar}
                  beforeUpload={() => {
                    return false;
                  }}
                  multiple={false}
                  maxCount={1}
                  accept=".jpg,.jpeg,.png,.heic,.jfif"
                  className={styles.uploadAvatar}
                >
                  <Button type="primary" htmlType="button" className={styles.btnUpload} loading={isLoadingAvatar}>
                    {t('createExam.addImage')}
                  </Button>
                </Upload>
              </Col>
              <Col span={12} className={styles.colBtnDelete}>
                <Button
                  type="primary"
                  htmlType="button"
                  className={styles.btnDeleteAvatar}
                  onClick={handleDeleteAvatar}
                >
                  {t('createExam.removeImage')}
                </Button>
              </Col>
            </Row>
          </Row>
          <Form form={form} onFinish={handleSubmit} className={styles.examForm} initialValues={dataForm}>
            <Form.Item labelCol={{ span: 24 }} name="examName" label={t('createExam.examName')} className={styles.form}>
              <Input className={styles.input} placeholder={t('createExam.examName')} />
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }} name="examTime" label={'Thời gian thi (phút)'} className={styles.form}>
              <Input type="number" className={styles.input} placeholder={'Thời gian thi (phút)'} />
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }} label={'Chủ đề'} name="subjectId" className={styles.form}>
              <Select className={styles.select} bordered={false} loading={isLoadingSubject} placeholder={'Chủ đề'}>
                {optionSelectSubject}
              </Select>
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }} label={'Lớp'} name="gradeId" className={styles.form}>
              <Select className={styles.select} bordered={false} loading={isLoadingGrade} placeholder={'Lớp'}>
                {optionSelectGrade}
              </Select>
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }} label={'Cấp độ'} name="examLevelId" className={styles.form}>
              <Select className={styles.select} bordered={false} loading={isLoadingLevel} placeholder={'Cấp độ'}>
                {optionSelectLevel}
              </Select>
            </Form.Item>
            <Form.Item labelCol={{ span: 24 }} label={'Trạng thái công bố'} name="examStatusId" className={styles.form}>
              <Select
                placeholder={'Trạng thái công bố'}
                className={styles.select}
                loading={isLoadingStatusExam}
                bordered={false}
              >
                {optionSelectStatusExam}
              </Select>
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label={t('createExam.examStatus')}
              name="statusId"
              className={styles.form}
            >
              <Select
                placeholder={t('createExam.examStatus')}
                className={styles.select}
                loading={isLoadingStatus}
                bordered={false}
              >
                {optionSelectStatus}
              </Select>
            </Form.Item>
            <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
              {examDetailEdit ? 'SỬA ĐỀ THI' : t('createExam.create').toUpperCase()}
            </Button>
          </Form>
        </Col>
      </Row>
      <Modal
        className={styles.modalQuestion}
        visible={isModalFindQuestion}
        onCancel={() => setIsModalFindQuestion(false)}
        closable={true}
        footer={false}
        centered
      >
        <Row className={styles.formSearchQuestion}>
          <Col span={24} className={styles.colKeyWord}>
            <Input
              className={styles.input}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={'Tìm kiếm đề thi'}
              value={filter.keyWord}
              onChange={(e) => handleChangeKeyWord(e.currentTarget.value)}
            />
          </Col>
          <Col span={24} className={styles.colFilterSelect}>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingSubject}
              placeholder={t('questionForm.category')}
              onChange={handleChangeSubject}
            >
              {optionSelectSubject}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingGrade}
              placeholder={t('questionForm.grade')}
              onChange={handleChangeGrade}
            >
              {optionSelectGrade}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingLevel}
              placeholder={'Cấp độ'}
              onChange={handleChangeLevel}
            >
              {optionSelectLevel}
            </Select>
          </Col>
          <Col span={24} className={styles.colCheckbox}>
            <Checkbox onChange={handleChangeIsMyQuestion}>Chỉ lấy các câu hỏi của bạn</Checkbox>
          </Col>
          <Col span={8} className={styles.showExam}>
            <Col span={24} className={styles.showResultFindExam}>
              {t('createExam.showResultFindExam', { keyWord: filter.keyWord })}
            </Col>
            <Col span={24} className={styles.listExam}>
              {isLoadingExam && <Spin />}
              {!isLoadingExam && listExamShow}
              {!isLoadingExam && !listExamShow?.length && <div className={styles.message}>Chưa có dữ liệu đề thi.</div>}
            </Col>
          </Col>
          <Col span={16} className={styles.showQuestion}>
            {(isLoadingQuestion || isLoadingPublicExamDetail) && <Spin />}
            {!isLoadingQuestion && !isLoadingPublicExamDetail && listQuestionShow}
            {!isLoadingQuestion && !isLoadingPublicExamDetail && !listQuestionShow?.length && (
              <div className={styles.message}>Chưa có dữ liệu câu hỏi.</div>
            )}
            {!isLoadingQuestion &&
              !isLoadingPublicExamDetail &&
              !listQuestionShow?.length &&
              !examSelectedId &&
              !isMyQuestion && (
                <div className={styles.message}>Vui lòng chọn đề thi hoặc tích vào "Chỉ lấy các câu hỏi của bạn".</div>
              )}
          </Col>
        </Row>
      </Modal>
    </div>
  );
}
