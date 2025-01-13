import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductList } from '../components/ProductList';
import { ProductDetail } from '../components/ProductDetail';
import { Product } from '../types/product';
import { useTheme } from '../theme/ThemeContext';

export function SplitScreenLayout() {
  const { theme } = useTheme();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'row',
      backgroundColor: theme.colors.background,
    },
    leftPanel: {
      flex: 1,
      borderRightWidth: 1,
      borderRightColor: theme.colors.border,
    },
    rightPanel: {
      flex: 2,
    },
    placeholder: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: theme.colors.background,
    },
    placeholderText: {
      ...theme.typography.subtitle,
      color: theme.colors.textSecondary,
    },
  });

  return (
    <SafeAreaView style={styles.container} testID="split-view-container">
      <View style={styles.leftPanel}>
        <ProductList
          onProductPress={setSelectedProduct}
          selectedProduct={selectedProduct}
        />
      </View>
      <View style={styles.rightPanel}>
        {selectedProduct ? (
          <ProductDetail product={selectedProduct} />
        ) : (
          <View style={styles.placeholder}>
            <Text style={styles.placeholderText}>
              Select a product to view details
            </Text>
          </View>
        )}
      </View>
    </SafeAreaView>
  );
} 