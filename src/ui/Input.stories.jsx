import React, { useState } from 'react';
import Input from './Input';

export default {
  title: 'UI/Input',
  component: Input,
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] }
  }
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return <Input {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Email', placeholder: 'name@example.com', required: true };

export const Error = Template.bind({});
Error.args = { label: 'Username', placeholder: 'Enter username', error: 'This field is required' };

export const Success = Template.bind({});
Success.args = { label: 'Amount', placeholder: '0.00', success: true, hint: 'Enter a positive number' };

