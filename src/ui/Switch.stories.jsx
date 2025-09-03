import React, { useState } from 'react';
import Switch from './Switch';

export default {
  title: 'UI/Switch',
  component: Switch,
};

export const Basic = () => {
  const [on, setOn] = useState(false);
  return (
    <Switch label="Enable notifications" checked={on} onChange={e => setOn(e.target.checked)} />
  );
};

export const Disabled = () => (
  <Switch label="Disabled switch" disabled />
);

