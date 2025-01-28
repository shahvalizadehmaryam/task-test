import { useMutation, useQueryClient } from "@tanstack/react-query";

import api from "../configs/api";
const useLogin = () => {
  const mutationFn = (data) => api.post("/login", data);
  return useMutation({ mutationFn });
};

export {
  useLogin,
};
