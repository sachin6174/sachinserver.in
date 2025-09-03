import React from 'react';
import { ToastProvider, useToast } from './ToastProvider';

export default {
  title: 'UI/Toast',
};

function Demo() {
  const toast = useToast();
  return (
    <div style={{ display: 'flex', gap: 8, flexWrap: 'wrap' }}>
      <button onClick={() => toast.info('Informational message')}>Info</button>
      <button onClick={() => toast.success('Saved successfully')}>Success</button>
      <button onClick={() => toast.warning('Be careful with this action')}>Warning</button>
      <button onClick={() => toast.danger('Something went wrong')}>Danger</button>
    </div>
  );
}

export const Basic = () => (
  <ToastProvider>
    <Demo />
  </ToastProvider>
);

