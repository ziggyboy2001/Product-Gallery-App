import React from 'react';
import { View, StyleSheet } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/types';
import { ProductList } from '../components/ProductList';
import { useTheme } from '../theme/ThemeContext';
import { Product } from '@/types/product';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductList'>;

export const ProductListScreen: React.FC<Props> = ({ navigation }) => {
  const { theme } = useTheme();

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
  });

  const handleProductPress = (product: Product) => {
    navigation.navigate('ProductDetail', { product });
  };

  return (
    <View style={styles.container}>
      <ProductList 
        onProductPress={handleProductPress}
      />
    </View>
  );
}; 