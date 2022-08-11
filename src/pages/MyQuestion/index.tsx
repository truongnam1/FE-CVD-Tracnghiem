import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Col, Input, message, Modal, Pagination, Popover, Row, Select, Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

import iconMore from 'assets/images/more.svg';
import iconSearch from 'assets/images/SearchFilled.svg';
import iconAdd from 'assets/images/add-white.svg';
import iconActive from 'assets/images/active.svg';
import iconInactive from 'assets/images/inactive.svg';
import CommonQuestionForm from 'components/CommonQuestionForm';
import { QUESTION_STATUS, TOKEN_CUSTOMER } from 'contants/constants';
import SideNav from 'components/SideNav';
import { useGetCountQuestions, useGetListGroupQuestion, useListQuestion } from 'hooks/useQuestion';
import { GET_CUSTOMER_PROFILE, GET_LIST_QUESTION } from 'contants/keyQuery';
import Cookies from 'js-cookie';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import { handleErrorMessage } from 'helper';
import { deleteQuestion } from 'api/question';

const { Option } = Select;

const defaultFilter: IFilterListQuestion = {
  status: undefined,
  group: undefined,
  keyWord: '',
  page: 1,
  per_page: 10,
};

export default function MyQuestion() {
  const { t } = useTranslation();
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();
  const [filter, setFilter] = useState<IFilterListQuestion>(defaultFilter);
  const [isModalAddQuestionVisible, setIsModalAddQuestionVisible] = useState<boolean>(false);
  const [questionSelectedId, setQuestionSelectedId] = useState<number>();
  const [inputFind, setInputFind] = useState<string>('');
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number>(0);

  const { mutate: deletePost } = useMutation((params: any) => deleteQuestion(params), {
    onSuccess: () => {
      message.success('Xóa câu hỏi thành công.');
      queryClient.refetchQueries([GET_LIST_QUESTION]);
      setIsLoadingDelete(false);
      setIsModalDeleteVisible(false);
    },
    onError: (error) => {
      handleErrorMessage(error);
      setIsLoadingDelete(false);
      setIsModalDeleteVisible(false);
    },
  });

  const { data: listGroup, isLoading: isLoadingListGroup } = useGetListGroupQuestion({});
  const { data: listQuestion, isLoading: isLoadingQuestion } = useListQuestion({
    skip: (filter.page - 1) * 10,
    take: 10,
    creatorId: {
      equal: profile?.id,
    },
    search: filter.keyWord,
    questionGroupId: {
      equal: filter.group,
    },
    statusId: {
      equal: filter.status,
    },
  });

  const { data: countQuestions } = useGetCountQuestions({
    creatorId: {
      equal: profile?.id,
    },
    search: filter.keyWord,
    questionGroupId: {
      equal: filter.group,
    },
    statusId: {
      equal: filter.status,
    },
  });

  const handleEditQuestion = (value: number) => {
    setQuestionSelectedId(value);
    setIsModalAddQuestionVisible(true);
  };

  const handleAddQuestion = () => {
    setQuestionSelectedId(undefined);
    setIsModalAddQuestionVisible(true);
  };

  const handleSubmitModalDelete = useCallback(() => {
    setIsLoadingDelete(true);
    deletePost({
      id: deleteQuestionId,
    });
  }, [deleteQuestionId, deletePost]);

  const handleCancelModalDelete = () => {
    setIsModalDeleteVisible(false);
  };

  const handleDeleteQuestion = useCallback((id: number) => {
    if (id) {
      setDeleteQuestionId(id);
      setIsModalDeleteVisible(true);
    }
  }, []);

  const dataSource: IDataColumnTableQuestion[] | undefined = useMemo(() => {
    return listQuestion?.map((question: any, index: number) => ({
      key: index + 1 + (filter.page - 1) * 10,
      id: index + 1 + (filter.page - 1) * 10,
      code: question.code,
      content: question.content,
      group: question?.questionGroup?.name,
      createdAt: dayjs(question.createdAt).format('YYYY/MM/DD'),
      updatedAt: dayjs(question.updatedAt).format('YYYY/MM/DD'),
      status: (
        <div className={styles.divStatus}>
          <img
            height={24}
            width={24}
            src={question?.status?.id === QUESTION_STATUS.ACTIVE ? iconActive : iconInactive}
            alt="More"
          />{' '}
          {question?.status?.name}
        </div>
      ),
      handle: (
        <Popover
          content={
            <div className={styles.popoverMore}>
              <p className={styles.popoverEdit} onClick={() => handleEditQuestion(question.id)}>
                {t('common.edit')}
              </p>
              <p className={styles.popoverDelete} onClick={() => handleDeleteQuestion(question.id)}>
                {t('common.delete')}
              </p>
            </div>
          }
        >
          <img height={24} width={24} src={iconMore} alt="More" />
        </Popover>
      ),
    }));
    // eslint-disable-next-line
  }, [listQuestion, filter, t]);

  const columns: IColumnTable[] = [
    {
      title: <strong>{t('myQuestion.id')}</strong>,
      dataIndex: 'id',
      key: 'id',
      className: styles.indexColumn,
    },
    {
      title: <strong>{t('myQuestion.code')}</strong>,
      dataIndex: 'code',
      key: 'code',
      className: styles.codeColumn,
    },
    {
      title: <strong>{t('myQuestion.content')}</strong>,
      dataIndex: 'content',
      key: 'content',
      className: styles.contentColumn,
    },
    {
      title: <strong>{t('myQuestion.group')}</strong>,
      dataIndex: 'group',
      key: 'group',
      className: styles.groupColumn,
    },
    {
      title: <strong>{t('myQuestion.createdAt')}</strong>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: styles.createdAtColumn,
    },
    {
      title: <strong>{t('myQuestion.updatedAt')}</strong>,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      className: styles.updatedAtColumn,
    },
    {
      title: <strong>{t('myQuestion.status')}</strong>,
      dataIndex: 'status',
      key: 'status',
      className: styles.statusColumn,
    },
    {
      dataIndex: 'handle',
      key: 'handle',
      className: styles.handleColumn,
    },
  ];

  const handleChangeStatus = useCallback(
    (selectedValue: number) => {
      setFilter({
        ...filter,
        page: 1,
        status: selectedValue,
      });
    },
    [filter]
  );

  const handleChangeGroup = useCallback(
    (selectedValue: number) => {
      setFilter({
        ...filter,
        page: 1,
        group: selectedValue,
      });
    },
    [filter]
  );

  const handleChangeKeyWord = useCallback(() => {
    setFilter({
      ...filter,
      page: 1,
      keyWord: inputFind,
    });
  }, [filter, inputFind]);

  const handleChangePage = useCallback(
    (page: number) => {
      setFilter({ ...filter, page });
    },
    [filter]
  );

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([GET_CUSTOMER_PROFILE, isAuthenticated]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

  const optionSelectGroup = useMemo(() => {
    return listGroup?.map((group: GroupQuestionInterface) => (
      <Option key={'group' + group.id} value={group.id}>
        {group.name}
      </Option>
    ));
  }, [listGroup]);

  return (
    <div className={styles.myQuestion}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('myQuestion.listQuestion')}</h2>
        </Col>
        <Col span={24} className={styles.colFilterAdd}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.colFilter}>
            <Select
              value={filter.status}
              placeholder={t('myQuestion.status')}
              className={styles.select}
              bordered={false}
              onChange={handleChangeStatus}
              allowClear
            >
              <Option
                value={QUESTION_STATUS.ACTIVE}
                selected={filter.status === QUESTION_STATUS.ACTIVE}
                key={'optionStatus' + QUESTION_STATUS.ACTIVE}
              >
                {t('myQuestion.active')}
              </Option>
              <Option
                value={QUESTION_STATUS.INACTIVE}
                selected={filter.status === QUESTION_STATUS.INACTIVE}
                key={'optionStatus' + QUESTION_STATUS.INACTIVE}
              >
                {t('myQuestion.inactive')}
              </Option>
            </Select>
            <Select
              value={filter.group}
              className={styles.select}
              bordered={false}
              onChange={handleChangeGroup}
              loading={isLoadingListGroup}
              placeholder={t('myQuestion.group')}
              allowClear
            >
              {optionSelectGroup}
            </Select>
            <Input
              className={styles.input}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={t('myQuestion.find')}
              value={inputFind}
              onChange={(e) => setInputFind(e.currentTarget.value)}
              onBlur={handleChangeKeyWord}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.colBtn}>
            <Button block type="primary" htmlType="button" className={styles.btnAdd} onClick={handleAddQuestion}>
              {t('common.addNew').toUpperCase()} <img height={16} width={16} src={iconAdd} alt="Add" />
            </Button>
          </Col>
        </Col>
      </Row>
      {!isLoadingQuestion && (
        <Table
          className={styles.table}
          bordered={false}
          dataSource={dataSource}
          columns={columns}
          pagination={false}
          scroll={{ x: !!dataSource?.length ? true : undefined }}
          rowClassName={(record, index) => (index % 2 ? '' : 'hasBackground')}
          locale={{ emptyText: t('common.noData') }}
        />
      )}
      {isLoadingQuestion && <Spin size="large" />}
      {!isLoadingQuestion && (
        <Col span={24} className={styles.colPagination}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.textPagination}>
            <strong>Tổng số lượng: {countQuestions}</strong>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.pagination}>
            <Pagination
              onChange={handleChangePage}
              total={countQuestions}
              current={filter.page}
              pageSize={filter.per_page}
            />
          </Col>
        </Col>
      )}
      <Modal
        className={styles.modalQuestion}
        visible={isModalAddQuestionVisible}
        onCancel={() => setIsModalAddQuestionVisible(false)}
        closable={true}
        centered={true}
        footer={false}
      >
        <CommonQuestionForm
          hideQuestionForm={() => setIsModalAddQuestionVisible(false)}
          questionSelectedId={questionSelectedId}
        />
      </Modal>
      <Modal
        className={styles.modalYesNo}
        visible={isModalDeleteVisible}
        closable={false}
        centered={true}
        footer={false}
      >
        <div className={styles.title}>
          <strong>Bạn có muốn xóa câu hỏi này không?</strong>
        </div>
        <div className={styles.button}>
          <Button type="primary" htmlType="button" onClick={handleCancelModalDelete} className={styles.buttonCancel}>
            {t('common.btnCancel')}
          </Button>
          <Button
            type="primary"
            htmlType="button"
            onClick={handleSubmitModalDelete}
            className={styles.buttonOk}
            loading={isLoadingDelete}
          >
            {t('common.btnOk')}
          </Button>
        </div>
      </Modal>
    </div>
  );
}
