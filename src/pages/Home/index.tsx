import { useState, useEffect, useContext } from "react";
import ProductCard from "../../components/ProductCard";
import SearchBar from "../../components/SearchBar";
import Filter from "../../components/Filter";
import { WishlistContext } from "../../context/WishlistContext";

const ITEMS_PER_PAGE = 10;

const Home = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [minRating, setMinRating] = useState<number>(0);
  const [categories, setCategories] = useState<string[]>([]);

  const wishlistCtx = useContext(WishlistContext);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          "https://fakestoreapi.com/products/categories"
        );
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://fakestoreapi.com/products");
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };
    fetchProducts();
  }, []);

  const filteredProducts = products.filter((product) => {
    const isInCategory = selectedCategories.length
      ? selectedCategories.includes(product.category)
      : true;
    const isInPriceRange =
      product.price >= priceRange[0] && product.price <= priceRange[1];
    const meetsRating = product.rating.rate >= minRating;

    return (
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      isInCategory &&
      isInPriceRange &&
      meetsRating
    );
  });

  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const paginatedProducts = filteredProducts.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  useEffect(() => {
    if (currentPage > totalPages) {
      setCurrentPage(1);
    }
  }, [filteredProducts, totalPages, currentPage]);

  return (
    <div className="container mx-auto p-4 space-y-8">
      <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
        <h1 className="text-3xl font-bold text-gray-900">Product Listings</h1>
        <SearchBar
          searchTerm={searchQuery}
          setSearchTerm={setSearchQuery}
          className="w-full md:w-1/3"
        />
      </div>

      <Filter
        categories={categories}
        selectedCategories={selectedCategories}
        setSelectedCategories={setSelectedCategories}
        priceRange={priceRange}
        setPriceRange={setPriceRange}
        minRating={minRating}
        setMinRating={setMinRating}
        className="bg-white p-6 rounded-lg shadow-md"
      />

      {paginatedProducts.length === 0 ? (
        <p className="text-center text-gray-500">
          No products match your criteria.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {paginatedProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              title={product.title}
              price={product.price}
              image={product.image}
              description={product.description}
              onAddToWishlist={(id) => {
                const selectedProduct = products.find((p) => p.id === id);
                if (selectedProduct) {
                  wishlistCtx?.addProduct(selectedProduct);
                }
              }}
            />
          ))}
        </div>
      )}

      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setCurrentPage(currentPage - 1)}
            disabled={currentPage === 1}
          >
            &#8592;
          </button>
          <span className="px-4 py-2">{currentPage}</span>
          <button
            className="px-4 py-2 bg-gray-200 rounded"
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            &#8594;
          </button>
        </div>
      )}
    </div>
  );
};

export default Home;
