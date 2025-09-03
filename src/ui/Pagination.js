import React from 'react';
import './Pagination.css';

export default function Pagination({
  page = 1,
  pageCount = 1,
  onPageChange,
  className = '',
  ariaLabel = 'Pagination',
}) {
  if (pageCount <= 1) return null;

  const go = (p) => {
    const next = Math.max(1, Math.min(pageCount, p));
    if (next !== page && onPageChange) onPageChange(next);
  };

  const range = getRange(page, pageCount);

  return (
    <nav className={["ui-pagination", className].filter(Boolean).join(' ')} role="navigation" aria-label={ariaLabel}>
      <button className="ui-pagination__btn" onClick={() => go(page - 1)} disabled={page <= 1} aria-label="Previous page">‹</button>
      <ul className="ui-pagination__list">
        {range.map((item, idx) => (
          <li key={idx}>
            {item === '…' ? (
              <span className="ui-pagination__ellipsis" aria-hidden>…</span>
            ) : (
              <button
                className={["ui-pagination__page", item === page && 'is-active'].filter(Boolean).join(' ')}
                aria-current={item === page ? 'page' : undefined}
                onClick={() => go(item)}
              >
                {item}
              </button>
            )}
          </li>
        ))}
      </ul>
      <button className="ui-pagination__btn" onClick={() => go(page + 1)} disabled={page >= pageCount} aria-label="Next page">›</button>
    </nav>
  );
}

function getRange(page, pageCount, sibling = 1) {
  const start = Math.max(1, page - sibling);
  const end = Math.min(pageCount, page + sibling);
  const range = [];
  if (start > 1) {
    range.push(1);
    if (start > 2) range.push('…');
  }
  for (let p = start; p <= end; p++) range.push(p);
  if (end < pageCount) {
    if (end < pageCount - 1) range.push('…');
    range.push(pageCount);
  }
  return range;
}

