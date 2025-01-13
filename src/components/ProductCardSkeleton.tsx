import React, { useEffect, useRef } from 'react';
import { View, StyleSheet, Animated } from 'react-native';
import { useTheme } from '../theme/ThemeContext';

interface ProductCardSkeletonProps {
  testID?: string;
}

export const ProductCardSkeleton: React.FC<ProductCardSkeletonProps> = ({ testID }) => {
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
      backgroundColor: theme.colors.card,
      borderRadius: theme.borderRadius.md,
      ...theme.shadows.card,
    },
    image: {
      width: '100%',
      height: 200,
      backgroundColor: theme.colors.placeholder,
      borderTopLeftRadius: theme.borderRadius.md,
      borderTopRightRadius: theme.borderRadius.md,
    },
    content: {
      padding: theme.spacing.md,
    },
    title: {
      height: theme.typography.subtitle.fontSize,
      backgroundColor: theme.colors.placeholder,
      borderRadius: theme.borderRadius.sm,
      marginBottom: theme.spacing.sm,
    },
    price: {
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
      </View>
    </View>
  );
}; 