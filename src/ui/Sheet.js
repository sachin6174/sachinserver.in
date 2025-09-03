import React, { useEffect } from 'react';
import './Sheet.css';

export default function Sheet({ open, onClose, title, side = 'right', children, className = '', labelledById, ...props }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const labelId = labelledById || (title ? 'sheet-title' : undefined);
  return (
    <div className={["ui-sheet", className].filter(Boolean).join(' ')} role="dialog" aria-modal="true" aria-labelledby={labelId} onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }} {...props}>
      <div className={["ui-sheet__panel", `is-${side}`].join(' ')}>
        {title ? <h3 id={labelId} className="ui-sheet__title">{title}</h3> : null}
        <div className="ui-sheet__body">{children}</div>
        {onClose ? <button className="ui-sheet__close" onClick={onClose} aria-label="Close">×</button> : null}
      </div>
    </div>
  );
}

