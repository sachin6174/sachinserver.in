import React, { useState } from 'react';
import Checkbox from './Checkbox';

export default {
  title: 'UI/Checkbox',
  component: Checkbox,
  parameters: { a11y: { disable: false } }
};

export const Basic = () => {
  const [checked, setChecked] = useState(false);
  return (
    <Checkbox label="Accept terms" hint="You can change this later" checked={checked} onChange={e => setChecked(e.target.checked)} />
  );
};

export const Error = () => (
  <Checkbox label="Subscribe" error="You must accept to proceed" />
);

export const Disabled = () => (
  <Checkbox label="Disabled checkbox" disabled />
);

