import React from 'react';
import { 
  FlatList, 
  RefreshControl, 
  StyleSheet, 
  View, 
  Text, 
  TouchableOpacity 
} from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { Product } from '../types/product';
import { fetchProducts } from '../api/products';
import { ProductCard } from './ProductCard';
import { useTheme } from '../theme/ThemeContext';

interface ProductListProps {
  onProductPress: (product: Product) => void;
  selectedProduct?: Product | null;
}

export const ProductList: React.FC<ProductListProps> = ({ 
  onProductPress,
  selectedProduct 
}) => {
  const { theme } = useTheme();
  const { 
    data, 
    isLoading, 
    isError, 
    refetch,
    isRefetching 
  } = useQuery({
    queryKey: ['products'],
    queryFn: () => fetchProducts(),
  });

  const styles = StyleSheet.create({
    list: {
      padding: theme.spacing.sm,
    },
    centerContainer: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: theme.spacing.md,
    },
    errorText: {
      ...theme.typography.body,
      color: theme.colors.textSecondary,
      textAlign: 'center',
      marginBottom: theme.spacing.md,
    },
    retryButton: {
      backgroundColor: theme.colors.primary,
      paddingHorizontal: theme.spacing.lg,
      paddingVertical: theme.spacing.sm,
      borderRadius: theme.borderRadius.md,
    },
    retryText: {
      color: theme.colors.background,
      ...theme.typography.subtitle,
    },
  });

  if (isError) {
    return (
      <View style={styles.centerContainer}>
        <Text style={styles.errorText}>
          Something went wrong while fetching products
        </Text>
        <TouchableOpacity 
          style={styles.retryButton} 
          onPress={() => refetch()}
        >
          <Text style={styles.retryText}>Retry</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <FlatList
      testID="product-list"
      data={data?.products}
      renderItem={({ item }) => (
        <ProductCard
          product={item}
          onPress={onProductPress}
        />
      )}
      keyExtractor={(item) => item.id.toString()}
      refreshControl={
        <RefreshControl
          testID="refresh-spinner"
          refreshing={isRefetching}
          onRefresh={() => refetch()}
          tintColor={theme.colors.primary}
        />
      }
      contentContainerStyle={styles.list}
    />
  );
}; 