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
export { useLogin, useDeleteUser };
