import { apiRequest } from "./axiosInstance";

const apiEndpoint = "/api/tasks";

export const CreateTask = async (payload) =>
  apiRequest("post", `${apiEndpoint}/create-task`, payload);

export const GetTasks = async (payload) =>
  apiRequest("post", `${apiEndpoint}/get-all-tasks` , payload);

export const GetTaskById = async (id) =>
  apiRequest("get", `${apiEndpoint}/get-task-by-id/${id}`);

export const UpdateTask = async (payload) =>
  apiRequest("put", `${apiEndpoint}/update-task/${payload._id}`, payload);

export const DeleteTask = async (id) =>
  apiRequest("delete", `${apiEndpoint}/delete-task/${id}`);
