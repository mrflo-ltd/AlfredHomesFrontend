import React from 'react';

const LEFT_ARROW_CODE = 'ArrowLeft';
const LEGACY_LEFT_ARROW_CODE = '37';
const RIGHT_ARROW_CODE = 'ArrowRight';
const LEGACY_RIGHT_ARROW_CODE = '39';

export const useNavigationKeys = (
  onPreviousKeydown?: () => void,
  onNextKeydown?: () => void
) => {
  const handleKeydown = (event: KeyboardEvent) => {
    if (
      (event.code === LEFT_ARROW_CODE ||
        event.code === LEGACY_LEFT_ARROW_CODE) &&
      onPreviousKeydown
    ) {
      onPreviousKeydown();
    }

    if (
      (event.code === RIGHT_ARROW_CODE ||
        event.code === LEGACY_RIGHT_ARROW_CODE) &&
      onNextKeydown
    ) {
      onNextKeydown();
    }
  };

  React.useEffect(() => {
    document.addEventListener('keydown', handleKeydown);
    return () => {
      document.removeEventListener('keydown', handleKeydown);
    };
  });
};
