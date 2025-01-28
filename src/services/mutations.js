import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../configs/api";
const useLogin = () => {
  const mutationFn = (data) => api.post("/login", data);
  return useMutation({ mutationFn });
};
const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.delete(`/users/${data}`);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useAddUser = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => api.post("/users", data);
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  return useMutation({ mutationFn, onSuccess });
};
const useEditUser = () => {
  const queryClient = useQueryClient();
  const mutationFn = (data) => {
    const { id, ...updatedData } = data;
    return api.put(`/users/${id}`, updatedData);
  };
  const onSuccess = async () => {
    await queryClient.invalidateQueries({ queryKey: ["users"] });
  };
  return useMutation({ mutationFn, onSuccess });
};

export { useLogin, useDeleteUser, useAddUser, useEditUser };
