import { lazy, Suspense } from 'react';
import { LoadingFallback } from '../components';

const LazyPlantasPage = lazy(() => import('../../features/plantas/PlantasPage'));

export default function PlantasPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <LazyPlantasPage />
    </Suspense>
  );
}
