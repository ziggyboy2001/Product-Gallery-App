import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { SplitScreenLayout } from '../navigation/SplitScreenLayout';
import { ThemeProvider } from '../theme/ThemeContext';
import * as api from '../api/products';

jest.mock('../api/products');

const mockProducts = {
  products: [
    {
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
    }
  ],
  total: 1,
  skip: 0,
  limit: 10
};

const renderWithProviders = (component: React.ReactElement) => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return render(
    <QueryClientProvider client={queryClient}>
      <ThemeProvider>
        {component}
      </ThemeProvider>
    </QueryClientProvider>
  );
};

describe('SplitScreenLayout', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  it('renders split view container', () => {
    const { getByTestId } = renderWithProviders(<SplitScreenLayout />);
    expect(getByTestId('split-view-container')).toBeTruthy();
  });

  it('shows product details when product is selected', async () => {
    const { getByText, getByTestId } = renderWithProviders(<SplitScreenLayout />);

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    });

    fireEvent.press(getByText('Test Product'));

    expect(getByTestId('product-detail-image')).toBeTruthy();
  });

  it('shows placeholder when no product is selected', () => {
    const { getByText } = renderWithProviders(<SplitScreenLayout />);
    expect(getByText('Select a product to view details')).toBeTruthy();
  });
}); 