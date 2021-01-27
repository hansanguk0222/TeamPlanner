import React from 'react';

export const MagnifyingGlass: React.FC = () => {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="30px" height="30px">
      <g>
        <circle cx="15" cy="15" r="5" fill="none" stroke="white" strokeWidth="3px" />
        <line x1="18" x2="25" y1="18" y2="25" stroke="white" strokeWidth="3px" />
      </g>
    </svg>
  );
};
