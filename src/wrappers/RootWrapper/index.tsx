import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';
import PrivateRoute from './privateRoute';

const Home = lazy(() => import('pages/Home'));
const Category = lazy(() => import('pages/Category'));
const SearchExam = lazy(() => import('pages/SearchExam'));
const MyQuestion = lazy(() => import('pages/MyQuestion'));
const MyListExam = lazy(() => import('pages/MyListExam'));
const Page404 = lazy(() => import('pages/Page404'));
const ChangePassword = lazy(() => import('pages/ChangePassword'));
const CreateExam = lazy(() => import('pages/CreateExam'));
const PreviewExam = lazy(() => import('pages/PreviewExam'));
const ExamAction = lazy(() => import('pages/ExamAction'));
const MyProfile = lazy(() => import('pages/MyProfile'));
const EditExam = lazy(() => import('pages/EditExam'));
const ExamHistory = lazy(() => import('pages/ExamHistory'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="*" element={<Page404 />} />
        <Route path="/" element={<AuthWrapper />}>
          {/* Child route declaration */}
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search-exam" element={<SearchExam />} />
          <Route path="/exam/preview/:id" element={<PreviewExam />} />
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/profile" element={<MyProfile />} />
            <Route path="/question" element={<MyQuestion />} />
            <Route path="/exam" element={<MyListExam />} />
            <Route path="/exam-history" element={<ExamHistory />} />
            <Route path="/exam/create" element={<CreateExam />} />
            <Route path="/exam/edit/:id" element={<EditExam />} />
            <Route path="/change-password" element={<ChangePassword />} />
            <Route path="/exam-action/:id" element={<ExamAction />} />
          </Route>
        </Route>
      </Routes>
    </div>
  );
}
