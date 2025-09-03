import React from 'react';
import './Tag.css';

export default function Tag({
  as: As = 'span',
  variant = 'neutral', // neutral | success | warning | danger | info | brand
  size = 'md', // sm | md | lg
  className = '',
  children,
  ...props
}) {
  const classes = [
    'ui-tag',
    variant && `ui-tag--${variant}`,
    size && `ui-tag--${size}`,
    className
  ].filter(Boolean).join(' ');

  return (
    <As className={classes} {...props}>
      {children}
    </As>
  );
}

