export type Variant = {
  _id?: string;
  size: "S" | "M" | "L" | "XL" | "XXL";
  color: string;
  quantity: number;
};

export type Product = {
  _id: string;
  name: string;
  price: number;
  images: string[];
  rating?: number;
  description: string;
  category?: string;
  isTrending: boolean;
  isNewRelease: boolean;
  colors: string[];
  variants: Variant[];
  createdAt?: string;
  updatedAt?: string;
};