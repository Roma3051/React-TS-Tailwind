import React, { useContext } from "react";
import { WishlistContext } from "../../context/WishlistContext";
import ProductCard from "../../components/ProductCard";

const WishlistPage: React.FC = () => {
  const wishlistCtx = useContext(WishlistContext);

  if (!wishlistCtx) return null;

  const { wishlist, removeProduct } = wishlistCtx;

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">List of desired products</h1>
      {wishlist.length === 0 ? (
        <p className="text-gray-500">Your shopping cart is empty</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {wishlist.map((product) => (
            <div key={product.id}>
              <ProductCard
                id={product.id}
                title={product.title}
                price={product.price}
                image={product.image}
                description={product.description}
                onRemoveFromWishlist={() => removeProduct(product.id)}
              />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default WishlistPage;
