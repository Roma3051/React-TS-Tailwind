// import { FC } from "react";

// interface ProductProps {
//   id: number;
//   title: string;
//   price: number;
//   image: string;
//   description: string;
//   onAddToWishlist?: (id: number) => void;
//   onRemoveFromWishlist?: (id: number) => void;
// }

// const ProductCard: FC<ProductProps> = ({
//   id,
//   title,
//   price,
//   image,
//   description,
//   onAddToWishlist,
//   onRemoveFromWishlist,
// }) => {
//   return (
//     <div className="border p-4 rounded-lg shadow-md flex flex-col justify-between">
//       <img
//         src={image}
//         alt={title}
//         className="w-full h-40 object-cover rounded-lg mb-4"
//       />
//       <h2 className="text-xl font-semibold text-gray-900 mb-2">{title}</h2>
//       <p className="text-lg font-bold text-blue-500 mb-2">${price}</p>
//       <p className="text-sm text-gray-500 mb-4">{description}</p>

//       <div className="flex space-x-2 mt-4">
//         {onAddToWishlist && (
//           <button
//             className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
//             onClick={() => onAddToWishlist(id)}
//           >
//             Add to Wishlist
//           </button>
//         )}
//         {onRemoveFromWishlist && (
//           <button
//             className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
//             onClick={() => onRemoveFromWishlist(id)}
//           >
//             Remove from Wishlist
//           </button>
//         )}
//       </div>
//     </div>
//   );
// };

// export default ProductCard;

import { FC } from "react";

interface ProductProps {
  id: number;
  title: string;
  price: number;
  image: string;
  description: string;
  onAddToWishlist?: (id: number) => void;
  onRemoveFromWishlist?: (id: number) => void;
}

const ProductCard: FC<ProductProps> = ({
  id,
  title,
  price,
  image,
  description,
  onAddToWishlist,
  onRemoveFromWishlist,
}) => {
  return (
    <div className="border p-4 rounded-lg shadow-md flex flex-col justify-between h-full">
      <div className="w-full h-40 mb-4">
        <img
          src={image}
          alt={title}
          className="w-full h-full object-contain rounded-lg"
        />
      </div>
      <h2 className="text-xl font-semibold text-gray-900 mb-2 truncate">
        {title}
      </h2>
      <p className="text-lg font-bold text-blue-500 mb-2">${price}</p>
      <p className="text-sm text-gray-500 mb-4 truncate">{description}</p>

      <div className="flex space-x-2 mt-auto">
        {onAddToWishlist && (
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            onClick={() => onAddToWishlist(id)}
          >
            Add to Wishlist
          </button>
        )}
        {onRemoveFromWishlist && (
          <button
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-400"
            onClick={() => onRemoveFromWishlist(id)}
          >
            Remove from Wishlist
          </button>
        )}
      </div>
    </div>
  );
};

export default ProductCard;

