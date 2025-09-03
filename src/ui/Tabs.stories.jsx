import React, { useState } from 'react';
import Tabs from './Tabs';

export default {
  title: 'UI/Tabs',
  component: Tabs,
};

const items = [
  { id: 'one', label: 'One', content: 'Tab one content' },
  { id: 'two', label: 'Two', content: 'Tab two content' },
  { id: 'three', label: 'Three', content: 'Tab three content', disabled: false },
];

export const Uncontrolled = () => (
  <Tabs items={items} />
);

export const Controlled = () => {
  const [val, setVal] = useState('two');
  return <Tabs items={items} value={val} onChange={setVal} />;
};

