export interface ProductType {
  id: number | string;
  name: string;
  category: string;
  shortDescription: string;
  description: string;
  price: number;
  sizes: string[];
  colors: string[];
 
  image: string; 
}

// Ensure quantity is ALWAYS required and a number
export interface CartItemTypes {
  id: number | string;
  name: string;
  price: number;
  image: string; // The specific image for the selected variant
  images: Record<string, string>; // Kept for dynamic image switching in cart
  selectedSize: string;
  selectedColor: string;
  quantity: number; 
}

export type CartItems = CartItemTypes[];