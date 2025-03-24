import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { WishlistContext } from "../../context/WishlistContext";

const Header: React.FC = () => {
  const wishlistCtx = useContext(WishlistContext);
  const wishlistCount = wishlistCtx?.wishlist.length || 0;

  return (
    <header className="p-4 bg-gray-200 flex justify-between items-center">
      <Link to="/" className="text-xl font-bold">
        Shop
      </Link>
      <nav>
        <Link to="/wishlist" className="relative inline-block">
          <span className="px-2 py-1">Basket</span>
          {wishlistCount > 0 && (
            <span className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
              {wishlistCount}
            </span>
          )}
        </Link>
      </nav>
    </header>
  );
};

export default Header;
