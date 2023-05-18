import React from 'react';

const ESCAPE_KEY_CODE = 'Escape';
const LEGACY_ESCAPE_KEY_CODE = '27';

export const useEscKeydown = (onEscKeydown?: () => void) => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (
      (event.code === ESCAPE_KEY_CODE ||
        event.code === LEGACY_ESCAPE_KEY_CODE) &&
      onEscKeydown
    ) {
      onEscKeydown();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
};
