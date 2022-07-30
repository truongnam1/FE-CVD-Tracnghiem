import React, { Suspense } from 'react';
// import Cookies from 'js-cookie';
import PageHeader from 'components/PageHeader';
import { /*Redirect, */ Outlet } from 'react-router-dom';
import styles from './styles.module.scss';
// import { useQuery } from 'react-query';
// import { loadProfile } from 'api/profile';

export default function PageWrapper() {
  // const isAuthenticated = !!Cookies.get('token');
  // const { data: profile } = useQuery('profile', loadProfile, { enabled: isAuthenticated });

  // if (!isAuthenticated) return <Redirect to="/login" />;
  // if (!profile) return null;
  return (
    <div className={styles.pageWrapper}>
      {/* <SideNav /> */}
      <div className={styles.mainWrapper}>
        <PageHeader />
        <div className={styles.pageContent}>
          {/* Header can be here */}
          {/* <p>Header</p> */}
          <Suspense fallback={null}>
            {/* Outlet is display as child route */}
            <Outlet />
          </Suspense>
        </div>
      </div>
    </div>
  );
}
