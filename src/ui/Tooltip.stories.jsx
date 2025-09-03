import React from 'react';
import Tooltip from './Tooltip';

export default {
  title: 'UI/Tooltip',
  component: Tooltip,
};

export const Positions = () => (
  <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
    <Tooltip content="Top tooltip" placement="top"><button>Top</button></Tooltip>
    <Tooltip content="Right tooltip" placement="right"><button>Right</button></Tooltip>
    <Tooltip content="Bottom tooltip" placement="bottom"><button>Bottom</button></Tooltip>
    <Tooltip content="Left tooltip" placement="left"><button>Left</button></Tooltip>
  </div>
);

