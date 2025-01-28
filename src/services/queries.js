import {useQuery } from "@tanstack/react-query";
import api from "../configs/api";
const useGetAllUsers = () => {
  const queryKey = ["users"];
  const queryFn = () => api.get("/users?page=2");
  return useQuery({ queryKey, queryFn });
};
const useUserById = (userId) => {
  const queryKey = ["user", userId];
  const queryFn = () => api.get(`/users/${userId}`);
  return useQuery({ queryKey, queryFn });
};
export { useGetAllUsers, useUserById };
