import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Form, Row, Select, FormInstance, Input, Button, message, Spin } from 'antd';
import { useTranslation } from 'react-i18next';

import styles from './style.module.scss';
import { ERROR_RESPONSE, MAX_LENGTH_INPUT, QUESTION_STATUS, QUESTION_TYPE, TOKEN_CUSTOMER } from 'contants/constants';
import TextArea from 'antd/lib/input/TextArea';

import IconAdd from '../../assets/images/icon-add.svg';
import IconDelete from '../../assets/images/icon-delete.svg';
import {
  useGetListGradeQuestion,
  useGetListGroupQuestion,
  useGetListStatustQuestion,
  useGetListSubjectQuestion,
  useGetListTypeQuestion,
  useGetQuestionDetail,
} from 'hooks/useQuestion';
import { GET_CUSTOMER_PROFILE, GET_LIST_QUESTION } from 'contants/keyQuery';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import Cookies from 'js-cookie';
import { createQuestion, updateQuestion } from 'api/question';
import { AxiosError } from 'axios';
import { handleErrorMessage } from 'helper';

const { Option } = Select;

interface CommonQuestionFormProps {
  hideQuestionForm: () => void;
  questionSelectedId?: number;
}

const formItemLayout = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 4 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 24 },
  },
};

const defaultFormValue: InitialValueQuestionFormInterface = {
  type: QUESTION_TYPE.PICK_ONE,
  category: undefined,
  grade: undefined,
  group: undefined,
  status: QUESTION_STATUS.ACTIVE,
  content: '',
  checkOptions: [undefined, undefined, undefined, undefined],
  options: [undefined, undefined, undefined, undefined],
};

