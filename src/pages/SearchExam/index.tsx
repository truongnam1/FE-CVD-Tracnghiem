import React, { useEffect, useMemo, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Button, Col, Input, Pagination, Row, Select, Spin } from 'antd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import filterIcon from 'assets/images/filter.svg';
import iconSearch from 'assets/images/SearchFilled.svg';
import iconQuestion from 'assets/images/question.svg';
import iconPeople from 'assets/images/people.svg';
import { ESort, useGetCategory, useGetCountPublicExam, useGetListExam } from 'hooks/home';

const { Option } = Select;

const SORT_BY = {
  NEW: 'new',
  OLD: 'old',
};

export default function SearchExam() {
  const { t } = useTranslation();
  const { state }: any = useLocation();
  const navigate = useNavigate();

  const [keyWord, setKeyWord] = useState<string>(state?.keyWord);
  const [categorySelected, setCategorySelected] = useState<number>();
  const [sortBy, setSortBy] = useState<string>(SORT_BY.NEW);
  const [page, setPage] = useState<number>(1);
  const listCategory: CategoryInterface[] = useGetCategory();

  const [bodyListExam, setBodyListExam] = useState<any>({
    take: 10,
    skip: (page - 1) * 10,
    orderBy: 50,
    orderType: sortBy === SORT_BY.NEW ? ESort.DESC : ESort.ASC,
  });

  const { data: listExams, isLoading: isLoadingExams } = useGetListExam(bodyListExam);
  const { data: countExam } = useGetCountPublicExam(bodyListExam);

  useEffect(() => {
    if (!isLoadingExams) {
      setIsloadSortBy(false);
    }
  }, [isLoadingExams]);

  useEffect(() => {
    if (listCategory) {
      setCategorySelected(state?.categoryId);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [listCategory]);

  const [isLoadingSortBy, setIsloadSortBy] = useState<boolean>(false);

  const handleChangeCategory = (value: number) => {
    setCategorySelected(value);
  };

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
    setIsloadSortBy(true);
  };

  const listExamBox = useMemo(
    () =>
      listExams?.map((exam: any) => (
        <div className={styles.boxExam}>
          <img src={exam?.image?.url} className={styles.imageExam} alt="Exam" />
          <div className={styles.infoExam}>
            <div className={styles.listCategory}>
              {/* {exam?.subjects?.map((category: CategoryInterface) => ( */}
              <div className={styles.category}>{exam?.subject?.name}</div>
              {/* // ))} */}
            </div>
            <div className={styles.nameExam}>{exam.name} - <span>{exam.code}</span></div>
            <div className={styles.countInfoExam}>
              <div className={styles.countInfo}>
                <img src={iconQuestion} className={styles.icon} alt="countQuestion" />{' '}
                {t('searchExam.countQuestion', { count: exam?.totalQuestion })}
              </div>
              <div className={styles.countInfo}>
                <img src={iconPeople} className={styles.icon} alt="countExam" />{' '}
                {t('searchExam.countExam', { count: exam?.totalNumberTest })}
              </div>
              <Button
                block
                type="primary"
                htmlType="button"
                className={styles.btnExam}
                onClick={() => navigate(`/exam/preview/${exam.id}`)}
              >
                {t('searchExam.examNow').toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )),
    [listExams, t, navigate]
  );

  const optionSelectCategory = useMemo(() => {
    return listCategory?.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id} selected={category.id === categorySelected}>
        {category.name}
      </Option>
    ));
  }, [categorySelected, listCategory]);

  const handleSearchTestByEnter = (e?: React.KeyboardEvent<HTMLInputElement>) => {
    if (e?.keyCode === 13) {
      setBodyListExam({
        ...bodyListExam,
        subjectId: categorySelected ? { equal: categorySelected } : undefined,
        search: keyWord,
      });
    }
  };

  const handleSearchByButton = () => {
    setBodyListExam({
      ...bodyListExam,
      subjectId: categorySelected ? { equal: categorySelected } : undefined,
      search: keyWord,
    });
  };

  useEffect(() => {
    setBodyListExam({ ...bodyListExam, orderType: sortBy === SORT_BY.NEW ? ESort.DESC : ESort.ASC });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sortBy]);

  useEffect(() => {
    window.history.replaceState({}, document.title);
  }, []);

  return (
    <div className={styles.searchExam}>
      <Row className={styles.containerExam}>
        <Col className={styles.filterSearch}>
          <div className={styles.divFilterSearch}>
            <div className={styles.title}>
              <img src={filterIcon} alt="filter" /> {t('searchExam.filterSearch')}
            </div>
            <Input
              className={styles.inputFind}
              prefix={<img src={iconSearch} alt="search" />}
              placeholder={t('home.findTest')}
              value={keyWord}
              onChange={(e) => setKeyWord(e.currentTarget.value)}
              onKeyDown={handleSearchTestByEnter}
            />
            <Select
              value={categorySelected}
              className={styles.select}
              bordered={false}
              onChange={handleChangeCategory}
              // loading={isLoadingListCategory}
              placeholder={t('searchExam.category')}
              allowClear
            >
              {optionSelectCategory}
            </Select>
            <Button block type="primary" onClick={handleSearchByButton} htmlType="button" className={styles.btnFind}>
              {t('common.find').toUpperCase()}
            </Button>
          </div>
        </Col>
        <Col span={6}></Col>
        <Col className={styles.listExam} span={18}>
          <div className={styles.divListExam}>
            <div className={styles.showAndSort}>
              <div className={styles.showText}>Tổng số lượng: {countExam}</div>
              <div className={styles.sortDiv}>
                <div className={styles.sortText}>{t('searchExam.sortBy')}</div>
                <Select
                  value={sortBy}
                  className={styles.select}
                  bordered={false}
                  onChange={handleChangeSortBy}
                  loading={isLoadingSortBy}
                  placeholder={t('searchExam.sortBy')}
                >
                  <Option key="sortByNew" value={SORT_BY.NEW} selected={SORT_BY.NEW === sortBy}>
                    {t('searchExam.newMost')}
                  </Option>
                  <Option key="sortByOld" value={SORT_BY.OLD} selected={SORT_BY.OLD === sortBy}>
                    {t('searchExam.oldMost')}
                  </Option>
                </Select>
              </div>
            </div>
            {isLoadingExams && <Spin size="large" />}
            {!isLoadingExams && <div className={styles.listExam}>{listExamBox}</div>}
            <div className={styles.pagination}>
              <Pagination onChange={handleChangePage} total={countExam} current={page} pageSize={10} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
