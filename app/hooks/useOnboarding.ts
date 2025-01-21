import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState(false);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      const firstLaunchVal = await AsyncStorage.getItem('IS_ONBOARDED');
      if (!firstLaunchVal) {
        setShowOnboarding(true);
      }
    };
    checkFirstLaunch();
  }, []);

  const onFirstLaunchClosed = async () => {
    await AsyncStorage.setItem('IS_ONBOARDED', 'true');
    setShowOnboarding(false);
  };

  return {
    showOnboarding,
    onFirstLaunchClosed,
  };
}
