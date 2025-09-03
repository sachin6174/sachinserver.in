import React, { useState } from 'react';
import Radio from './Radio';

export default {
  title: 'UI/Radio',
  component: Radio,
};

export const Group = () => {
  const [value, setValue] = useState('a');
  return (
    <div role="radiogroup" aria-label="Example group">
      <Radio name="example" label="Option A" checked={value === 'a'} onChange={() => setValue('a')} />
      <Radio name="example" label="Option B" checked={value === 'b'} onChange={() => setValue('b')} />
      <Radio name="example" label="Option C" checked={value === 'c'} onChange={() => setValue('c')} />
    </div>
  );
};

export const Error = () => (
  <Radio name="err" label="Invalid option" error="Select a valid option" />
);