export default function CommonQuestionForm(props: CommonQuestionFormProps) {
  const { t } = useTranslation();
  const { hideQuestionForm, questionSelectedId } = props;
  const { data: questionDetail, isLoading: isLoadingQuestionDetail } = useGetQuestionDetail({
    id: questionSelectedId,
  });

  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();
  const [form]: FormInstance<any>[] = Form.useForm();
  const [checkedOptions, setCheckedOptions] = useState<number[]>([]);
  const [formData, setFormData] = useState<InitialValueQuestionFormInterface>(defaultFormValue);
  const [typeOption, setTypeOption] = useState<number>(QUESTION_TYPE.PICK_ONE);
  const [isLoadingSubmit, setIsLoadingSubmit] = useState<boolean>(false);

  const { data: listType, isLoading: isLoadingListType } = useGetListTypeQuestion({});
  const { data: listSubject, isLoading: isLoadingListSubject } = useGetListSubjectQuestion({});
  const { data: listGrade, isLoading: isLoadingListGrade } = useGetListGradeQuestion({});
  const { data: listGroup, isLoading: isLoadingListGroup } = useGetListGroupQuestion({});
  const { data: listStatus, isLoading: isLoadingListStatus } = useGetListStatustQuestion({});

  const { mutate: postCreate } = useMutation((params: any) => createQuestion(params), {
    onSuccess: () => {
      message.success('Tạo câu hỏi thành công.');
      form.resetFields();
      queryClient.refetchQueries([GET_LIST_QUESTION]);
      hideQuestionForm();
      setIsLoadingSubmit(false);
    },
    onError: (error) => {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        form.setFields([
          {
            name: 'grade',
            errors: errorMessage.response?.data?.errors?.grade ? [errorMessage.response?.data?.errors?.grade] : [],
          },
          {
            name: 'content',
            errors: errorMessage.response?.data?.errors?.content ? [errorMessage.response?.data?.errors?.content] : [],
          },
          {
            name: 'group',
            errors: errorMessage.response?.data?.errors?.questionGroup
              ? [errorMessage.response?.data?.errors?.questionGroup]
              : [],
          },
          {
            name: 'category',
            errors: errorMessage.response?.data?.errors?.subject ? [errorMessage.response?.data?.errors?.subject] : [],
          },
        ]);
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
    },
  });

  const { mutate: updateCreate } = useMutation((params: any) => updateQuestion(params), {
    onSuccess: () => {
      message.success('Cập nhật câu hỏi thành công.');
      queryClient.refetchQueries([GET_LIST_QUESTION]);
      hideQuestionForm();
      setIsLoadingSubmit(false);
    },
    onError: (error) => {
      const errorMessage = error as AxiosError;
      if (errorMessage.response?.status === ERROR_RESPONSE) {
        form.setFields([
          {
            name: 'grade',
            errors: errorMessage.response?.data?.errors?.grade ? [errorMessage.response?.data?.errors?.grade] : [],
          },
          {
            name: 'content',
            errors: errorMessage.response?.data?.errors?.content ? [errorMessage.response?.data?.errors?.content] : [],
          },
          {
            name: 'group',
            errors: errorMessage.response?.data?.errors?.questionGroup
              ? [errorMessage.response?.data?.errors?.questionGroup]
              : [],
          },
          {
            name: 'category',
            errors: errorMessage.response?.data?.errors?.subject ? [errorMessage.response?.data?.errors?.subject] : [],
          },
        ]);
      } else {
        handleErrorMessage(error);
      }
      setIsLoadingSubmit(false);
    },
  });

  const handleChangeTypeQuestion = (value: number) => {
    setTypeOption(value);
    setCheckedOptions([]);
  };

  const handleChangeCheckOptions = useCallback(
    (index: number) => {
      if (typeOption === QUESTION_TYPE.PICK_ONE) {
        setCheckedOptions([index]);
      } else if (typeOption === QUESTION_TYPE.MULTI_PICK) {
        setCheckedOptions([...checkedOptions, index]);
      }
    },
    [typeOption, checkedOptions]
  );

  const handleSubmitAddQuestion = useCallback(
    (payload: any) => {
      if (checkedOptions.length < 1) {
        message.error('Vui lòng chọn phương án đúng.');
        return;
      }
      setIsLoadingSubmit(true);
      const questionContents = payload.options.map((question: any, index: number) => {
        return {
          answerContent: question.option,
          isRight: checkedOptions.includes(index),
        };
      });
      const data = {
        id: questionSelectedId ? questionSelectedId : 0,
        subjectId: payload.category,
        questionGroupId: payload.group,
        questionTypeId: payload.type,
        content: payload.content,
        statusId: payload.status,
        creatorId: profile?.id,
        gradeId: payload.grade,
        grade: listGrade.find((grade: any) => grade.id === payload.grade),
        questionGroup: listGroup.find((group: any) => group.id === payload.group),
        questionType: listType.find((type: any) => type.id === payload.type),
        status: listStatus.find((status: any) => status.id === payload.status),
        subject: listSubject.find((category: any) => category.id === category.status),
        questionContents: questionContents,
      };
      if (questionSelectedId) {
        updateCreate(data);
      } else {
        postCreate(data);
      }
    },
    [
      profile,
      checkedOptions,
      listGrade,
      listGroup,
      listType,
      listStatus,
      listSubject,
      postCreate,
      updateCreate,
      questionSelectedId,
    ]
  );

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([GET_CUSTOMER_PROFILE, isAuthenticated]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

  useEffect(() => {
    if (questionDetail) {
      // eslint-disable-next-line
      const checkOption = questionDetail.questionContents.map((option: any, index: number) => {
        if (option.isRight) {
          setCheckedOptions((prevState: any) => [...prevState, index]);
          return undefined;
        }
      });
      const options = questionDetail.questionContents.map((option: any) => {
        return {
          option: option.answerContent,
        };
      });
      setTypeOption(questionDetail.questionTypeId);
      setFormData({
        type: questionDetail.questionTypeId,
        category: questionDetail.subjectId,
        grade: questionDetail.gradeId,
        group: questionDetail.questionGroupId,
        status: questionDetail.statusId,
        content: questionDetail.content,
        checkOptions: checkOption,
        options: options,
      });
    }
  }, [questionDetail]);

  useEffect(() => {
    form.resetFields();
  }, [form, formData]);

  useEffect(() => {
    if (!questionSelectedId) {
      setFormData(defaultFormValue);
    }
    setCheckedOptions([]);
  }, [questionSelectedId]);

  const optionSelectType = useMemo(() => {
    return listType?.map((type: TypeQuestionInterface) => (
      <Option key={'type' + type.id} value={type.id}>
        {type.name}
      </Option>
    ));
  }, [listType]);

  const optionSelectCategory = useMemo(() => {
    return listSubject?.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id}>
        {category.name}
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

  const optionSelectGroup = useMemo(() => {
    return listGroup?.map((group: GroupQuestionInterface) => (
      <Option key={'group' + group.id} value={group.id}>
        {group.name}
      </Option>
    ));
  }, [listGroup]);

  const optionSelectStatus = useMemo(() => {
    return listStatus?.map((status: GroupQuestionInterface) => (
      <Option key={'status' + status.id} value={status.id}>
        {status.name}
      </Option>
    ));
  }, [listStatus]);

  return (
    <Row justify="center" className={styles.mainForm}>
      <Row justify="center">
        <h2>{questionSelectedId ? t('questionForm.editQuestion') : t('questionForm.addQuestion')}</h2>
      </Row>
      {isLoadingQuestionDetail && <Spin size="large" />}
      {!isLoadingQuestionDetail && (
        <Form
          form={form}
          initialValues={formData}
          onFinish={handleSubmitAddQuestion}
          hideRequiredMark
          className={styles.groupForm}
        >
          <Row className={styles.formSelect}>
            <Form.Item
              name="type"
              label={t('questionForm.typeQuestion')}
              className={styles.form}
              labelCol={{ span: 24 }}
            >
              <Select
                className={styles.select}
                bordered={false}
                loading={isLoadingListType}
                placeholder={t('questionForm.typeQuestion')}
                onChange={handleChangeTypeQuestion}
              >
                {optionSelectType}
              </Select>
            </Form.Item>
            <Form.Item
              name="category"
              label={t('questionForm.category')}
              className={styles.form2}
              labelCol={{ span: 24 }}
            >
              <Select
                className={styles.select}
                bordered={false}
                loading={isLoadingListSubject}
                placeholder={t('questionForm.category')}
              >
                {optionSelectCategory}
              </Select>
            </Form.Item>
          </Row>
          <Row className={styles.formSelect}>
            <Form.Item name="grade" label={t('questionForm.grade')} className={styles.form} labelCol={{ span: 24 }}>
              <Select
                className={styles.select}
                bordered={false}
                loading={isLoadingListGrade}
                placeholder={t('questionForm.grade')}
              >
                {optionSelectGrade}
              </Select>
            </Form.Item>
            <Form.Item
              name="group"
              label={t('questionForm.groupQuestion')}
              className={styles.form2}
              labelCol={{ span: 24 }}
            >
              <Select
                className={styles.select}
                bordered={false}
                loading={isLoadingListGroup}
                placeholder={t('questionForm.groupQuestion')}
              >
                {optionSelectGroup}
              </Select>
            </Form.Item>
          </Row>
          <Form.Item name="content" label={t('questionForm.content')} className={styles.form} labelCol={{ span: 24 }}>
            <TextArea
              placeholder={t('questionForm.hereQuestionContent')}
              autoSize={{ minRows: 5, maxRows: 5 }}
              maxLength={MAX_LENGTH_INPUT}
              className={styles.input}
            />
          </Form.Item>
          <Row className={styles.formListOption}>
            <Form.List
              name="options"
              rules={[
                {
                  validator: async (_, names) => {
                    if (!names || names.length < 2) {
                      return Promise.reject(new Error('Phải có ít nhất 2 phương án.'));
                    }
                  },
                },
              ]}
            >
              {(fields, { add, remove }, { errors }) => (
                <>
                  {fields.map((field, index, ...resetField) => (
                    <div key={field.key} className={styles.formOption}>
                      {typeOption === QUESTION_TYPE.PICK_ONE && (
                        <Form.Item
                          name={[field.name, 'checkOption']}
                          className={styles.formCheck}
                          style={{ width: '10%' }}
                          {...resetField}
                          fieldKey={[field.key, 'checkOption']}
                        >
                          <Input
                            onChange={() => handleChangeCheckOptions(index)}
                            className={styles.radioBtn}
                            value={index}
                            type="radio"
                            name="checkOption"
                            checked={checkedOptions.includes(index)}
                            id={`${field.key}`}
                          />
                        </Form.Item>
                      )}
                      {typeOption === QUESTION_TYPE.MULTI_PICK && (
                        <Form.Item
                          name={[field.name, 'checkOption']}
                          className={styles.formCheck}
                          style={{ width: '10%' }}
                          {...resetField}
                          fieldKey={[field.key, 'checkOption']}
                        >
                          <Input
                            onChange={() => handleChangeCheckOptions(index)}
                            className={styles.radioBtn}
                            value={index}
                            type="checkbox"
                            name="checkOption"
                            checked={checkedOptions.includes(index)}
                            id={`${field.key}`}
                          />
                        </Form.Item>
                      )}
                      <Form.Item {...formItemLayout} className={styles.formInput} style={{ width: '90%' }}>
                        <Form.Item
                          {...field}
                          name={[field.name, 'option']}
                          {...resetField}
                          className={styles.form}
                          rules={[{ required: true, message: 'Vui lòng nhập phương án' }]}
                        >
                          <Input
                            placeholder={t('questionForm.option', { number: index + 1 })}
                            className={styles.input}
                          />
                        </Form.Item>
                        {fields.length > 1 ? (
                          <img
                            height={24}
                            width={24}
                            src={IconDelete}
                            alt="delete"
                            onClick={() => remove(field.name)}
                          />
                        ) : null}
                      </Form.Item>
                    </div>
                  ))}
                  <Form.Item>
                    {fields.length < 10 && (
                      <Button
                        onClick={() => {
                          if (fields.length >= 10) return;
                          add();
                        }}
                        className={styles.btnAddOption}
                        icon={<img height={16} width={16} src={IconAdd} alt="add" />}
                      >
                        {t('questionForm.addOption')}
                      </Button>
                    )}
                    <Form.ErrorList errors={errors} />
                  </Form.Item>
                </>
              )}
            </Form.List>
          </Row>
          <Form.Item name="status" label={t('myQuestion.status')} className={styles.form} labelCol={{ span: 24 }}>
            <Select
              placeholder={t('myQuestion.status')}
              loading={isLoadingListStatus}
              className={styles.select}
              bordered={false}
            >
              {optionSelectStatus}
            </Select>
          </Form.Item>
          <Form.Item labelCol={{ span: 24 }} className={styles.form}>
            <Button block type="primary" htmlType="submit" className={styles.btnSubmit} loading={isLoadingSubmit}>
              {t('common.save').toUpperCase()}
            </Button>
          </Form.Item>
        </Form>
      )}
    </Row>
  );
}
