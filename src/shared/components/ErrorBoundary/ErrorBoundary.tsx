import { ErrorBoundary as ReactErrorBoundary, type FallbackProps } from 'react-error-boundary';
import styles from './ErrorBoundary.module.css';

interface ErrorBoundaryProps {
  children: React.ReactNode;
  resetKeys?: unknown[];
  onError?: (error: unknown, info: React.ErrorInfo) => void;
  FallbackComponent?: React.ComponentType<FallbackProps>;
}

function DefaultFallback({ error, resetErrorBoundary }: FallbackProps) {
  const message = error instanceof Error ? error.message : 'An unexpected error occurred';
  return (
    <div role="alert" className={styles['error-boundary']}>
      <p className={styles['error-boundary__title']}>Something went wrong</p>
      <p className={styles['error-boundary__message']}>{message}</p>
      <button className={styles['error-boundary__retry']} onClick={resetErrorBoundary}>
        Try again
      </button>
    </div>
  );
}

export function ErrorBoundary({
  children,
  resetKeys,
  onError,
  FallbackComponent = DefaultFallback,
}: ErrorBoundaryProps) {
  return (
    <ReactErrorBoundary
      FallbackComponent={FallbackComponent}
      resetKeys={resetKeys}
      onError={onError}
    >
      {children}
    </ReactErrorBoundary>
  );
}
