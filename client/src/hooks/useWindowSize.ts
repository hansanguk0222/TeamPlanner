import React, { useEffect } from 'react';

const useWindowSize = ({ handleWindowSizeChange }: { handleWindowSizeChange: () => void }): void => {
  useEffect(() => {
    function handleResize() {
      handleWindowSizeChange();
    }
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
};

export default useWindowSize;
