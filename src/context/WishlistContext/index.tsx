import React, { createContext, useState, useEffect } from "react";
import {
  getWishlist,
  addToWishlist,
  removeFromWishlist,
} from "../../services/Wishlist";

export interface Product {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  rating: {
    rate: number;
    count: number;
  };
}

interface WishlistContextProps {
  wishlist: Product[];
  addProduct: (product: Product) => void;
  removeProduct: (id: number) => void;
}

export const WishlistContext = createContext<WishlistContextProps | null>(null);

export const WishlistProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [wishlist, setWishlist] = useState<Product[]>([]);

  useEffect(() => {
    setWishlist(getWishlist());
  }, []);

  const addProduct = (product: Product) => {
    addToWishlist(product);
    setWishlist(getWishlist());
  };

  const removeProduct = (id: number) => {
    removeFromWishlist(id);
    setWishlist(getWishlist());
  };

  return (
    <WishlistContext.Provider value={{ wishlist, addProduct, removeProduct }}>
      {children}
    </WishlistContext.Provider>
  );
};
