import React, { useId } from 'react';
import './Textarea.css';

export default function Textarea({
  id,
  label,
  required = false,
  hint,
  error,
  size = 'md', // sm | md | lg
  className = '',
  rows = 4,
  ...props
}) {
  const autoId = useId();
  const textareaId = id || autoId;
  const hintId = hint ? `${textareaId}-hint` : undefined;
  const errorId = error ? `${textareaId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const classes = [
    'textarea',
    size && `textarea--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="field">
      {label && (
        <label htmlFor={textareaId} className="field__label">
          {label}
          {required ? <span className="field__required" aria-hidden>*</span> : null}
        </label>
      )}
      <textarea id={textareaId} aria-describedby={describedBy} aria-invalid={!!error} required={required} rows={rows} className={classes} {...props} />
      {hint ? <div id={hintId} className="field__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="field__error">{error}</div> : null}
    </div>
  );
}

