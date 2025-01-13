import React from 'react';
import { render } from '@testing-library/react-native';
import { ProductDetail } from '../components/ProductDetail';
import { ThemeProvider } from '../theme/ThemeContext';

const mockProduct = {
  id: 1,
  title: 'Test Product',
  price: 99.99,
  thumbnail: 'test.jpg',
  description: 'Test description',
  discountPercentage: 10,
  rating: 4.5,
  stock: 50,
  brand: 'Test Brand',
  category: 'test',
  images: ['test1.jpg', 'test2.jpg'],
};

const renderWithTheme = (component: React.ReactElement) => {
  return render(
    <ThemeProvider>
      {component}
    </ThemeProvider>
  );
};

describe('ProductDetail', () => {
  // renders product information
  it('displays all product information', () => {
    const { getByText } = renderWithTheme(
      <ProductDetail product={mockProduct} />
    );

    expect(getByText('Test Product')).toBeTruthy();
    expect(getByText('by Test Brand')).toBeTruthy();
    expect(getByText('$99.99')).toBeTruthy();
    expect(getByText('4.5')).toBeTruthy();
    expect(getByText('50 in stock')).toBeTruthy();
    expect(getByText('Test description')).toBeTruthy();
  });

  // shows loading skeleton
  it('shows skeleton while loading', () => {
    const { getByTestId } = renderWithTheme(
      <ProductDetail product={mockProduct} />
    );

    expect(getByTestId('product-detail-skeleton')).toBeTruthy();
  });

  // Uses last image from array
  it('uses the last image from the images array', () => {
    const { getByTestId } = renderWithTheme(
      <ProductDetail product={mockProduct} />
    );

    const image = getByTestId('product-detail-image');
    expect(image.props.source).toBe('test2.jpg');
  });
}); 