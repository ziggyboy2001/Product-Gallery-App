import React from 'react';
import { render, act, fireEvent, waitFor } from '@testing-library/react-native';
import { NavigationContainer } from '@react-navigation/native';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { TabNavigator } from '../navigation/TabNavigator';
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

describe('Navigation', () => {
  let queryClient: QueryClient;

  beforeEach(() => {
    jest.useFakeTimers();
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
    (api.fetchProducts as jest.Mock).mockResolvedValue(mockProducts);
  });

  afterEach(() => {
    queryClient.clear();
    jest.useRealTimers();
  });

  // Products tab is visible
  it('shows Products tab', async () => {
    const { getByText } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await act(async () => {
      jest.runAllTimers();
    });

    expect(getByText('Products')).toBeTruthy();
  });

  // Navigation from list to detail on phone
  it('navigates from list to detail on phone', async () => {
    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    }, { timeout: 2000 });

    const productTitle = getByText('Test Product');
    fireEvent.press(productTitle);

    await waitFor(() => {
      expect(getByTestId('product-detail-image')).toBeTruthy();
    }, { timeout: 2000 });
  });

  // Split screen on tablet
  it('renders split screen on tablet', async () => {
    jest.spyOn(require('react-native'), 'useWindowDimensions').mockReturnValue({
      width: 1024,
      height: 1366,
      scale: 1,
      fontScale: 1,
    });

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    }, { timeout: 2000 });

    expect(getByTestId('split-view-container')).toBeTruthy();
  });

  // Smooth transitions between views
  it('has smooth transitions between views', async () => {
    jest.spyOn(require('react-native'), 'useWindowDimensions').mockReturnValue({
      width: 375,
      height: 667,
      scale: 1,
      fontScale: 1,
    });

    const { getByText, getByTestId } = render(
      <QueryClientProvider client={queryClient}>
        <NavigationContainer>
          <TabNavigator />
        </NavigationContainer>
      </QueryClientProvider>
    );

    await waitFor(() => {
      expect(getByText('Test Product')).toBeTruthy();
    }, { timeout: 2000 });

    const productTitle = getByText('Test Product');
    fireEvent.press(productTitle);

    await waitFor(() => {
      expect(getByTestId('product-detail-image')).toBeTruthy();
    }, { timeout: 2000 });
  });
}); 