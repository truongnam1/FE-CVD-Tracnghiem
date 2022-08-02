import React, { useEffect, useMemo, useState } from 'react';
import { useLocation } from 'react-router-dom';
import { Button, Col, Input, Pagination, Row, Select, Spin } from 'antd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import filterIcon from 'assets/images/filter.svg';
import iconSearch from 'assets/images/SearchFilled.svg';
import iconQuestion from 'assets/images/question.svg';
import iconPeople from 'assets/images/people.svg';

const { Option } = Select;

const SORT_BY = {
  NEW: 'new',
  OLD: 'old',
};

export default function SearchExam() {
  const { t } = useTranslation();
  const { state }: any = useLocation();
  const [keyWord, setKeyWord] = useState<string>(state?.keyWord);
  const [categorySelected, setCategorySelected] = useState<number>();
  const [sortBy, setSortBy] = useState<string>(SORT_BY.NEW);
  const [page, setPage] = useState<number>(1);

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

  const isLoadingExam = false;
  const listExam = [
    {
      id: 1,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 2,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Trắc Nghiệm Địa Lí 12 Bảo Vệ Môi Trường Và Phòng Chống Thiên Tai',
      countQuestion: 40,
      countExam: 400,
      subjects: [
        {
          id: 1,
          name: 'Lịch sử',
        },
        {
          id: 2,
          name: 'Địa lý',
        },
        {
          id: 3,
          name: 'Giáo dục công dân',
        },
      ],
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
  ];

  const handleChangeCategory = (value: number) => {
    setCategorySelected(value);
  };

  const handleChangeSortBy = (value: string) => {
    setSortBy(value);
  };

  const handleChangePage = (value: number) => {
    setPage(value);
  };

  const listExamBox = useMemo(
    () =>
      listExam?.map((exam: ExamInterface) => (
        <div className={styles.boxExam}>
          <img src={exam.image} className={styles.imageExam} alt="Exam" />
          <div className={styles.infoExam}>
            <div className={styles.listCategory}>
              {exam?.subjects.map((category: CategoryInterface) => (
                <div className={styles.category}>{category.name}</div>
              ))}
            </div>
            <div className={styles.nameExam}>{exam.name}</div>
            <div className={styles.countInfoExam}>
              <div className={styles.countInfo}>
                <img src={iconQuestion} className={styles.imageExam} alt="countQuestion" />{' '}
                {t('searchExam.countQuestion', { count: exam.countQuestion })}
              </div>
              <div className={styles.countInfo}>
                <img src={iconPeople} className={styles.imageExam} alt="countExam" />{' '}
                {t('searchExam.countExam', { count: exam.countExam })}
              </div>
              <Button block type="primary" htmlType="button" className={styles.btnExam}>
                {t('searchExam.examNow').toUpperCase()}
              </Button>
            </div>
          </div>
        </div>
      )),
    [listExam, t]
  );

  const optionSelectCategory = useMemo(() => {
    return listCategory.map((category: CategoryInterface) => (
      <Option key={'category' + category.id} value={category.id} selected={category.id === categorySelected}>
        {category.name}
      </Option>
    ));
  }, [categorySelected, listCategory]);

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
            />
            <Select
              value={categorySelected}
              className={styles.select}
              bordered={false}
              onChange={handleChangeCategory}
              loading={isLoadingListCategory}
              placeholder={t('searchExam.category')}
            >
              {optionSelectCategory}
            </Select>
            <Button block type="primary" htmlType="button" className={styles.btnFind}>
              {t('common.find').toUpperCase()}
            </Button>
          </div>
        </Col>
        <Col span={6}></Col>
        <Col className={styles.listExam} span={18}>
          <div className={styles.divListExam}>
            <div className={styles.showAndSort}>
              <div className={styles.showText}>
                {t('searchExam.showCountExam', {
                  from: 1,
                  to: 10,
                  total: 100,
                })}
              </div>
              <div className={styles.sortDiv}>
                <div className={styles.sortText}>{t('searchExam.sortBy')}</div>
                <Select
                  value={sortBy}
                  className={styles.select}
                  bordered={false}
                  onChange={handleChangeSortBy}
                  loading={isLoadingListCategory}
                  placeholder={t('searchExam.category')}
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
            {isLoadingExam && <Spin size="large" />}
            {!isLoadingExam && <div className={styles.listExam}>{listExamBox}</div>}
            <div className={styles.pagination}>
              <Pagination onChange={handleChangePage} total={100} current={page} pageSize={10} />
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}
