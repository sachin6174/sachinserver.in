import React from 'react';
import './Button.css';

export default function Button({
  as: As = 'button',
  variant = 'solid', // solid | outline | ghost | link
  size = 'md', // sm | md | lg
  full = false,
  disabled = false,
  loading = false,
  iconLeft = null,
  iconRight = null,
  children,
  className = '',
  ...props
}) {
  const classes = [
    'btn',
    variant && `btn--${variant}`,
    size && `btn--${size}`,
    full && 'btn--full',
    loading && 'btn--loading',
    className
  ].filter(Boolean).join(' ');

  // For <button>, sync the disabled attribute; for <a>, use aria-disabled
  const common = As === 'button' ? { disabled: disabled || loading } : { 'aria-disabled': disabled || loading };

  return (
    <As className={classes} {...common} {...props}>
      {iconLeft ? <span className="btn__icon" aria-hidden>{iconLeft}</span> : null}
      {children}
      {iconRight ? <span className="btn__icon" aria-hidden>{iconRight}</span> : null}
    </As>
  );
}

