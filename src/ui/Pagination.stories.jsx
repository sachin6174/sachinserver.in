import React, { useState } from 'react';
import Pagination from './Pagination';

export default {
  title: 'UI/Pagination',
  component: Pagination,
};

export const Basic = () => {
  const [page, setPage] = useState(3);
  return <Pagination page={page} pageCount={10} onPageChange={setPage} />;
};

