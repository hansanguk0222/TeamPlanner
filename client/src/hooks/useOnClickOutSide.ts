import { useEffect } from 'react';

const root = document.getElementById('root') as HTMLElement;

const useOnClickOutside = (ref: React.MutableRefObject<any>, handler: (args: any) => any): void => {
  useEffect(() => {
    const listener = (e: Event) => {
      if (!ref.current || ref.current.contains(e.target)) {
        return;
      }
      handler(e);
    };

    root.addEventListener('mousedown', listener);

    return () => {
      root.removeEventListener('mousedown', listener);
    };
  }, [ref, handler]);
};

export default useOnClickOutside;
