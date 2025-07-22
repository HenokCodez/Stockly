import React, { useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../hooks";
import { getProducts, nextPage } from "../features/productSlice";
import ProductCard from "../components/ProductCard";
import FilterBar from "../components/FilterBar";

export default function Home() {
  const dispatch = useAppDispatch();
  const { items, loading, error, hasMore } = useAppSelector((state) => state.products);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const loadMore = () => {
    dispatch(nextPage());
    dispatch(getProducts());
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      <h1 className="text-3xl font-bold mb-4">Browse Products</h1>

      <FilterBar />

      {loading && items.length === 0 && <p>Loading...</p>}
      {error && <p className="text-red-500">{error}</p>}

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {items.map((product) => (
          <ProductCard key={product._id} name={product.name} price={product.price} image={product.image} />
        ))}
      </div>

      {hasMore && (
        <div className="mt-6 text-center">
          <button onClick={loadMore} className="bg-indigo-600 text-white px-6 py-2 rounded hover:bg-indigo-700">
            Load More
          </button>
        </div>
      )}
    </div>
  );
}
