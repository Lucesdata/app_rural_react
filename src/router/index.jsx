import { createBrowserRouter } from 'react-router-dom';
import { ProtectedRoute } from './components';

// Import lazy-loaded components
import TestApp from './lazy/TestApp';
import LoginPage from './lazy/LoginPage';
import PlantasPage from './lazy/PlantasPage';
import AdminPage from './lazy/AdminPage';

// Create router configuration
const createRouter = () => {
  return createBrowserRouter([
    {
      path: '/',
      element: <TestApp />
    },
    {
      path: '/login',
      element: <LoginPage />
    },
    {
      path: '/plantas',
      element: (
        <ProtectedRoute>
          <PlantasPage />
        </ProtectedRoute>
      )
    },
    {
      path: '/admin',
      element: (
        <ProtectedRoute roles={['ADMIN']}>
          <AdminPage />
        </ProtectedRoute>
      )
    },
    {
      path: '*',
      element: <TestApp />
    }
  ]);
};

const router = createRouter();

export default router;
