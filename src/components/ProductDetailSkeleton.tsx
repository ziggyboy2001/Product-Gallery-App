import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ProductDetailSkeletonProps {
  testID?: string;
}

export const ProductDetailSkeleton: React.FC<ProductDetailSkeletonProps> = ({ testID }) => {
  const { theme } = useTheme();
  const opacity = useRef(new Animated.Value(0.3)).current;

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity, {
          toValue: 1,
          duration: 800,
          useNativeDriver: true,
        }),
        Animated.timing(opacity, {
          toValue: 0.3,
          duration: 800,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: theme.colors.background,
    },
    image: {
      width: '100%',
      height: 300,
      backgroundColor: theme.colors.placeholder,
    },
    content: {
      padding: theme.spacing.lg,
    },
    title: {
      height: theme.typography.title.fontSize,
      backgroundColor: theme.colors.placeholder,
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.md,
    },
    price: {
      height: theme.typography.subtitle.fontSize,
      width: '30%',
      backgroundColor: theme.colors.placeholder,
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.lg,
    },
    description: {
      height: theme.typography.body.fontSize * 4,
      backgroundColor: theme.colors.placeholder,
      borderRadius: theme.borderRadius.sm,
    },
    ratingContainer: {
      flexDirection: 'row',
      alignItems: 'center',
      marginBottom: theme.spacing.lg,
    },
    rating: {
      height: theme.typography.body.fontSize,
      width: '20%',
      backgroundColor: theme.colors.placeholder,
      borderRadius: theme.borderRadius.sm,
      marginRight: theme.spacing.md,
    },
    stock: {
      height: theme.typography.body.fontSize,
      width: '30%',
      backgroundColor: theme.colors.placeholder,
      borderRadius: theme.borderRadius.sm,
    },
  });

  return (
    <View testID={testID} style={styles.container}>
      <Animated.View style={[styles.image, { opacity }]} />
      <View style={styles.content}>
        <Animated.View style={[styles.title, { opacity }]} />
        <Animated.View style={[styles.price, { opacity }]} />
        <View style={styles.ratingContainer}>
          <Animated.View style={[styles.rating, { opacity }]} />
          <Animated.View style={[styles.stock, { opacity }]} />
        </View>
        <Animated.View style={[styles.description, { opacity }]} />
      </View>
    </View>
  );
};