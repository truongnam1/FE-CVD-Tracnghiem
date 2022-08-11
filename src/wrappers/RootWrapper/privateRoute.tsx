import React from 'react';
import Cookies from 'js-cookie';
import { Navigate, Outlet } from 'react-router-dom';
import { TOKEN_CUSTOMER } from 'contants/constants';

export default function PrivateRoute() {
  const isAuthenticated = !!Cookies.get(TOKEN_CUSTOMER);

  return isAuthenticated ? <Outlet /> : <Navigate to="/" />;
}
