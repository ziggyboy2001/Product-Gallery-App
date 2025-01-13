import React from 'react';
import { View } from 'react-native';
import { ProductList } from '../components/ProductList';

export const ProductsScreen: React.FC = () => {
  return (
    <View style={{ flex: 1 }}>
      <ProductList onProductPress={() => {}} />
    </View>
  );
}; 