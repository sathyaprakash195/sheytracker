import { apiRequest } from "./axiosInstance";

const apiEndpoint = "/api/notifications";

export const AddNewNotification = async (payload) =>
  apiRequest("post", `${apiEndpoint}/add-new-notification`, payload);

export const GetAllNotifications = async () =>
  apiRequest("get", `${apiEndpoint}/get-all-notifications`);

export const DeleteNotification = async (id) =>
  apiRequest("delete", `${apiEndpoint}/delete-notification/${id}`);

export const ReadAllNotifications = async () =>
  apiRequest("put", `${apiEndpoint}/read-all-notifications`);
