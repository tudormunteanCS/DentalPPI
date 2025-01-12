import { useCallback } from 'react';
import { Preferences } from '@capacitor/preferences';

export function usePreferences() {
  const get = useCallback(
    (key) =>
      Preferences.get({ key }).then(result => result.value),
    []
  );

  const set = useCallback(
    (key, value) => {
      
      // Store the value in Preferences
      Preferences.set({ key, value });
    },
    []
  );
  

  return { get, set };
}
