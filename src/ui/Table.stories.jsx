import React from 'react';
import Table from './Table';

export default {
  title: 'UI/Table',
  component: Table,
};

const columns = [
  { key: 'name', header: 'Name', sortable: true },
  { key: 'role', header: 'Role', sortable: true },
  { key: 'age', header: 'Age', sortable: true, align: 'right' },
];

const data = [
  { name: 'Ada Lovelace', role: 'Mathematician', age: 36 },
  { name: 'Alan Turing', role: 'Computer Scientist', age: 41 },
  { name: 'Grace Hopper', role: 'Rear Admiral', age: 85 },
  { name: 'Katherine Johnson', role: 'Mathematician', age: 101 },
];

export const Basic = () => (
  <Table columns={columns} data={data} caption="Famous technologists" />
);

export const CompactZebra = () => (
  <Table columns={columns} data={data} density="compact" zebra caption="Compact zebra table" />
);

