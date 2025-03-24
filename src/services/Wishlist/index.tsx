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

const LOCALSTORAGE_KEY = "wishlist";

export const addToWishlist = (product: Product) => {
  const wishlist: Product[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
  );

  if (wishlist.find((p) => p.id === product.id)) return;

  wishlist.push(product);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(wishlist));
};

export const removeFromWishlist = (id: number) => {
  const wishlist: Product[] = JSON.parse(
    localStorage.getItem(LOCALSTORAGE_KEY) || "[]"
  );
  const updatedWishlist = wishlist.filter((product) => product.id !== id);
  localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify(updatedWishlist));
};

export const getWishlist = (): Product[] => {
  return JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || "[]");
};
