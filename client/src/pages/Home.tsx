import React, { useEffect, useState, useMemo } from "react";
import CategoryCard from "../components/CategoriCard";
import { categories } from "../data/categories";
import { getAllProducts } from "../utility/Fakestore";
import { Link } from "react-router-dom"; // If you use React Router

// Define the type of Product
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
};

function Home() {
  // State for all fetched products
  const [products, setProducts] = useState<Product[]>([]);

  // State for search input
  const [search, setSearch] = useState("");

  // State for selected category
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  // State for loading animation
  const [loading, setLoading] = useState(true);

  // State for error messages
  const [error, setError] = useState<string | null>(null);

  // Mapping display names to API category values
  const categoryMap: Record<string, string> = {
    Electronics: "electronics",
    Jewelery: "jewelery",
    "Men's": "men's clothing",
    "Women's": "women's clothing",
  };

  // Fetch products when component mounts
  useEffect(() => {
    setLoading(true);
    setError(null);

    getAllProducts()
      .then((data) => {
        setProducts(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setError("Failed to load products.");
        setLoading(false);
      });
  }, []);

  // Memoized filtering logic for performance
  const filtered = useMemo(() => {
    let result = products;

    // Filter by selected category
    if (selectedCategory) {
      result = result.filter((p) => p.category === categoryMap[selectedCategory]);
    }

    // Filter by search term
    if (search.trim()) {
      result = result.filter((p) => p.title.toLowerCase().includes(search.toLowerCase()));
    }

    return result;
  }, [products, search, selectedCategory]);

  return (
    <div className="w-full px-4 py-4 flex flex-col gap-8 min-h-screen bg-[var(--color-bg)] transition-colors">
      {/* Category selection */}
      <div className="flex flex-wrap gap-4 justify-center">
        <button aria-pressed={!selectedCategory} className={`focus:outline-none ${!selectedCategory ? "ring-2 ring-[var(--color-emphasis)]" : ""}`} onClick={() => setSelectedCategory(null)}>
          <CategoryCard title="Products" description="All products" image="/all.jpeg" />
        </button>

        {categories.map((cat) => (
          <button key={cat.title} aria-pressed={selectedCategory === cat.title} className={`focus:outline-none ${selectedCategory === cat.title ? "ring-2 ring-[var(--color-emphasis)]" : ""}`} onClick={() => setSelectedCategory(cat.title)}>
            <CategoryCard {...cat} />
          </button>
        ))}
      </div>

      {/* Search input */}
      <div className="flex justify-center">
        <input
          type="text"
          placeholder="Search products..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-[var(--color-subtle)] bg-[var(--color-bg)] text-[var(--color-text)] shadow focus:outline-none focus:ring-2 focus:ring-[var(--color-emphasis)] transition"
        />
      </div>

      {/* Loading animation */}
      {loading && (
        <div className="flex justify-center items-center py-10">
          <div className="w-8 h-8 border-4 border-[var(--color-emphasis)] border-t-transparent rounded-full animate-spin"></div>
        </div>
      )}

      {/* Error state */}
      {error && <div className="text-center text-red-500 py-4">{error}</div>}

      {/* Product grid */}
      {!loading && (
        <div className="md:px-11 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filtered.length === 0 && <div className="col-span-full text-center text-[var(--color-subtle)] py-10">No products found.</div>}

          {filtered.map((product) => (
            <div key={product.id} className="bg-[var(--color-bg)]  dark:bg-[var(--color-bg)] rounded-lg border border-[var(--color-text)] shadow-md overflow-hidden flex flex-col transition hover:scale-[1.02] hover:shadow-lg">
              <img src={product.image} alt={product.title} className="w-full h-48 object-contain  dark:bg-[var(--color-bg)  dark:bg-[var(--color-bg)" />

              <div className="p-4 flex flex-col flex-1">
                <h3 className="font-semibold text-lg mb-1 text-[var(--color-text)]">{product.title}</h3>

                <p className="text-sm text-[var(--color-subtle)] mb-2 line-clamp-2">{product.description}</p>

                <div className="mt-auto flex items-center justify-between">
                  <span className="font-bold text-[var(--color-emphasis)]">${product.price}</span>

                  <Link to={`/product/${product.id}`} className="px-3 py-1 rounded bg-[var(--color-emphasis)] text-white text-xs font-semibold hover:brightness-90 transition">
                    View
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
