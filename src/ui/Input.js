import React, { useId } from 'react';
import './Input.css';

export default function Input({
  id,
  label,
  required = false,
  hint,
  error,
  success = false,
  size = 'md', // sm | md | lg
  className = '',
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  const inputClasses = [
    'input',
    size && `input--${size}`,
    error && 'input--error',
    success && 'input--success',
    className
  ].filter(Boolean).join(' ');

  return (
    <div className="field">
      {label && (
        <label htmlFor={inputId} className="field__label">
          {label}
          {required ? <span className="field__required" aria-hidden>*</span> : null}
        </label>
      )}
      <input id={inputId} aria-describedby={describedBy} aria-invalid={!!error} required={required} className={inputClasses} {...props} />
      {hint ? <div id={hintId} className="field__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="field__error">{error}</div> : null}
    </div>
  );
}

