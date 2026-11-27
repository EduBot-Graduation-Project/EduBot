import { createBrowserRouter, Navigate } from 'react-router';

import LoginPage from '@/features/auth/pages/LoginPage';
import OverviewPage from '@/features/dashboard/pages/OverviewPage';
import ClassroomsPage from '@/features/classrooms/pages/ClassroomsPage';
import {
  adminNavigationItems,
  operatorNavigationItems,
  studentNavigationItems,
} from '@/shared/config/navigation';
import DashboardLayout from '@/shared/layouts/DashboardLayout';
import NotFoundPage from '@/shared/pages/NotFoundPage';
import { getCurrentUser, getDefaultRouteByRole } from '@/shared/lib/auth';
import { GuestGuard } from '@/shared/routes/GuestGuard';
import { RoleGuard } from '@/shared/routes/RoleGuard';

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
    element: <GuestGuard />,
    children: [{ path: '/login', element: <LoginPage /> }],
  },
  {
    element: <RoleGuard allowedRoles={['Admin']} />,
    children: [
      {
        path: '/admin',
        element: (
          <DashboardLayout items={adminNavigationItems} roleLabel="Admin Portal" />
        ),
        children: [
          { index: true, element: <Navigate to="overview" replace /> },
          { path: 'overview', element: <OverviewPage /> },
          { path: 'classrooms', element: <ClassroomsPage /> },
        ],
      },
    ],
  },
  {
    element: <RoleGuard allowedRoles={['Operator']} />,
    children: [
      {
        path: '/operator',
        element: (
          <DashboardLayout
            items={operatorNavigationItems}
            roleLabel="Operator Portal"
          />
        ),
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
        element: (
          <DashboardLayout
            items={studentNavigationItems}
            roleLabel="Student Portal"
          />
        ),
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