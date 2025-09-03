import React from 'react';
import './Breadcrumb.css';

// items: [{ label, href, onClick, current?: boolean }]
export default function Breadcrumb({ items = [], className = '', separator = '›', ...props }) {
  return (
    <nav className={["ui-breadcrumb", className].filter(Boolean).join(' ')} aria-label="Breadcrumb" {...props}>
      <ol className="ui-breadcrumb__list">
        {items.map((item, idx) => {
          const isCurrent = !!item.current || idx === items.length - 1;
          return (
            <li key={idx} className="ui-breadcrumb__item">
              {isCurrent ? (
                <span className="ui-breadcrumb__current" aria-current="page">{item.label}</span>
              ) : item.href ? (
                <a className="ui-breadcrumb__link" href={item.href} onClick={item.onClick}>{item.label}</a>
              ) : (
                <button type="button" className="ui-breadcrumb__link" onClick={item.onClick}>{item.label}</button>
              )}
              {idx < items.length - 1 ? <span className="ui-breadcrumb__sep" aria-hidden>{separator}</span> : null}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

