import React from 'react';
import Card from './Card';
import Button from './Button';

export default {
  title: 'UI/Card',
  component: Card
};

export const Basic = () => (
  <Card title="Card Title" footer={<Button size="sm">Action</Button>}>
    This is a basic card using design tokens.
  </Card>
);

export const Elevated = () => (
  <Card elevated title="Elevated Card" footer={<Button size="sm" variant="outline">Secondary</Button>}>
    Elevated variant with stronger shadow.
  </Card>
);

