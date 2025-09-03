import React from 'react';
import Breadcrumb from './Breadcrumb';

export default {
  title: 'UI/Breadcrumb',
  component: Breadcrumb,
};

export const Basic = () => (
  <Breadcrumb items={[
    { label: 'Home', href: '#' },
    { label: 'Library', href: '#' },
    { label: 'Data', current: true },
  ]} />
);

