import axios from 'axios';
import { ProductsResponse } from '../types/product';

const API_BASE_URL = 'https://dummyjson.com';

export const fetchProducts = async (limit: number = 10, skip: number = 0): Promise<ProductsResponse> => {
  try {
    const response = await axios.get<ProductsResponse>(`${API_BASE_URL}/products`, {
      params: { limit, skip }
    });
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw new Error(`Failed to fetch products: ${error.message}`);
    }
    throw error;
  }
}; 