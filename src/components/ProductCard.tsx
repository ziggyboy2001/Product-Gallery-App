import React, { useState } from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { Image } from 'expo-image';
import { Product } from '../types/product';
import { ProductCardSkeleton } from './ProductCardSkeleton';
import { useTheme } from '../theme/ThemeContext';

interface ProductCardProps {
  product: Product;
  onPress: (product: Product) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onPress }) => {
  const { theme } = useTheme();
  const [isLoading, setIsLoading] = useState(true);

  const styles = StyleSheet.create({
    container: {
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      marginHorizontal: theme.spacing.md,
      marginVertical: theme.spacing.sm,
      ...theme.shadows.card,
    },
    pressed: {
      opacity: 0.7,
    },
    image: {
      width: '100%',
      height: 200,
      borderTopLeftRadius: theme.borderRadius.md,
      borderTopRightRadius: theme.borderRadius.md,
    },
    content: {
      padding: theme.spacing.md,
    },
    title: {
      ...theme.typography.subtitle,
      color: theme.colors.text,
      marginBottom: theme.spacing.xs,
    },
    price: {
      ...theme.typography.body,
      color: theme.colors.primary,
    },
  });

  return (
    <Pressable 
      onPress={() => onPress(product)}
      style={({ pressed }) => [
        styles.container,
        pressed && styles.pressed
      ]}
    >
      {isLoading && <ProductCardSkeleton testID="product-card-skeleton" />}
      <Image
        source={product.thumbnail}
        style={styles.image}
        contentFit="contain"
        transition={200}
        onLoadEnd={() => setIsLoading(false)}
      />
      <View style={styles.content}>
        <Text style={styles.title} numberOfLines={2}>{product.title}</Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>
    </Pressable>
  );
}; 