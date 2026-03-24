import { Outlet, useLocation } from 'react-router-dom';
import { ErrorBoundary } from '@/shared/components/ErrorBoundary';

export default function AppLayout() {
  const location = useLocation();

  return (
    <ErrorBoundary
      resetKeys={[location.pathname]}
      onError={(error, info) => console.error('[ErrorBoundary]', error, info)}
    >
      <main>
        <Outlet />
      </main>
    </ErrorBoundary>
  );
}
