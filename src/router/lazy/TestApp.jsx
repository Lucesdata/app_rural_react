import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../components';

const LazyTestApp = lazy(() => import('../../TestApp'));

export default function TestApp() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyTestApp />
    </Suspense>
  );
}
