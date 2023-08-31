import { useCallback, useEffect, useRef } from 'react';

const useClickOutsideAndEscape = (closePopup) => {
  const popupRef = useRef(null);

  const handleClickOutside = useCallback((event) => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      closePopup();
    }
  }, [closePopup]);

  const handleKeyDown = useCallback((event) => {
    if (event.keyCode === 27) {
      closePopup();
    }
  }, [closePopup]);

  useEffect(() => {
    if (popupRef.current) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [handleClickOutside, handleKeyDown]);

  return popupRef;
};

export default useClickOutsideAndEscape;
