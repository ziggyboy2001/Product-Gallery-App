import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { ProductCard } from '../components/ProductCard';
import { ThemeProvider } from '../theme/ThemeContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  thumbnail: 'test.jpg',
  description: 'test',
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: 'test',
  category: 'test',
  images: ['test.jpg'],
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ProductCard', () => {
  // Renders product information correctly
  it('displays product title and price', () => {
    const { getByText } = renderWithTheme(
      <ProductCard product={mockProduct} onPress={() => {}} />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
  });

  // Shows loading skeleton initially
  it('shows skeleton while loading', () => {
    const { getByTestId } = renderWithTheme(
      <ProductCard product={mockProduct} onPress={() => {}} />
    );

    expect(getByTestId('product-card-skeleton')).toBeTruthy();
  });

  // Calls onPress with product data
  it('calls onPress with product data when pressed', () => {
    const onPress = jest.fn();
    const { getByText } = renderWithTheme(
      <ProductCard product={mockProduct} onPress={onPress} />
    );

    fireEvent.press(getByText('Test Product'));
    expect(onPress).toHaveBeenCalledWith(mockProduct);
  });
}); 