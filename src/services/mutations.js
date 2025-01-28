import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../configs/api";
const useRegister = () => {
  const mutationFn = (data) => api.post("auth/register", data);

  return useMutation({ mutationFn });
};
const useLogin = () => {
  const mutationFn = (data) => api.post("auth/login", data);
  return useMutation({ mutationFn });
};
const useDeleteProducts = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.delete(`products/${data}`);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useEditProducts = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => {
    const { id, ...updatedData } = data;
    return api.put(`products/${id}`, updatedData);
  };
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useAddProduct = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("products/", data);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["products"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

export {
  useRegister,
  useLogin,
  useDeleteProducts,
  useAddProduct,
  useEditProducts,
};
