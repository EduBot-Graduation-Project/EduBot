import { createBrowserRouter, Navigate } from 'react-router';

import LoginPage from '@/features/auth/pages/LoginPage';

import AdminLayout from '../layouts/AdminLayout';
import StudentLayout from '../layouts/StudentLayout';
import { RoleGuard } from '@/components/auth/RoleGuard';
import { getCurrentUser, getDefaultRouteByRole } from '@/lib/auth';

import Overview from '../features/admin/pages/Overview';
import Classrooms from '../features/admin/pages/Classrooms';
import NotFoundPage from '@/pages/NotFoundPage';
import OperatorLayout from '../layouts/OperatorLayout';

// eslint-disable-next-line react-refresh/only-export-components
function RootRedirect() {
  const user = getCurrentUser();
  if (!user) return <Navigate to="/login" replace />;
  return <Navigate to={getDefaultRouteByRole(user.role)} replace />;
}

export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootRedirect />,
    errorElement: <NotFoundPage />,
  },
  {
    path: '/login',
    element: <LoginPage />,
  },
  {
    element: <RoleGuard allowedRoles={['Admin']} />,
    children: [
      {
        path: '/admin',
        element: <AdminLayout />,
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: 'overview', element: <Overview /> },
          { path: 'classrooms', element: <Classrooms /> },
        ],
      },
    ],
  },
  {
    element: <RoleGuard allowedRoles={['Operator']} />,
    children: [
      {
        path: '/operator',
        element: <OperatorLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <div>Operator Dashboard</div> },
          { path: 'courses', element: <div>Operator Courses</div> },
          { path: 'sessions', element: <div>Live Sessions</div> },
        ],
      },
    ],
  },
  {
    element: <RoleGuard allowedRoles={['Student']} />,
    children: [
      {
        path: '/student',
        element: <StudentLayout />,
        children: [
          { index: true, element: <Navigate to="dashboard" replace /> },
          { path: 'dashboard', element: <div>Student Dashboard</div> },
          { path: 'subjects', element: <div>My Subjects</div> },
          { path: 'notes', element: <div>Lecture Notes</div> },
        ],
      },
    ],
  },
  {
    path: '*',
    element: <NotFoundPage />,
  },
]);