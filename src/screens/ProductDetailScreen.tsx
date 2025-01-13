import React from 'react';
import { View, StyleSheet, ScrollView } from 'react-native';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { ProductStackParamList } from '../navigation/types';
import { ProductDetail } from '../components/ProductDetail';
import { useTheme } from '../theme/ThemeContext';

type Props = NativeStackScreenProps<ProductStackParamList, 'ProductDetail'>;

export const ProductDetailScreen: React.FC<Props> = ({ route }) => {
  const { theme } = useTheme();
  const { product } = route.params;

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    content: {
      flexGrow: 1,
    },
  });

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      testID="product-detail-screen"
    >
      <ProductDetail product={product} />
    </ScrollView>
  );
}; 