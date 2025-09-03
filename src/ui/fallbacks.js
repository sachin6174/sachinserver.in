import React from 'react';
import { Alert, Button } from './index';

/**
 * makeAlertFallback
 * Returns an ErrorBoundary fallback renderer that shows a tokenized Alert with reset action.
 * Usage: errorFallback: makeAlertFallback({ variant: 'danger', title: 'Failed to load' })
 */
export function makeAlertFallback({ variant = 'danger', title = 'Something went wrong', showError = true, showId = true, actionLabel = 'Try Again' } = {}) {
  return function AlertFallback({ error, reset, errorId }) {
    return (
      <Alert variant={variant} title={title}>
        {showError && error?.message ? <div style={{ marginBottom: 8 }}>{String(error.message)}</div> : null}
        <div style={{ display: 'flex', gap: 8 }}>
          <Button size="sm" variant="outline" onClick={reset}>{actionLabel}</Button>
        </div>
        {showId ? (
          <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: 6 }}>Error ID: {errorId}</div>
        ) : null}
      </Alert>
    );
  };
}

