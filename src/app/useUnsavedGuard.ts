import { useEffect } from 'react';
import { useBlocker } from 'react-router-dom';
function preventUnload(event: BeforeUnloadEvent) {
  event.preventDefault();
  event.returnValue = '';
}
export function useUnsavedGuard(dirty: boolean) {
  useEffect(() => {
    if (dirty) window.addEventListener('beforeunload', preventUnload);
    return () => window.removeEventListener('beforeunload', preventUnload);
  }, [dirty]);
  return useBlocker(({ currentLocation, nextLocation }) => dirty && currentLocation.pathname !== nextLocation.pathname);
}
