export async function getAllProducts() {
  const response = await fetch("https://fakestoreapi.com/products");
  if (!response.ok) throw new Error("Failed to fetch products");
  return response.json();
}

export async function getProductById(id: string | number) {
  const response = await fetch(`https://fakestoreapi.com/products/${id}`);
  if (!response.ok) throw new Error("Failed to fetch product");
  return response.json();
}

export async function getAllCategories() {
  const response = await fetch("https://fakestoreapi.com/products/categories");
  if (!response.ok) throw new Error("Failed to fetch categories");
  return response.json();
}

export async function getProductsByCategory(category: string) {
  const response = await fetch(`https://fakestoreapi.com/products/category/${encodeURIComponent(category)}`);
  if (!response.ok) throw new Error("Failed to fetch products by category");
  return response.json();
}
