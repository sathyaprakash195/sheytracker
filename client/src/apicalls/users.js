import { apiRequest } from "./axiosInstance";

const apiEndpoint = "/api/users";

export const RegisterUser = async (payload) =>
  apiRequest("post", `${apiEndpoint}/register`, payload);

export const LoginUser = async (payload) =>
  apiRequest("post", `${apiEndpoint}/login`, payload);

export const GetCurrentUser = async () =>
  apiRequest("get", `${apiEndpoint}/get-current-user`);

export const GetAllUsers = async () =>
  apiRequest("get", `${apiEndpoint}/get-all-users`);

export const UpdateUserStatus = async (payload) =>
  apiRequest("put", `${apiEndpoint}/update-user-status`, payload);
