import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../components';

const LazyLoginPage = lazy(() => import('../../features/auth/LoginPage'));

export default function LoginPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyLoginPage />
    </Suspense>
  );
}
