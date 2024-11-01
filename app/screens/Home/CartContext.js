import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [productCount, setProductCount] = useState(0);

  return (
    <CartContext.Provider value={{ productCount, setProductCount }}>
      {children}
    </CartContext.Provider>
  );
};
