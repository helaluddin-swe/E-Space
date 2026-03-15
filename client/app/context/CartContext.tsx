"use client";

import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { CartItems, CartItemTypes } from '../utils/productTypes';
const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:5174";

interface CartContextType {
  cartItems: CartItems;
  cartCount: number;
  total: number; // The subtotal of all items
  addToCart: (product: CartItemTypes) => void;
  updateQuantity: (id: string | number, color: string, size: string, delta: number) => void;
  removeFromCart: (id: string | number, color: string, size: string) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider = ({ children }: { children: React.ReactNode }) => {
  const [cartItems, setCartItems] = useState<CartItems>([]);
  const [isInitialized, setIsInitialized] = useState(false);

  // 1. Load from LocalStorage (Hydration)
  useEffect(() => {
    try {
      const savedCart = localStorage.getItem('shopping-cart');
      if (savedCart) {
        const parsed = JSON.parse(savedCart);
        if (Array.isArray(parsed)) {
          const validItems = parsed.filter(
            (item) => item && typeof item.quantity === 'number' && item.id
          );
          setCartItems(validItems);
        }
      }
    } catch (e) {
      console.error("Cart hydration failed:", e);
      setCartItems([]);
    } finally {
      setIsInitialized(true);
    }
  }, []);

  // 2. Save to LocalStorage whenever cartItems change
  useEffect(() => {
    if (isInitialized) {
      localStorage.setItem('shopping-cart', JSON.stringify(cartItems));
    }
  }, [cartItems, isInitialized]);

  // 3. Derived State: cartCount & total
  const { cartCount, total } = useMemo(() => {
    if (!Array.isArray(cartItems)) return { cartCount: 0, total: 0 };
    
    return cartItems.reduce(
      (acc, item) => {
        const qty = item?.quantity ? Number(item.quantity) : 0;
        const price = item?.price ? Number(item.price) : 0;
        
        acc.cartCount += isNaN(qty) ? 0 : qty;
        acc.total += (isNaN(qty) || isNaN(price)) ? 0 : qty * price;
        
        return acc;
      },
      { cartCount: 0, total: 0 }
    );
  }, [cartItems]);

  // 4. Action: Add to Cart
  const addToCart = (product: CartItemTypes) => {
    if (!product?.id || product.quantity <= 0) return;

    setCartItems((prev) => {
      const existingItemIndex = prev.findIndex(
        (item) => 
          item.id === product.id && 
          item.selectedColor === product.selectedColor && 
          item.selectedSize === product.selectedSize
      );

      if (existingItemIndex > -1) {
        const updatedCart = [...prev];
        const currentQty = Number(updatedCart[existingItemIndex].quantity) || 0;
        
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: currentQty + product.quantity,
        };
        return updatedCart;
      }

      return [...prev, { ...product }];
    });
  };

  // 5. Action: Update Quantity
  const updateQuantity = (id: string | number, color: string, size: string, delta: number) => {
    setCartItems((prev) =>
      prev.map((item) => {
        if (item.id === id && item.selectedColor === color && item.selectedSize === size) {
          const newQty = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQty };
        }
        return item;
      })
    );
  };

  // 6. Action: Remove specific variant
  const removeFromCart = (id: string | number, color: string, size: string) => {
    setCartItems((prev) => 
      prev.filter(
        (item) => 
          !(item.id === id && item.selectedColor === color && item.selectedSize === size)
      )
    );
  };

  // 7. Action: Clear entire cart
  const clearCart = () => {
    setCartItems([]);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('shopping-cart');
    }
  };

  const contextValue = {
    backendUrl,
    cartItems,
    cartCount,
    total,
    updateQuantity,
    addToCart,
    removeFromCart,
    clearCart
  };

  return (
    <CartContext.Provider value={contextValue}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within a CartProvider");
  }
  return context;
};