import { lazy, Suspense } from 'react';
import { Outlet, Navigate, useRoutes } from 'react-router-dom';

import DashboardLayout from 'src/layouts/dashboard';
import { Membership, MembershipProfile } from 'src/sections/login';

export const IndexPage = lazy(() => import('src/pages/app'));
export const BlogPage = lazy(() => import('src/pages/blog'));
export const UserPage = lazy(() => import('src/pages/user'));
export const LoginPage = lazy(() => import('src/pages/login'));
export const LoginAuthPage = lazy(() => import('src/pages/login-auth'));
export const MemebershipPage = lazy(() => import('src/pages/Membership'));
export const ProductsPage = lazy(() => import('src/pages/products'));
export const Page404 = lazy(() => import('src/pages/page-not-found'));
export const ArticlePage = lazy(() => import('src/pages/article'));
export const SelectOptionView = lazy(() => import('/src/sections/thumbnail/select-option.jsx'));
export const Monitoring = lazy(() => import('src/pages/Monitoring'));
export const ConfirmUpload = lazy(() => import('src/pages/ConfirmUpload'));

// ----------------------------------------------------------------------

export default function Router() {
  const routes = useRoutes([
    {
      element: (
        <DashboardLayout>
          <Suspense>
            <Outlet />
          </Suspense>
        </DashboardLayout>
      ),
      children: [
        { element: <IndexPage />, index: true },
        { path: 'user/:id', element: <UserPage /> },
        { path: 'search', element: <ProductsPage /> },
        { path: 'article/:id', element: <ArticlePage /> },
        { path: 'api/auth/login', element: <LoginAuthPage /> },
        { path: 'monitoring', element: <Monitoring /> },
      ],
    },
    {
      path: 'login',
      element: <LoginPage />,
    },
    {
      path: 'create-article',
      element: <BlogPage />,
    },
    {
      path: 'edit-article/:id',
      element: <BlogPage />,
    },
    {
      path: '404',
      element: <Page404 />,
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
    {
      path: 'select-thumbnail',
      element: <SelectOptionView />,
    },
    {
      path: 'confirm-upload',
      element: <ConfirmUpload />,
    },
    { path: 'membership', element: <Membership /> },
    { path: 'membership-profile', element: <MembershipProfile /> },
  ]);

  return routes;
}
