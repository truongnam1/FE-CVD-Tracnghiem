import React, { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import AuthWrapper from 'wrappers/AuthWrapper';

const Home = lazy(() => import('pages/Home'));
const Category = lazy(() => import('pages/Category'));
const SearchExam = lazy(() => import('pages/SearchExam'));
const Question = lazy(() => import('pages/Question'));

export default function AppWrapper() {
  return (
    <div className="root-wrapper">
      <Routes>
        <Route path="/" element={<AuthWrapper />}>
          {/* Child route declaration */}
          <Route path="/" element={<Home />} />
          <Route path="/category" element={<Category />} />
          <Route path="/search-exam" element={<SearchExam />} />
          <Route path="/question" element={<Question />} />
        </Route>
      </Routes>
    </div>
  );
}
