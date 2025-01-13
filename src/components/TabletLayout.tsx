import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { ProductList } from './ProductList';
import { ProductDetailScreen } from '../screens/ProductDetailScreen';
import { Product } from '../types/product';
import { fetchProducts } from '../api/products';

export const TabletLayout: React.FC = () => {
  const [selectedProduct, setSelectedProduct] = React.useState<Product | null>(null);
  const { data } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  React.useEffect(() => {
    if (data?.products && !selectedProduct) {
      setSelectedProduct(data.products[0]);
    }
  }, [data?.products]);

  return (
    <View style={styles.container}>
      <View style={styles.master}>
        <ProductList
          onProductPress={setSelectedProduct}
          selectedProduct={selectedProduct}
        />
      </View>
      <View style={styles.detail}>
        {selectedProduct && (
          <ProductDetailScreen
            route={{ params: { product: selectedProduct } } as any}
            navigation={{} as any}
          />
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  master: {
    flex: 1,
    borderRightWidth: 1,
    borderRightColor: '#e0e0e0',
  },
  detail: {
    flex: 2,
  },
}); 