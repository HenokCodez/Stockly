import React from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { setSearch, setCategory, resetProducts, getProducts } from "../features/productSlice";

const categories = ["All", "Clothing", "Shoes", "Accessories"];

export default function FilterBar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.products);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearch(e.target.value));
    dispatch(resetProducts());
    dispatch(getProducts());
  };

  const handleCategory = (cat: string) => {
    dispatch(setCategory(cat === "All" ? "" : cat));
    dispatch(resetProducts());
    dispatch(getProducts());
  };

  return (
    <div className="flex flex-col sm:flex-row gap-4 mb-6">
      <input type="text" placeholder="Search products..." className="border p-2 rounded flex-1" value={filters.search} onChange={handleSearch} />
      <div className="flex gap-2 flex-wrap">
        {categories.map((cat) => (
          <button key={cat} className={`px-4 py-2 border rounded ${filters.category === cat || (cat === "All" && !filters.category) ? "bg-indigo-600 text-white" : "bg-white"}`} onClick={() => handleCategory(cat)}>
            {cat}
          </button>
        ))}
      </div>
    </div>
  );
}
