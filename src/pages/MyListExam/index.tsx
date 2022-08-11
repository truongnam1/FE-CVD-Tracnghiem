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
import { EXAM_STATUS, TOKEN_CUSTOMER } from 'contants/constants';
import SideNav from 'components/SideNav';
import { useNavigate } from 'react-router-dom';
import {
  useGetCountMyExam,
  useGetListGradeExam,
  useGetListMyExam,
  useGetListStatusExam,
  useGetListSubjectExam,
} from 'hooks/useExam';
import { GET_CUSTOMER_PROFILE, GET_MY_LIST_EXAM } from 'contants/keyQuery';
import Cookies from 'js-cookie';
import { useIsFetching, useMutation, useQueryClient } from 'react-query';
import { deleteMyExam } from 'api/exam';
import { handleErrorMessage } from 'helper';

const { Option } = Select;

const defaultFilter: any = {
  subject: undefined,
  examStatusId: undefined,
  keyWord: '',
  gradeId: undefined,
  page: 1,
  per_page: 10,
};

export default function MyListExam() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();
  const [filter, setFilter] = useState<any>(defaultFilter);
  const [inputFind, setInputFind] = useState<string>('');
  const [isLoadingDelete, setIsLoadingDelete] = useState<boolean>(false);
  const [isModalDeleteVisible, setIsModalDeleteVisible] = useState<boolean>(false);
  const [deleteQuestionId, setDeleteQuestionId] = useState<number>(0);

  const { mutate: deletePost } = useMutation((params: any) => deleteMyExam(params), {
    onSuccess: () => {
      message.success('Xóa đề thi thành công.');
      queryClient.refetchQueries([GET_MY_LIST_EXAM]);
      setIsLoadingDelete(false);
      setIsModalDeleteVisible(false);
    },
    onError: (error) => {
      handleErrorMessage(error);
      setIsLoadingDelete(false);
      setIsModalDeleteVisible(false);
    },
  });

  const { data: listExam, isLoading: isLoadingExam } = useGetListMyExam({
    skip: (filter.page - 1) * 10,
    take: 10,
    creatorId: {
      equal: profile?.id,
    },
    subjectId: {
      equal: filter.subjectId,
    },
    examStatusId: {
      equal: filter.examStatusId,
    },
    gradeId: {
      equal: filter.gradeId,
    },
    name: {
      contain: filter.keyWord,
    },
  });
  const { data: countExams } = useGetCountMyExam({
    skip: (filter.page - 1) * 10,
    take: 10,
    creatorId: {
      equal: profile?.id,
    },
    subjectId: {
      equal: filter.subjectId,
    },
    examStatusId: {
      equal: filter.examStatusId,
    },
    gradeId: {
      equal: filter.gradeId,
    },
    name: {
      contain: filter.keyWord,
    },
  });
  const { data: listSubject, isLoading: isLoadingSubject } = useGetListSubjectExam({});
  const { data: listGrade, isLoading: isLoadingGrade } = useGetListGradeExam({});
  const { data: listStatusExam, isLoading: isLoadingStatusExam } = useGetListStatusExam({});

  const dataSource: any[] | undefined = useMemo(() => {
    return listExam?.map((exam: any, index: number) => ({
      key: index + 1 + (filter.page - 1) * 10,
      id: index + 1 + (filter.page - 1) * 10,
      code: exam?.code,
      name: exam?.name,
      subject: exam?.subject?.name,
      grade: exam?.grade?.name,
      createdAt: dayjs(exam?.createdAt).format('YYYY/MM/DD'),
      updatedAt: dayjs(exam?.updatedAt).format('YYYY/MM/DD'),
      status: (
        <div className={styles.divStatus}>
          <img
            height={24}
            width={24}
            src={exam?.examStatus?.id === EXAM_STATUS.ACTIVE ? iconActive : iconInactive}
            alt="More"
          />{' '}
          {exam?.examStatus?.name}
        </div>
      ),
      handle: (
        <Popover
          content={
            <div className={styles.popoverMore}>
              <p className={styles.popoverEdit} onClick={() => navigate('/exam/edit/' + exam.id)}>
                {t('common.edit')}
              </p>
              <p className={styles.popoverDelete} onClick={() => handleDeleteQuestion(exam.id)}>
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
  }, [listExam, filter, t]);

  const columns: IColumnTable[] = [
    {
      title: <strong>{t('myListExam.id')}</strong>,
      dataIndex: 'id',
      key: 'id',
      className: styles.indexColumn,
    },
    {
      title: <strong>{t('myListExam.code')}</strong>,
      dataIndex: 'code',
      key: 'code',
      className: styles.codeColumn,
    },
    {
      title: <strong>{t('myListExam.name')}</strong>,
      dataIndex: 'name',
      key: 'name',
      className: styles.contentColumn,
    },
    {
      title: <strong>{t('myListExam.subject')}</strong>,
      dataIndex: 'subject',
      key: 'subject',
      className: styles.groupColumn,
    },
    {
      title: <strong>{t('myListExam.grade')}</strong>,
      dataIndex: 'grade',
      key: 'grade',
      className: styles.groupColumn,
    },
    {
      title: <strong>{t('myListExam.createdAt')}</strong>,
      dataIndex: 'createdAt',
      key: 'createdAt',
      className: styles.createdAtColumn,
    },
    {
      title: <strong>{t('myListExam.updatedAt')}</strong>,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      className: styles.updatedAtColumn,
    },
    {
      title: <strong>{t('myListExam.status')}</strong>,
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

  const handleChangeExamStatus = useCallback(
    (selectedValue: number) => {
      setFilter({
        ...filter,
        page: 1,
        examStatusId: selectedValue,
      });
    },
    [filter]
  );

  const handleChangeSubject = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        page: 1,
        subjectId: value,
      });
    },
    [filter]
  );

  const handleChangeGrade = useCallback(
    (value: number) => {
      setFilter({
        ...filter,
        page: 1,
        gradeId: value,
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

  useEffect(() => {
    if (isFetching) return;
    const profileResponse: any = queryClient.getQueryData([GET_CUSTOMER_PROFILE, isAuthenticated]);
    setProfile(profileResponse);
  }, [isFetching, queryClient, isAuthenticated]);

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

  const optionSelectStatusExam = useMemo(() => {
    return listStatusExam?.map((statusExam: GroupQuestionInterface) => (
      <Option key={'statusExam' + statusExam.id} value={statusExam.id}>
        {statusExam.name}
      </Option>
    ));
  }, [listStatusExam]);

  return (
    <div className={styles.myListExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('myListExam.listExam')}</h2>
        </Col>
        <Col span={24} className={styles.colFilterAdd}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.colFilter}>
            <Input
              className={styles.input}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={'Tìm kiếm đề thi'}
              value={inputFind}
              onChange={(e) => setInputFind(e.currentTarget.value)}
              onBlur={handleChangeKeyWord}
            />
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingSubject}
              placeholder={t('questionForm.category')}
              onChange={handleChangeSubject}
              allowClear
            >
              {optionSelectSubject}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingGrade}
              placeholder={t('questionForm.grade')}
              onChange={handleChangeGrade}
              allowClear
            >
              {optionSelectGrade}
            </Select>
            <Select
              className={styles.select}
              bordered={false}
              loading={isLoadingStatusExam}
              placeholder={'Trạng thái công bố'}
              onChange={handleChangeExamStatus}
              allowClear
            >
              {optionSelectStatusExam}
            </Select>
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.colBtn}>
            <Button
              block
              type="primary"
              htmlType="button"
              className={styles.btnAdd}
              onClick={() => navigate('/exam/create')}
            >
              {t('common.addNew').toUpperCase()} <img height={16} width={16} src={iconAdd} alt="Add" />
            </Button>
          </Col>
        </Col>
      </Row>
      {!isLoadingExam && (
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
      {isLoadingExam && <Spin size="large" />}
      {!isLoadingExam && (
        <Col span={24} className={styles.colPagination}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.textPagination}>
            <strong>Tổng số lượng: {countExams}</strong>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.pagination}>
            <Pagination
              onChange={handleChangePage}
              total={countExams}
              current={filter.page}
              pageSize={filter.per_page}
            />
          </Col>
        </Col>
      )}
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
