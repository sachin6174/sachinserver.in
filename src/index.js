import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/theme.css';
import './index.css';
import App from './App';
import { ToastProvider } from './ui';
import { initializeDevHelpers } from './utils/devHelpers';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

// Initialize development helpers
initializeDevHelpers();

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ToastProvider>
      <App />
    </ToastProvider>
  </React.StrictMode>
);

// Register service worker for caching and offline functionality
serviceWorkerRegistration.register({
  onSuccess: () => {
    if (process.env.NODE_ENV === 'development') {
      console.log('App is cached and ready for offline use');
    }
  },
  onUpdate: (registration) => {
    if (process.env.NODE_ENV === 'development') {
      console.log('New content is available; please refresh');
    }
    // Optional: Show update notification to user
    if (window.confirm('A new version is available. Refresh to update?')) {
      registration.waiting?.postMessage({ type: 'SKIP_WAITING' });
      window.location.reload();
    }
  }
});

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();
