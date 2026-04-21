export type Variant = {
  size: "S" | "M" | "L" | "XL" | "XXL";
  color: string;
  quantity: number;
};

export type Product = {
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
};