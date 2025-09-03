import React, { useMemo, useState } from 'react';
import './Table.css';

// columns: [{ key, header, accessor?: (row) => any, sortable?: boolean, align?: 'left'|'center'|'right' }]
// data: array of objects (row)
export default function Table({
  columns = [],
  data = [],
  caption,
  zebra = true,
  density = 'comfortable', // comfortable | compact
  className = '',
  sortable = true,
  initialSort,
  ...props
}) {
  const [sort, setSort] = useState(initialSort || null); // { key, dir: 'asc'|'desc' }

  const sorted = useMemo(() => {
    if (!sort) return data;
    const col = columns.find(c => c.key === sort.key);
    if (!col) return data;
    const acc = col.accessor || ((row) => row[col.key]);
    const sortedData = [...data].sort((a, b) => {
      const va = acc(a);
      const vb = acc(b);
      if (va == null && vb == null) return 0;
      if (va == null) return 1;
      if (vb == null) return -1;
      if (typeof va === 'number' && typeof vb === 'number') {
        return va - vb;
      }
      return String(va).localeCompare(String(vb));
    });
    if (sort.dir === 'desc') sortedData.reverse();
    return sortedData;
  }, [data, sort, columns]);

  const onSortClick = (key, sortableCol) => {
    if (!sortable || !sortableCol) return;
    setSort((prev) => {
      if (!prev || prev.key !== key) return { key, dir: 'asc' };
      if (prev.dir === 'asc') return { key, dir: 'desc' };
      return null; // third click clears sort
    });
  };

  return (
    <div className={[
      'ui-table',
      zebra && 'ui-table--zebra',
      density === 'compact' ? 'ui-table--compact' : 'ui-table--comfortable',
      className
    ].filter(Boolean).join(' ')} {...props}>
      <table>
        {caption ? <caption>{caption}</caption> : null}
        <thead>
          <tr>
            {columns.map((col) => {
              const isSortable = sortable && col.sortable !== false;
              const isActive = sort && sort.key === col.key;
              const ariaSort = isActive ? (sort.dir === 'asc' ? 'ascending' : 'descending') : 'none';
              return (
                <th key={col.key} scope="col" style={{ textAlign: col.align || 'left' }} aria-sort={ariaSort}>
                  {isSortable ? (
                    <button type="button" className="ui-table__sort" onClick={() => onSortClick(col.key, true)} aria-label={`Sort by ${col.header}`}>
                      <span>{col.header}</span>
                      <span className={['ui-table__sort-ind', isActive ? `is-${sort.dir}` : ''].join(' ')} aria-hidden>▲</span>
                    </button>
                  ) : (
                    <span>{col.header}</span>
                  )}
                </th>
              );
            })}
          </tr>
        </thead>
        <tbody>
          {sorted.map((row, idx) => (
            <tr key={idx}>
              {columns.map((col) => {
                const acc = col.accessor || ((r) => r[col.key]);
                const value = acc(row);
                return (
                  <td key={col.key} style={{ textAlign: col.align || 'left' }}>
                    {value}
                  </td>
                );
              })}
            </tr>
          ))}
          {sorted.length === 0 ? (
            <tr className="ui-table__empty">
              <td colSpan={columns.length}>No data</td>
            </tr>
          ) : null}
        </tbody>
      </table>
    </div>
  );
}

