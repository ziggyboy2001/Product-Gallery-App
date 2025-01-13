import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ProductStackParamList } from './types';
import { ProductListScreen } from '../screens/ProductListScreen';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';

const Stack = createNativeStackNavigator<ProductStackParamList>();

export const ProductStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerBackTitleVisible: false,
      }}
    >
      <Stack.Screen 
        name="ProductList" 
        component={ProductListScreen}
        options={{ title: 'Products' }}
      />
      <Stack.Screen 
        name="ProductDetail" 
        component={ProductDetailScreen}
        options={({ route }) => ({ 
          title: route.params.product.title 
        })}
      />
    </Stack.Navigator>
  );
}; 