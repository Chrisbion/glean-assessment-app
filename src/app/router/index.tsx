/* eslint-disable react-refresh/only-export-components */
import { lazy, Suspense } from 'react';
import { createBrowserRouter } from 'react-router-dom';
import AppLayout from '@/app/layouts/AppLayout';

const CounterPage = lazy(() => import('@/pages/CounterPage'));
const FeedPage = lazy(() => import('@/pages/FeedPage'));

const PageLoader = () => <div role="status" aria-label="Loading page" />;

export const router = createBrowserRouter([
  {
    path: '/',
    element: <AppLayout />,
    children: [
      {
        index: true,
        element: (
          <Suspense fallback={<PageLoader />}>
            <CounterPage />
          </Suspense>
        ),
      },
      {
        path: 'feed',
        element: (
          <Suspense fallback={<PageLoader />}>
            <FeedPage />
          </Suspense>
        ),
      },
    ],
  },
]);
