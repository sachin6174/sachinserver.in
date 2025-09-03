import React from 'react';
import Button from './Button';

export default {
  title: 'UI/Button',
  component: Button,
  argTypes: {
    variant: {
      control: { type: 'select' },
      options: ['solid', 'outline', 'ghost', 'link']
    },
    size: {
      control: { type: 'select' },
      options: ['sm', 'md', 'lg']
    },
    full: { control: 'boolean' },
    loading: { control: 'boolean' }
  }
};

const Template = (args) => <Button {...args} />;

export const Solid = Template.bind({});
Solid.args = { children: 'Primary Action', variant: 'solid', size: 'md' };

export const Outline = Template.bind({});
Outline.args = { children: 'Secondary Action', variant: 'outline', size: 'md' };

export const Ghost = Template.bind({});
Ghost.args = { children: 'Ghost Button', variant: 'ghost' };

export const Link = Template.bind({});
Link.args = { children: 'Link Button', variant: 'link' };

export const Loading = Template.bind({});
Loading.args = { children: 'Loading…', loading: true };

