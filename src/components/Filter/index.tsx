import { FC } from "react";
import Select, { MultiValue } from "react-select";

interface Option {
  value: string;
  label: string;
}

interface FilterProps {
  categories: string[];
  selectedCategories: string[];
  setSelectedCategories: (categories: string[]) => void;
  priceRange: [number, number];
  setPriceRange: (range: [number, number]) => void;
  minRating: number;
  setMinRating: (rating: number) => void;
  className?: string;
}

const Filter: FC<FilterProps> = ({
  categories,
  selectedCategories,
  setSelectedCategories,
  priceRange,
  setPriceRange,
  minRating,
  setMinRating,
}) => {
  const options: Option[] = categories.map((cat) => ({
    value: cat,
    label: cat,
  }));

  const selectedOptions = options.filter((option) =>
    selectedCategories.includes(option.value)
  );

  const handleCategoryChange = (selected: MultiValue<Option>) => {
    setSelectedCategories(selected.map((option) => option.value));
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMin = Number(e.target.value);
    if (!isNaN(newMin) && newMin <= priceRange[1]) {
      setPriceRange([newMin, priceRange[1]]);
    }
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newMax = Number(e.target.value);
    if (!isNaN(newMax) && newMax >= priceRange[0]) {
      setPriceRange([priceRange[0], newMax]);
    }
  };

  return (
    <div className="p-4 border rounded-lg shadow">
      <h2 className="text-lg font-semibold mb-2">Filters</h2>

      <div className="mb-4">
        <h3 className="font-medium">Categories:</h3>
        <Select
          isMulti
          options={options}
          value={selectedOptions}
          onChange={handleCategoryChange}
          placeholder="Select categories..."
        />
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Price Range:</h3>
        <div className="flex gap-2">
          <input
            type="number"
            className="border p-1 rounded w-24"
            placeholder="Min"
            value={priceRange[0]}
            onChange={handleMinPriceChange}
          />
          <span> - </span>
          <input
            type="number"
            className="border p-1 rounded w-24"
            placeholder="Max"
            value={priceRange[1]}
            onChange={handleMaxPriceChange}
          />
        </div>
      </div>

      <div className="mb-4">
        <h3 className="font-medium">Minimum Rating:</h3>
        <div className="flex items-center gap-2">
          <input
            type="range"
            min="0"
            max="5"
            step="0.5"
            value={minRating}
            onChange={(e) => setMinRating(Number(e.target.value))}
          />
          <span>{minRating}★</span>
        </div>
      </div>
    </div>
  );
};

export default Filter;
