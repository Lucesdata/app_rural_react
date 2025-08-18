/**
 * Router Configuration
 * Centralized routing configuration with code splitting using React.lazy and Suspense.
 * Uses BrowserRouter for consistent routing in development and production.
 */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Loading from '../components/feedback/Loading';
import AppLayout from '../components/layout/AppLayout';

// Lazy load feature components
const Home = lazy(() => import('../features/home'));
const Dashboard = lazy(() => import('../features/dashboard'));
const Plantas = lazy(() => import('../features/plantas'));
const PlantDetail = lazy(() => import('../features/plantas/detail'));
const Acerca = lazy(() => import('../features/acerca'));

// Main app routes with layout
const AppRoutes = () => (
  <Routes>
    <Route element={<AppLayout><Outlet /></AppLayout>}>
      <Route path="/" element={<Home />} />
      <Route path="/plantas" element={<Plantas />} />
      <Route path="/plantas/:id" element={<PlantDetail />} />
      <Route path="/dashboard" element={<Dashboard />} />
      <Route path="/acerca" element={<Acerca />} />
      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
);

// App router with Suspense for code splitting
const AppRouter = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <AppRoutes />
    </Suspense>
  </BrowserRouter>
);

export default AppRouter;
