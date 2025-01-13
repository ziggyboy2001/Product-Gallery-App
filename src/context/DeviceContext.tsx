import React, { createContext, useContext, useEffect, useState } from 'react';
import { Dimensions } from 'react-native';

interface DeviceContextType {
  isTablet: boolean;
}

const DeviceContext = createContext<DeviceContextType>({ isTablet: false });

export const useDevice = () => useContext(DeviceContext);

export const DeviceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isTablet, setIsTablet] = useState(false);

  useEffect(() => {
    const { width, height } = Dimensions.get('window');
    const aspectRatio = height / width;
    setIsTablet(aspectRatio <= 1.6);

    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      const newAspectRatio = window.height / window.width;
      setIsTablet(newAspectRatio <= 1.6);
    });

    return () => subscription.remove();
  }, []);

  return (
    <DeviceContext.Provider value={{ isTablet }}>
      {children}
    </DeviceContext.Provider>
  );
}; 