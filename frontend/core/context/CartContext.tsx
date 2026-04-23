import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export interface CartItem {
  id: string | number;
  name: string;
  price: string;
  quantity: number;
  image: string;
  totalPrice?: string;
  size?: string;
  color?: string;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: any) => void;
  removeFromCart: (productId: string | number, size?: string, color?: string) => void;
  updateQuantity: (productId: string | number, delta: number, size?: string, color?: string) => void;
  totalItems: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  useEffect(() => {
    const savedCart = localStorage.getItem('madx_cart');
    if (savedCart) {
      try {
        setCartItems(JSON.parse(savedCart));
      } catch (e) {
        console.error("Failed to load cart", e);
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('madx_cart', JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product: any) => {
    const productId = product.id || product._id;
    setCartItems((prev) => {
      const existing = prev.find(
        (item) =>
          item.id === productId &&
          item.size === product.size &&
          item.color === product.color
      );
      if (existing) {
        return prev.map((item) =>
          item.id === productId &&
          item.size === product.size &&
          item.color === product.color
            ? { ...item, quantity: item.quantity + (product.quantity || 1) }
            : item
        );
      }
      return [...prev, { ...product, id: productId, quantity: product.quantity || 1 }];
    });
  };

  const removeFromCart = (productId: string | number, size?: string, color?: string) => {
    setCartItems((prev) =>
      prev.filter(
        (item) =>
          !(item.id === productId && item.size === size && item.color === color)
      )
    );
  };

  const updateQuantity = (
    productId: string | number,
    delta: number,
    size?: string,
    color?: string
  ) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (
          item.id === productId &&
          item.size === size &&
          item.color === color
        ) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart, updateQuantity, totalItems }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) throw new Error('useCart must be used within a CartProvider');
  return context;
};
