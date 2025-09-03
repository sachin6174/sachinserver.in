import React, { useId } from 'react';
import './Switch.css';

export default function Switch({
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
    <div className={["ui-switch", disabled && 'is-disabled', error && 'is-error', className].filter(Boolean).join(' ')}>
      <input
        id={inputId}
        type="checkbox"
        role="switch"
        className="ui-switch__input"
        aria-describedby={describedBy}
        aria-invalid={!!error}
        required={required}
        disabled={disabled}
        checked={checked}
        onChange={onChange}
        {...props}
      />
      <label htmlFor={inputId} className="ui-switch__label">
        <span className="ui-switch__track" aria-hidden>
          <span className="ui-switch__thumb" />
        </span>
        {label ? <span className="ui-switch__text">{label} {required ? <span className="ui-switch__required" aria-hidden>*</span> : null}</span> : null}
      </label>
      {hint ? <div id={hintId} className="ui-switch__hint">{hint}</div> : null}
      {error ? <div id={errorId} className="ui-switch__error">{error}</div> : null}
    </div>
  );
}

