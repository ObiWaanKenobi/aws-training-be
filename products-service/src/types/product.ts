export interface Product {
  id: string;
  title: string;
  description: string;
  image_url: string;
  price: number;
  count: number;
}

export type ProductsList = Product[];
