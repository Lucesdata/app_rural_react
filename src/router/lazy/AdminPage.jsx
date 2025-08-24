import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../components';

const LazyAdminPage = lazy(() => import('../../features/dashboard/AdminPage'));

export default function AdminPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyAdminPage />
    </Suspense>
  );
}
