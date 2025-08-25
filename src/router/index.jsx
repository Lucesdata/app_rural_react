import React, { Suspense, lazy } from 'react';
import { Routes, Route, Outlet } from 'react-router-dom';
import Loading from '../components/feedback/Loading';
import AppLayout from '../components/layout/AppLayout';
import ProtectedRoute from '../features/auth/ProtectedRoute';

// Lazy load components for better performance
const Home = lazy(() => import('../features/home/Home'));
const PlantasPage = lazy(() => import('../features/plantas/PlantasPage'));
const PlantDetail = lazy(() => import('../features/plantas/detail/PlantDetail'));
const AdminPage = lazy(() => import('../features/dashboard/AdminPage'));
const LoginPage = lazy(() => import('../features/auth/LoginPage'));
const RegisterPage = lazy(() => import('../features/auth/RegisterPage'));
const Acerca = lazy(() => import('../features/acerca'));
const ProfilePage = lazy(() => import('../features/profile/ProfilePage'));
const NotFoundPage = lazy(() => import('../components/feedback/NotFoundPage'));

// Main App Routes
const AppRoutes = () => (
  <Routes>
    {/* Public routes */}
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<LoginPage />} />
    <Route path="/register" element={<RegisterPage />} />
    <Route path="/acerca" element={<Acerca />} />

    {/* Public plantas routes with layout */}
    <Route element={
      <AppLayout>
        <Suspense fallback={<Loading fullPage />}>
          <Outlet />
        </Suspense>
      </AppLayout>
    }>
      <Route path="/plantas" element={<PlantasPage />} />
      <Route path="/plantas/:id" element={<PlantDetail />} />
    </Route>

    {/* Protected routes with layout */}
    <Route element={
      <ProtectedRoute>
        <AppLayout>
          <Suspense fallback={<Loading fullPage />}>
            <Outlet />
          </Suspense>
        </AppLayout>
      </ProtectedRoute>
    }>
      {/* Dashboard routes */}
      <Route path="/dashboard" element={
        <ProtectedRoute>
          <Home />
        </ProtectedRoute>
      } />

      {/* Profile routes */}
      <Route path="/profile" element={
        <ProtectedRoute>
          <ProfilePage />
        </ProtectedRoute>
      } />

      {/* Admin routes */}
      <Route path="/admin" element={
        <ProtectedRoute roles={['ADMIN']}>
          <AdminPage />
        </ProtectedRoute>
      } />

      {/* Catch-all route */}
      <Route path="*" element={<NotFoundPage />} />
    </Route>
  </Routes>
);

// Router Component
export default function AppRouter() {
  return (
    <Suspense fallback={<Loading fullPage />}>
      <AppRoutes />
    </Suspense>
  );
}
