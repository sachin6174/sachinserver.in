import React, { useId } from 'react';
import './Tooltip.css';

export default function Tooltip({
  children,
  content,
  placement = 'top', // top | right | bottom | left
  className = '',
  ...props
}) {
  const id = useId();
  return (
    <span className={["ui-tooltip", `ui-tooltip--${placement}`, className].filter(Boolean).join(' ')} {...props}>
      <span className="ui-tooltip__trigger" tabIndex={0} aria-describedby={id}>
        {children}
      </span>
      <span id={id} role="tooltip" className="ui-tooltip__bubble">
        {content}
      </span>
    </span>
  );
}

