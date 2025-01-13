import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { RootTabParamList } from './types';
import { ProductStack } from './ProductStack';
import { useDevice } from '../context/DeviceContext';
import { TabletLayout } from '../components/TabletLayout';

const Tab = createBottomTabNavigator<RootTabParamList>();

export const RootNavigator = () => {
  const { isTablet } = useDevice();

  if (isTablet) {
    return <TabletLayout />;
  }

  return (
    <Tab.Navigator>
      <Tab.Screen 
        name="Products" 
        component={ProductStack}
        options={{ headerShown: false }}
      />
    </Tab.Navigator>
  );
}; 