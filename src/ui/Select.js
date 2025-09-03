import React, { useId } from 'react';
import './Select.css';

export default function Select({
  id,
  label,
  required = false,
  hint,
  error,
  size = 'md', // sm | md | lg
  options = [], // [{ value, label }]
  className = '',
  ...props
}) {
  const autoId = useId();
  const selectId = id || autoId;
  const hintId = hint ? `${selectId}-hint` : undefined;
  const errorId = error ? `${selectId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const selectClasses = [
    'select',
    size && `select--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="field">
      {label && (
        <label htmlFor={selectId} className="field__label">
          {label}
          {required ? <span className="field__required" aria-hidden>*</span> : null}
        </label>
      )}
      <select id={selectId} aria-describedby={describedBy} aria-invalid={!!error} required={required} className={selectClasses} {...props}>
        {options.map(opt => (
          <option key={String(opt.value)} value={opt.value}>{opt.label}</option>
        ))}
      </select>
      {hint ? <div id={hintId} className="field__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="field__error">{error}</div> : null}
    </div>
  );
}

