import React, { useId } from 'react';
import './Radio.css';

export default function Radio({
  id,
  name,
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
    <div className={["ui-radio", disabled && 'is-disabled', error && 'is-error', className].filter(Boolean).join(' ')}>
      <input
        id={inputId}
        type="radio"
        name={name}
        className="ui-radio__input"
        aria-describedby={describedBy}
        aria-invalid={!!error}
        required={required}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      {label && (
        <label htmlFor={inputId} className="ui-radio__label">
          <span className="ui-radio__dot" aria-hidden />
          <span className="ui-radio__text">{label} {required ? <span className="ui-radio__required" aria-hidden>*</span> : null}</span>
        </label>
      )}
      {hint ? <div id={hintId} className="ui-radio__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="ui-radio__error">{error}</div> : null}
    </div>
  );
}

