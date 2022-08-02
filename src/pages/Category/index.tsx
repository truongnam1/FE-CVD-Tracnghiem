import React, { useMemo } from 'react';
import { Col, Row, Spin } from 'antd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';

import countTest from 'assets/images/countTest.svg';

export default function Category() {
  const { t } = useTranslation();
  const gutter: number = 30;
  const backgroundCategory = ['#E5F7F8', '#FEF7E8', '#FEE6ED', '#F5FCEC'];

  // const { data: listCategory, isLoading: isLoadingCategory }: any = {}

  const isLoadingCategory = false;
  const listCategory = [
    {
      id: 1,
      name: 'Tin học',
      countTest: 999,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 2,
      name: 'Tin học',
      countTest: 999,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Tin học',
      countTest: 999,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Tin học',
      countTest: 999,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
    {
      id: 3,
      name: 'Tin học',
      countTest: 999,
      image:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/b/b6/Image_created_with_a_mobile_phone.png/800px-Image_created_with_a_mobile_phone.png',
    },
  ];

  const listCategoryBox = useMemo(
    () =>
      listCategory?.map((category: CategoryInterface) => (
        <Col key={category.id} xs={12} md={8} lg={6} xl={6}>
          <div
            className={styles.boxCategory}
            style={{ backgroundColor: `${backgroundCategory[Math.floor(Math.random() * backgroundCategory.length)]}` }}
          >
            <img src={category.image} className={styles.imageCategory} alt="category" />
            <div className={styles.infoCategory}>
              <div className={styles.nameCategory}>{category.name}</div>
              <div className={styles.countTestCategory}>
                <img src={countTest} alt="category" /> {category.countTest} {t('category.test')}
              </div>
            </div>
          </div>
        </Col>
      )),
    [listCategory, t, backgroundCategory]
  );

  return (
    <div className={styles.category}>
      <div className={styles.title}>{t('category.title')}</div>
      {isLoadingCategory && <Spin size="large" />}
      {!isLoadingCategory && listCategory?.length === 0 && (
        <div className={styles.notHaveProduct}>{t('myPageFavorite.notHaveProduct')}</div>
      )}
      {!isLoadingCategory && (
        <Row className={styles.listCategory} gutter={[gutter, gutter]}>
          {listCategoryBox}
        </Row>
      )}
    </div>
  );
}
