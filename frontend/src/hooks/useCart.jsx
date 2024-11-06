import React, { createContext, useContext, useMemo, ReactNode } from "react";
import { useLocalStorage } from "./useLocalStorage";

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useLocalStorage("cartItems", []);

  const addItemQuantity = (beer) => {
    setCartItems((prevItems) => {
      const cartItem = prevItems.find((item) => item.id === beer.id);
      if (cartItem) {
        return prevItems.map((item) =>
          item.id === beer.id ? { ...item, quantity: item.quantity + 1 } : item,
        );
      } else {
        return [...prevItems, { ...beer, quantity: 1 }];
      }
    });
  };

  const removeItemQuantity = (beerId) => {
    setCartItems((prevItems) => {
      const cartItem = prevItems.find((item) => item.id === beerId);
      if (!cartItem) return prevItems;

      if (cartItem.quantity !== 1) {
        return prevItems.map((item) =>
          item.id === beerId ? { ...item, quantity: item.quantity - 1 } : item,
        );
      } else {
        return prevItems.filter((item) => item.id !== beerId);
      }
    });
  };

  const removeAllItems = () => {
    setCartItems([]);
  };

  const removeItem = (beerId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== beerId));
  };

  const value = useMemo(
    () => ({
      cartItems,
      addItemQuantity,
      removeItemQuantity,
      removeItem,
      removeAllItems,
    }),
    [cartItems],
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within an CartProvider");
  }
  return context;
};
