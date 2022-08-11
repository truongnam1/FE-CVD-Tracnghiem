import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Col, Pagination, Row, Spin, Table } from 'antd';
import dayjs from 'dayjs';
import { useTranslation } from 'react-i18next';

import styles from './styles.module.scss';

import { TOKEN_CUSTOMER } from 'contants/constants';
import SideNav from 'components/SideNav';
import { GET_CUSTOMER_PROFILE } from 'contants/keyQuery';
import Cookies from 'js-cookie';
import { useIsFetching, useQueryClient } from 'react-query';
import { useCountHistoryExam, useGetHistoryExam } from 'hooks/useHistoryExam';

const defaultFilter: any = {
  page: 1,
  per_page: 10,
};

export default function ExamHistory() {
  const { t } = useTranslation();
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);
  const queryClient = useQueryClient();
  const isFetching = useIsFetching({
    queryKey: GET_CUSTOMER_PROFILE,
  });
  const [profile, setProfile] = useState<any>();
  const [filter, setFilter] = useState<any>(defaultFilter);

  const { data: listExam, isLoading: isLoadingExam } = useGetHistoryExam({
    skip: (filter.page - 1) * 10,
    take: 10,
    appUserId: {
      equal: profile?.id,
    },
  });

  const { data: countExam } = useCountHistoryExam({
    skip: (filter.page - 1) * 10,
    take: 10,
    appUserId: {
      equal: profile?.id,
    },
  });

  const dataSource: any[] | undefined = useMemo(() => {
    return listExam?.map((exams: any, index: number) => ({
      key: index + 1 + (filter.page - 1) * 10,
      id: index + 1 + (filter.page - 1) * 10,
      code: exams?.exam?.code,
      name: exams?.exam?.name,
      totalMark: exams?.mark,
      updatedAt: dayjs(exams?.examedAt).format('YYYY/MM/DD'),
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
      title: <strong>Tổng số điểm</strong>,
      dataIndex: 'totalMark',
      key: 'totalMark',
      className: styles.groupColumn,
    },
    {
      title: <strong>Ngày thi</strong>,
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      className: styles.updatedAtColumn,
    },
  ];

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

  return (
    <div className={styles.myListExam}>
      <SideNav />
      <Row justify="space-between" align="bottom" className={styles.title}>
        <Col span={24}>
          <h2>Lịch sử các bài thi</h2>
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
            <strong>Tổng số lượng: {countExam}</strong>
          </Col>
          <Col xs={24} sm={24} md={12} lg={12} xl={12} className={styles.pagination}>
            <Pagination
              onChange={handleChangePage}
              total={countExam}
              current={filter.page}
              pageSize={filter.per_page}
            />
          </Col>
        </Col>
      )}
    </div>
  );
}
