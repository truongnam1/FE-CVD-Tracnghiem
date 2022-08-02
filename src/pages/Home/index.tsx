import React, { useState } from 'react';
import { Button, Input, Row } from 'antd';
import styles from './styles.module.scss';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import iconSearch from 'assets/images/SearchFilled.svg';

export default function Home() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [keyWord, setKeyWord] = useState<string>();

  const handleChangeInputSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setKeyWord(e.currentTarget.value);
  };

  return (
    <div className={styles.container}>
      <Row justify="space-between" className={styles.home}>
        <div className={styles.titleAppName}>
          <span className={styles.appName}>{t('home.mainAppName')}</span>
          {t('home.subAppName')}
        </div>
        <div className={styles.desAppName}>{t('home.appDes')}</div>
        <div className={styles.divFindTest}>
          <Input
            className={styles.inputFind}
            prefix={<img src={iconSearch} alt="search" />}
            placeholder={t('home.findTest')}
            value={keyWord}
            onChange={(e) => handleChangeInputSearch(e)}
            suffix={
              <Button
                htmlType="button"
                className={styles.btnFind}
                onClick={() => navigate('search-exam', { state: { keyWord: keyWord } })}
              >
                {t('common.find')}
              </Button>
            }
          />
        </div>
      </Row>
    </div>
  );
}
