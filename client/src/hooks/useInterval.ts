import React, { useEffect, useRef } from 'react';

const useInterval = (callback1: () => void, callback2: () => void, delay: number, isNotExistEmail: boolean | null, count: number): void => {
  const savedCallback = useRef<() => void>();

  useEffect(() => {
    if (isNotExistEmail) {
      savedCallback.current = callback1;
    }
  }, [callback1, isNotExistEmail]);

  useEffect(() => {
    function tick() {
      if (savedCallback.current !== undefined) {
        savedCallback.current();
      }
    }

    if (isNotExistEmail) {
      if (delay !== null && count > 0) {
        const id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    } else {
      callback2();
    }
  }, [delay, count, isNotExistEmail]);
};

export default useInterval;
