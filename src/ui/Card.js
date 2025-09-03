import React from 'react';
import './Card.css';

export default function Card({
  title,
  footer,
  elevated = false,
  children,
  className = '',
  ...props
}) {
  const classes = ['card', elevated && 'card--elevated', className].filter(Boolean).join(' ');
  return (
    <section className={classes} {...props}>
      {title ? <header className="card__header">{title}</header> : null}
      <div className="card__content">{children}</div>
      {footer ? <footer className="card__footer">{footer}</footer> : null}
    </section>
  );
}

