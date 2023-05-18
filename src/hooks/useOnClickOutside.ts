import React from 'react';

export const useOnClickOutside = <RefType>(
  ref: React.MutableRefObject<RefType>,
  fn: (event: Event) => void
) => {
  React.useEffect(() => {
    const handleClick = (event: Event) => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      if (!ref.current || (ref.current as any).contains?.(event.target)) {
        return;
      }

      fn(event);
    };

    document.addEventListener('mousedown', handleClick);
    document.addEventListener('touchstart', handleClick);

    return () => {
      document.removeEventListener('mousedown', handleClick);
      document.removeEventListener('touchstart', handleClick);
    };
  }, [ref, fn]);
};
