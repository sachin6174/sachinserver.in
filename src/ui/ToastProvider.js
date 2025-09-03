import React, { createContext, useContext, useState, useCallback } from 'react';
import './Toast.css';

const ToastContext = createContext(null);

export function ToastProvider({ children, duration = 3000 }) {
  const [toasts, setToasts] = useState([]);

  const remove = useCallback((id) => setToasts((t) => t.filter(toast => toast.id !== id)), []);

  const push = useCallback((toast) => {
    const id = Math.random().toString(36).slice(2);
    const item = { id, variant: 'info', ...toast };
    setToasts((t) => [...t, item]);
    const timeout = setTimeout(() => remove(id), toast.duration ?? duration);
    return () => { clearTimeout(timeout); remove(id); };
  }, [duration, remove]);

  const api = {
    push,
    info: (m, opts) => push({ message: m, variant: 'info', ...opts }),
    success: (m, opts) => push({ message: m, variant: 'success', ...opts }),
    warning: (m, opts) => push({ message: m, variant: 'warning', ...opts }),
    danger: (m, opts) => push({ message: m, variant: 'danger', ...opts }),
  };

  return (
    <ToastContext.Provider value={api}>
      {children}
      <div className="ui-toast__region" role="status" aria-live="polite" aria-atomic="true">
        {toasts.map((t) => (
          <div key={t.id} className={["ui-toast", `ui-toast--${t.variant}`].join(' ')}>
            <div className="ui-toast__body">{t.title ? <strong className="ui-toast__title">{t.title}</strong> : null}{t.message}</div>
            <button className="ui-toast__close" aria-label="Close" onClick={() => remove(t.id)}>×</button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within a ToastProvider');
  return ctx;
}

