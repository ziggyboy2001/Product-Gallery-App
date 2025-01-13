import { Product } from '../types/product';

export type RootTabParamList = {
  Products: undefined;
};

export type ProductStackParamList = {
  ProductList: undefined;
  ProductDetail: { product: Product };
}; 