import { apiRequest } from "./axiosInstance";

const apiEndpoint = "/api/projects";

export const AddNewProject = async (payload) =>
  apiRequest("post", `${apiEndpoint}/add-new-project`, payload);

export const GetAllProjects = async () =>
  apiRequest("get", `${apiEndpoint}/get-all-projects`);

export const GetProjectById = async (id) =>
  apiRequest("get", `${apiEndpoint}/get-project-by-id/${id}`);

export const UpdateProject = async (payload) =>
  apiRequest("put", `${apiEndpoint}/update-project/${payload._id}`, payload);

export const DeleteProject = async (id) =>
  apiRequest("delete", `${apiEndpoint}/delete-project/${id}`);

export const AddMemberToProject = async (payload) =>
  apiRequest("post", `${apiEndpoint}/add-member-to-project`, payload);

export const RemoveMemberFromProject = async (payload) =>
  apiRequest("post", `${apiEndpoint}/remove-member-from-project`, payload);

export const UpdateMemeberRoles = async (payload) => {
  return apiRequest("post", `${apiEndpoint}/update-member-roles`, payload);
};
