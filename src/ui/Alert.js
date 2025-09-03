import React from 'react';
import './Alert.css';

export default function Alert({
  variant = 'info', // info | success | warning | danger
  title,
  children,
  icon = null,
  onClose,
  className = '',
  ...props
}) {
  const classes = ['ui-alert', `ui-alert--${variant}`, className].filter(Boolean).join(' ');
  return (
    <div role={variant === 'danger' ? 'alert' : 'status'} className={classes} {...props}>
      {icon ? <div className="ui-alert__icon" aria-hidden>{icon}</div> : null}
      <div className="ui-alert__body">
        {title ? <div className="ui-alert__title">{title}</div> : null}
        {children ? <div className="ui-alert__content">{children}</div> : null}
      </div>
      {onClose ? (
        <button type="button" className="ui-alert__close" aria-label="Close" onClick={onClose}>
          ×
        </button>
      ) : null}
    </div>
  );
}

