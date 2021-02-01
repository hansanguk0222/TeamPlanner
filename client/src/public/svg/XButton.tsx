import React from 'react';

export const XButton: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="16px" height="16px">
      <g>
        <line x1="0" x2="16" y1="0" y2="16" stroke="black" strokeWidth="3px" />
        <line x1="16" x2="0" y1="0" y2="16" stroke="black" strokeWidth="3px" />
      </g>
    </svg>
  );
};
