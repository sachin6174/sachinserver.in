import React, { useId, useState, useRef, useEffect, useCallback } from 'react';
import './Tabs.css';

// items: [{ id, label, content, disabled? }]
export default function Tabs({
  items = [],
  value,
  onChange,
  defaultValue,
  className = '',
  orientation = 'horizontal', // horizontal | vertical
  ...props
}) {
  const fallbackId = useId();
  const isControlled = value !== undefined;
  const [internal, setInternal] = useState(defaultValue ?? items[0]?.id);
  const active = isControlled ? value : internal;

  const tabRefs = useRef({});
  const setRef = (id, el) => { tabRefs.current[id] = el; };

  const select = useCallback((id) => {
    if (onChange) onChange(id);
    if (!isControlled) setInternal(id);
  }, [isControlled, onChange]);

  const focusTabByIndex = (nextIdx) => {
    const enabled = items.filter(i => !i.disabled);
    if (enabled.length === 0) return;
    const clamped = (nextIdx + items.length) % items.length;
    const next = items[clamped];
    if (next?.disabled) {
      // find next enabled in direction
      let i = clamped;
      let tries = 0;
      while (tries < items.length) {
        i = (i + 1) % items.length;
        if (!items[i].disabled) { select(items[i].id); tabRefs.current[items[i].id]?.focus(); break; }
        tries++;
      }
    } else {
      select(next.id);
      tabRefs.current[next.id]?.focus();
    }
  };

  const onKeyDown = (e) => {
    const idx = items.findIndex(i => i.id === active);
    if (idx === -1) return;
    const isH = orientation !== 'vertical';
    switch (e.key) {
      case 'ArrowRight': if (isH) { e.preventDefault(); focusTabByIndex(idx + 1); } break;
      case 'ArrowLeft': if (isH) { e.preventDefault(); focusTabByIndex(idx - 1); } break;
      case 'ArrowDown': if (!isH) { e.preventDefault(); focusTabByIndex(idx + 1); } break;
      case 'ArrowUp': if (!isH) { e.preventDefault(); focusTabByIndex(idx - 1); } break;
      case 'Home': e.preventDefault(); focusTabByIndex(0); break;
      case 'End': e.preventDefault(); focusTabByIndex(items.length - 1); break;
      default: break;
    }
  };

  useEffect(() => {
    if (active == null && items[0]) {
      select(items[0].id);
    }
  }, [active, items, select]);

  return (
    <div className={["ui-tabs", `ui-tabs--${orientation}`, className].filter(Boolean).join(' ')} {...props}>
      <div className="ui-tabs__list" role="tablist" aria-orientation={orientation} onKeyDown={onKeyDown}>
        {items.map((item) => {
          const isActive = item.id === active;
          const tabId = `${fallbackId}-tab-${item.id}`;
          const panelId = `${fallbackId}-panel-${item.id}`;
          return (
            <button
              key={item.id}
              id={tabId}
              role="tab"
              aria-selected={isActive}
              aria-controls={panelId}
              tabIndex={isActive ? 0 : -1}
              disabled={item.disabled}
              className={["ui-tabs__tab", isActive && 'is-active'].filter(Boolean).join(' ')}
              onClick={() => select(item.id)}
              ref={(el) => setRef(item.id, el)}
            >
              {item.label}
            </button>
          );
        })}
      </div>
      {items.map((item) => {
        const isActive = item.id === active;
        const panelId = `${fallbackId}-panel-${item.id}`;
        const tabId = `${fallbackId}-tab-${item.id}`;
        return (
          <div
            key={item.id}
            id={panelId}
            role="tabpanel"
            aria-labelledby={tabId}
            hidden={!isActive}
            className="ui-tabs__panel"
          >
            {typeof item.content === 'function' ? item.content() : item.content}
          </div>
        );
      })}
    </div>
  );
}

