import React from 'react';
import { useWindowDimensions } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { SplitScreenLayout } from './SplitScreenLayout';
import { useTheme } from '../theme/ThemeContext';

const Stack = createNativeStackNavigator();

export function ProductsNavigator() {
  const { theme } = useTheme();
  const { width } = useWindowDimensions();
  const isTablet = width >= 768;

  if (isTablet) {
    return <SplitScreenLayout />;
  }

  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: theme.colors.card,
        },
        headerTintColor: theme.colors.text,
        contentStyle: {
          backgroundColor: theme.colors.background,
        },
      }}
    >
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen as any}
        options={{
          title: 'Products',
        }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen as any}
        options={{
          title: 'Product Details',
        }}
      />
    </Stack.Navigator>
  );
} 