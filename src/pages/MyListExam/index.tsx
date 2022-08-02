import React, { useCallback, useMemo, useState } from 'react';
import { Button, Col, Input, Modal, Pagination, Popover, Row, Select, Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

import iconMore from 'assets/images/more.svg';
import iconSearch from 'assets/images/SearchFilled.svg';
import iconAdd from 'assets/images/add-white.svg';
import iconActive from 'assets/images/active.svg';
import iconInactive from 'assets/images/inactive.svg';
import CommonQuestionForm from 'components/CommonQuestionForm';
import { QUESTION_STATUS } from 'contants/constants';
import SideNav from 'components/SideNav';

const { Option } = Select;

const defaultFilter: IFilterListQuestion = {
  status: undefined,
  category: undefined,
  keyWord: '',
  page: 1,
  per_page: 10,
};

export default function MyListExam() {
  const { t } = useTranslation();

  const [filter, setFilter] = useState<IFilterListQuestion>(defaultFilter);
  const [isModalAddQuestionVisible, setIsModalAddQuestionVisible] = useState<boolean>(false);

  // const { data: listCategory, isLoading: isLoadingCategory }: any = {}

  const isLoadingListCategory = false;
  const listCategory: CategoryInterface[] = [
    {
      id: 1,
      name: 'Tin học',
    },
    {
      id: 2,
      name: 'Tin học',
    },
    {
      id: 3,
      name: 'Tin học',
    },
    {
      id: 4,
      name: 'Tin học',
    },
    {
      id: 5,
      name: 'Tin học',
    },
  ];
  const isLoadingQuestion = false;
  const listQuestion: QuestionInterface[] = [
    {
      id: 1,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 2,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 3,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 0,
    },
    {
      id: 4,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 5,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 6,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 0,
    },
    {
      id: 7,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 8,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 9,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
    {
      id: 10,
      code: 'OPA1',
      content: 'Opal Skyview',
      group: 'Hoá học',
      createdAt: '2021-08-06 17:21:59',
      updatedAt: '2021-08-06 17:21:59',
      status: 1,
    },
  ];

  const dataSource: IDataColumnTableQuestion[] | undefined = useMemo(() => {
    return listQuestion.map((question: QuestionInterface, index: number) => ({
      key: index + 1 + (filter.page - 1) * 10,
      id: index + 1 + (filter.page - 1) * 10,
      code: question.code,
      content: question.content,
      group: question.content,
      createdAt: dayjs(question.createdAt).format('YYYY/MM/DD'),
      updatedAt: dayjs(question.updatedAt).format('YYYY/MM/DD'),
      status: (
        <div className={styles.divStatus}>
          <img
            height={24}
            width={24}
            src={question.status === QUESTION_STATUS.ACTIVE ? iconActive : iconInactive}
            alt="More"
          />{' '}
          {question.status === QUESTION_STATUS.ACTIVE ? t('myListExam.active') : t('myListExam.inactive')}
        </div>
      ),
      handle: (
        <Popover
          content={
            <div className={styles.popoverMore}>
              <p className={styles.popoverEdit}>{t('common.edit')}</p>
              <p className={styles.popoverDelete}>{t('common.delete')}</p>
            </div>
          }
        >
          <img height={24} width={24} src={iconMore} alt="More" />
        </Popover>
      ),
    }));
  }, [listQuestion, filter, t]);

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
      title: <strong>{t('myListExam.content')}</strong>,
      dataIndex: 'content',
      key: 'content',
      className: styles.contentColumn,
    },
    {
      title: <strong>{t('myListExam.group')}</strong>,
      dataIndex: 'group',
      key: 'group',
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

  const handleChangeCategory = useCallback(
    (selectedValue: number) => {
      setFilter({
        ...filter,
        page: 1,
        category: selectedValue,
      });
    },
    [filter]
  );

  const handleChangeKeyWord = useCallback(
    (value: string) => {
      setFilter({
        ...filter,
        page: 1,
        keyWord: value,
      });
    },
    [filter]
  );

  const handleChangePage = useCallback(
    (page: number) => {
      setFilter({ ...filter, page });
    },
    [filter]
  );

  const optionSelectCategory = useMemo(() => {
    return listCategory.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id} selected={category.id === filter.category}>
        {category.name}
      </Option>
    ));
  }, [filter.category, listCategory]);

  return (
    <div className={styles.myListExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>{t('myListExam.listExam')}</h2>
        </Col>
        <Col span={24} className={styles.colFilterAdd}>
          <Col xs={24} sm={24} md={16} lg={16} xl={16} className={styles.colFilter}>
            <Select
              value={filter.status}
              placeholder={t('myListExam.status')}
              className={styles.select}
              bordered={false}
              onChange={handleChangeStatus}
            >
              <Option
                value={QUESTION_STATUS.ACTIVE}
                selected={filter.status === QUESTION_STATUS.ACTIVE}
                key={'optionStatus' + QUESTION_STATUS.ACTIVE}
              >
                {t('myListExam.active')}
              </Option>
              <Option
                value={QUESTION_STATUS.INACTIVE}
                selected={filter.status === QUESTION_STATUS.INACTIVE}
                key={'optionStatus' + QUESTION_STATUS.INACTIVE}
              >
                {t('myListExam.inactive')}
              </Option>
            </Select>
            <Select
              value={filter.category}
              className={styles.select}
              bordered={false}
              onChange={handleChangeCategory}
              loading={isLoadingListCategory}
              placeholder={t('myListExam.category')}
            >
              {optionSelectCategory}
            </Select>
            <Input
              className={styles.input}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={t('common.find')}
              value={filter.keyWord}
              onChange={(e) => handleChangeKeyWord(e.currentTarget.value)}
            />
          </Col>
          <Col xs={24} sm={24} md={8} lg={8} xl={8} className={styles.colBtn}>
            <Button
              block
              type="primary"
              htmlType="button"
              className={styles.btnAdd}
              onClick={() => setIsModalAddQuestionVisible(true)}
            >
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
          scroll={{ x: !!dataSource.length ? true : undefined }}
          rowClassName={(record, index) => (index % 2 ? '' : 'hasBackground')}
          locale={{ emptyText: t('common.noData') }}
        />
      )}
      {isLoadingQuestion && <Spin size="large" />}
      {!isLoadingQuestion && (
        <Col span={24} className={styles.colPagination}>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.textPagination}>
            <strong>
              {t('myListExam.showCount', {
                total: 100,
                from: 1,
                to: 10,
              })}
            </strong>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.pagination}>
            <Pagination onChange={handleChangePage} total={100} current={filter.page} pageSize={filter.per_page} />
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
        <CommonQuestionForm />
      </Modal>
    </div>
  );
}
