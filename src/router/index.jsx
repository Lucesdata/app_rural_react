/**
 * Router Configuration
 * Centralized routing configuration with code splitting using React.lazy and Suspense.
 * Uses BrowserRouter for consistent routing in development and production.
 */
import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import Loading from '../components/feedback/Loading';
import AppLayout from '../components/layout/AppLayout';
import { AuthProvider } from '../contexts/AuthContext';
import ProtectedRoute from '../features/auth/ProtectedRoute';

const Home = lazy(() => import('../features/home'));
const Dashboard = lazy(() => import('../features/dashboard'));
const Plantas = lazy(() => import('../features/plantas'));
const PlantDetail = lazy(() => import('../features/plantas/detail'));
const Acerca = lazy(() => import('../features/acerca'));
const AuthPage = lazy(() => import('../features/auth'));

const AppRoutes = () => (
  <Routes>
    <Route path="/login" element={<AuthPage />} />
    <Route element={<AppLayout><Outlet /></AppLayout>}>
      <Route path="/" element={<Home />} />
      <Route path="/plantas" element={<Plantas />} />
      <Route path="/plantas/:id" element={
        <ProtectedRoute>
          <PlantDetail />
        </ProtectedRoute>
      } />
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/acerca" element={<Acerca />} />
      <Route path="*" element={<Home />} />
    </Route>
  </Routes>
);

const AppRouter = () => (
  <AuthProvider>
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <AppRoutes />
      </Suspense>
    </BrowserRouter>
  </AuthProvider>
);

export default AppRouter;
