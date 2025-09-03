import React, { useEffect } from 'react';
import './Drawer.css';

export default function Drawer({ open, onClose, title, children, className = '', labelledById, ...props }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const labelId = labelledById || (title ? 'drawer-title' : undefined);
  return (
    <div className={["ui-drawer", className].filter(Boolean).join(' ')} role="dialog" aria-modal="true" aria-labelledby={labelId} onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }} {...props}>
      <div className="ui-drawer__panel">
        {title ? <h3 id={labelId} className="ui-drawer__title">{title}</h3> : null}
        <div className="ui-drawer__body">{children}</div>
        {onClose ? <button className="ui-drawer__close" onClick={onClose} aria-label="Close">×</button> : null}
      </div>
    </div>
  );
}

