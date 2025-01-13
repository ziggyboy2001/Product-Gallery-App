import React from 'react';
import { render, waitFor } from '@testing-library/react-native';
import { ProductList } from '../components/ProductList';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
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

describe('ProductList', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    queryClient = new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          gcTime: 0,
          staleTime: 0,
        },
      },
    });
    jest.clearAllMocks();
  });

  afterEach(async () => {
    await queryClient.cancelQueries();
    await queryClient.clear();
    queryClient.unmount();
  });

  it('renders products', async () => {
    (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { getByText, unmount } = render(
      <QueryClientProvider client={queryClient}>
        <ProductList onProductPress={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    });

    unmount();
  });

  it('shows loading state', async () => {
    (api.fetchProducts as jest.Mock).mockImplementation(() => 
      new Promise(resolve => setTimeout(() => resolve(mockProducts), 100))
    );

    const { getByTestId, queryByText, unmount } = render(
      <QueryClientProvider client={queryClient}>
        <ProductList onProductPress={() => {}} />
      </QueryClientProvider>
    );

    expect(getByTestId('product-list')).toBeTruthy();
    expect(queryByText('Test Product')).toBeNull();

    unmount();
  });

  it('handles errors with retry', async () => {
    (api.fetchProducts as jest.Mock).mockRejectedValue(new Error('Failed to fetch'));

    const { getByText, unmount } = render(
      <QueryClientProvider client={queryClient}>
        <ProductList onProductPress={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Something went wrong while fetching products')).toBeTruthy();
    });

    unmount();
  });

  it('handles pull-to-refresh', async () => {
    (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);

    const { getByTestId, unmount } = render(
      <QueryClientProvider client={queryClient}>
        <ProductList onProductPress={() => {}} />
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByTestId('product-list')).toBeTruthy();
    });

    const list = getByTestId('product-list');
    list.props.refreshControl.props.onRefresh();

    await waitFor(() => {
      expect(api.fetchProducts).toHaveBeenCalledTimes(2);
    });

    unmount();
  });
}); 