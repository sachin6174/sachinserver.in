import React, { useId } from 'react';
import './Checkbox.css';

export default function Checkbox({
  id,
  label,
  hint,
  error,
  required = false,
  disabled = false,
  checked,
  onChange,
  className = '',
  ...props
}) {
  const autoId = useId();
  const inputId = id || autoId;
  const hintId = hint ? `${inputId}-hint` : undefined;
  const errorId = error ? `${inputId}-error` : undefined;
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined;

  return (
    <div className={["ui-checkbox", disabled && 'is-disabled', error && 'is-error', className].filter(Boolean).join(' ')}>
      <input
        id={inputId}
        type="checkbox"
        className="ui-checkbox__input"
        aria-describedby={describedBy}
        aria-invalid={!!error}
        required={required}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && (
        <label htmlFor={inputId} className="ui-checkbox__label">
          <span className="ui-checkbox__box" aria-hidden />
          <span className="ui-checkbox__text">{label} {required ? <span className="ui-checkbox__required" aria-hidden>*</span> : null}</span>
        </label>
      )}
      {hint ? <div id={hintId} className="ui-checkbox__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="ui-checkbox__error">{error}</div> : null}
    </div>
  );
}

