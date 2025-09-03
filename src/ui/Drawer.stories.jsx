import React, { useState } from 'react';
import Drawer from './Drawer';

export default { title: 'UI/Drawer', component: Drawer };

export const Basic = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Drawer</button>
      <Drawer open={open} onClose={() => setOpen(false)} title="Details">
        <p>Drawer content goes here.</p>
      </Drawer>
    </div>
  );
};

