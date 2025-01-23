import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export function useOnboarding() {
  const [showOnboarding, setShowOnboarding] = useState('');

  const getOnboarding = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("IS_ONBOARDED");
      if (jsonValue) return setShowOnboarding('false');
      return setShowOnboarding('true');
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getOnboarding()
  }, []);

  const onFirstLaunchClosed = async () => {
    await AsyncStorage.setItem('IS_ONBOARDED', 'true');
    setShowOnboarding('false');
  };

  return {
    showOnboarding,
    onFirstLaunchClosed,
  };
}
