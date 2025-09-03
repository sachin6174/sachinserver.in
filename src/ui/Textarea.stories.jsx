import React, { useState } from 'react';
import Textarea from './Textarea';

export default {
  title: 'UI/Textarea',
  component: Textarea,
  argTypes: {
    size: { control: { type: 'select' }, options: ['sm', 'md', 'lg'] }
  }
};

const Template = (args) => {
  const [value, setValue] = useState('');
  return <Textarea {...args} value={value} onChange={(e) => setValue(e.target.value)} />;
};

export const Default = Template.bind({});
Default.args = { label: 'Message', placeholder: 'Type here…', rows: 6 };

