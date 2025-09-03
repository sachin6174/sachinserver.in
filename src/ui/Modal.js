import React, { useEffect } from 'react';
import './Modal.css';

export default function Modal({ open, onClose, title, children, className = '', labelledById, ...props }) {
  useEffect(() => {
    const onKey = (e) => { if (e.key === 'Escape' && open) onClose?.(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  if (!open) return null;
  const labelId = labelledById || (title ? 'modal-title' : undefined);
  return (
    <div className={["ui-modal", className].filter(Boolean).join(' ')} role="dialog" aria-modal="true" aria-labelledby={labelId} onClick={(e) => { if (e.target === e.currentTarget) onClose?.(); }} {...props}>
      <div className="ui-modal__content">
        {title ? <h3 id={labelId} className="ui-modal__title">{title}</h3> : null}
        <div className="ui-modal__body">{children}</div>
        {onClose ? <button className="ui-modal__close" onClick={onClose} aria-label="Close">×</button> : null}
      </div>
    </div>
  );
}

