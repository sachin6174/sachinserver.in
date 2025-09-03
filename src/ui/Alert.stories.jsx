import React from 'react';
import Alert from './Alert';

export default {
  title: 'UI/Alert',
  component: Alert,
};

export const Info = () => (
  <Alert variant="info" title="Heads up!">This is an informational message.</Alert>
);

export const Success = () => (
  <Alert variant="success" title="Saved!">Your changes have been saved successfully.</Alert>
);

export const Warning = () => (
  <Alert variant="warning" title="Be careful!">Double-check your inputs before proceeding.</Alert>
);

export const Danger = () => (
  <Alert variant="danger" title="Error!">Something went wrong submitting the form.</Alert>
);

export const Closable = () => (
  <Alert variant="info" title="Dismiss me" onClose={() => alert('Closed')}>You can close this alert.</Alert>
);

