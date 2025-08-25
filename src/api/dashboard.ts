import { ProductsResponse, CategoryResponse } from "../types/dashboard";

const API_BASE = "https://dummyjson.com";

export const fetchCategories = async (): Promise<CategoryResponse> => {
  const res = await fetch(`${API_BASE}/products/categories`);
  if (!res.ok) throw new Error("Failed to fetch categories");
  return res.json();
};

export const fetchProducts = async (categorySlug:string): Promise<ProductsResponse> => {
  const res = await fetch(`${API_BASE}/products/category/${categorySlug}`);
  if (!res.ok) throw new Error("Failed to fetch products");
  return res.json();
};
