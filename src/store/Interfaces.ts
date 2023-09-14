export interface Product {
  id: number;
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: string[];

  [key: string]: string | number | string[];
}

export interface dataProduct {
  products: {
    data: {
      products: Product[];
      total: number;
      skip: number;
      limit: number;
    };
    searchValue: string;
  };
}

export interface URLProps {
  currentState: dataProduct;
}

export interface ProductForm {
  title: string;
  description: string;
  price: number;
  discountPercentage: number;
  rating: number;
  stock: number;
  brand: string;
  category: string;
  thumbnail: string;
  images: (string | undefined)[];
}

export interface ProductFormState {
  product: ProductForm;
  loading: boolean;
  error: string | null;
}
