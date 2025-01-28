import { useQuery } from "@tanstack/react-query";
import api from "configs/api";
const useGetAllProducts = (page, searchVal) => {
  const queryKey = ["products", page, searchVal];
  const queryFn = async ({ signal }) => {
    const searchParam = searchVal ? `&name=${searchVal}` : "";
    const response = await api.get(
      `products?page=${page}&limit=10${searchParam}`,
      { signal }
    );
    return response;
  };

  return useQuery({ queryKey, queryFn });
};
const useProductsById = (productId) => {
  const queryKey = ["product", productId];
  const queryFn = () => api.get(`products/${productId}`);
  return useQuery({ queryKey, queryFn });
};
export { useGetAllProducts, useProductsById };
