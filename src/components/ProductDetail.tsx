import React, { useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Image } from 'expo-image';
import { MaterialIcons } from '@expo/vector-icons';
import { Product } from '../types/product';
import { ProductDetailSkeleton } from './ProductDetailSkeleton';
import { useTheme } from '../theme/ThemeContext';

interface ProductDetailProps {
  product: Product;
}

export const ProductDetail: React.FC<ProductDetailProps> = ({ product }) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);
  const lastImage = product.images[product.images.length - 1];

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: '100%',
      aspectRatio: 16 / 9,
      maxHeight: 300,
    },
    details: {
      padding: theme.spacing.lg,
    },
    title: {
      ...theme.typography.title,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    brand: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
      marginBottom: theme.spacing.sm,
    },
    price: {
      ...theme.typography.subtitle,
      color: theme.colors.primary,
      marginBottom: theme.spacing.md,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.md,
    },
    rating: {
      ...theme.typography.body,
      color: theme.colors.text,
      marginLeft: theme.spacing.xs,
      marginRight: theme.spacing.md,
    },
    stock: {
      ...theme.typography.caption,
      color: theme.colors.textSecondary,
    },
    description: {
      ...theme.typography.body,
      color: theme.colors.text,
    },
  });

  return (
    <View style={styles.container}>
      {isLoading && <ProductDetailSkeleton testID="product-detail-skeleton" />}
      <Image
        testID="product-detail-image"
        source={lastImage}
        style={styles.image}
        contentFit="contain"
        transition={200}
        onLoadEnd={() => setIsLoading(false)}
      />
      <View style={styles.details}>
        <Text style={styles.title}>{product.title}</Text>
        <Text style={styles.brand}>by {product.brand}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
        
        <View style={styles.ratingContainer}>
          <MaterialIcons name="star" size={20} color={theme.colors.primary} />
          <Text style={styles.rating}>{product.rating}</Text>
          <Text style={styles.stock}>{product.stock} in stock</Text>
        </View>

        <Text style={styles.description}>{product.description}</Text>
      </View>
    </View>
  );
}; 