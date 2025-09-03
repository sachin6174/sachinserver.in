import React, { useState } from 'react';
import Sheet from './Sheet';

export default { title: 'UI/Sheet', component: Sheet };

export const Right = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Sheet</button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Settings" side="right">
        <p>Panel content goes here.</p>
      </Sheet>
    </div>
  );
};

export const Left = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Left Sheet</button>
      <Sheet open={open} onClose={() => setOpen(false)} title="Filters" side="left">
        <p>Left panel content goes here.</p>
      </Sheet>
    </div>
  );
};

