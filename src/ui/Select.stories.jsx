import React, { useState } from 'react';
import Select from './Select';

export default {
  title: 'UI/Select',
  component: Select,
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] }
  }
};

const options = [
  { value: 'opt1', label: 'Option One' },
  { value: 'opt2', label: 'Option Two' },
  { value: 'opt3', label: 'Option Three' }
];

const Template = (args) => {
  const [value, setValue] = useState('opt1');
  return <Select {...args} value={value} onChange={(e) => setValue(e.target.value)} options={options} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Choose an option', required: true };

