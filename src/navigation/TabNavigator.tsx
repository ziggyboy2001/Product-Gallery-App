import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ProductsNavigator } from './ProductsNavigator';
import { MaterialIcons } from '@expo/vector-icons';
import { useTheme } from '../theme/ThemeContext';
import { StatusBar } from 'react-native';

const Tab = createBottomTabNavigator();

export function TabNavigator() {
  const { theme, isDark } = useTheme();

  return (
    <>
      <StatusBar 
        barStyle={isDark ? 'light-content' : 'dark-content'}
        backgroundColor={theme.colors.background}
      />
      <Tab.Navigator
        screenOptions={{
          tabBarStyle: {
            backgroundColor: theme.colors.card,
            borderTopColor: theme.colors.border,
            borderTopWidth: 1,
          },
          tabBarActiveTintColor: theme.colors.primary,
          tabBarInactiveTintColor: theme.colors.textSecondary,
          headerStyle: {
            backgroundColor: theme.colors.card,
            borderBottomColor: theme.colors.border,
            borderBottomWidth: 1,
            shadowColor: 'transparent',
          },
          headerTintColor: theme.colors.text,
          headerTitleStyle: {
            ...theme.typography.subtitle,
          },
        }}
      >
        <Tab.Screen 
          name="Products" 
          component={ProductsNavigator}
          options={{
            headerShown: false,
            tabBarIcon: ({ color, size }) => (
              <MaterialIcons name="shopping-cart" size={size} color={color} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
} 