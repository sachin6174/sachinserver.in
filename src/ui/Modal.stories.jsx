import React, { useState } from 'react';
import Modal from './Modal';

export default { title: 'UI/Modal', component: Modal };

export const Basic = () => {
  const [open, setOpen] = useState(false);
  return (
    <div>
      <button onClick={() => setOpen(true)}>Open Modal</button>
      <Modal open={open} onClose={() => setOpen(false)} title="Modal title">
        <p>Modal content goes here.</p>
      </Modal>
    </div>
  );
};

