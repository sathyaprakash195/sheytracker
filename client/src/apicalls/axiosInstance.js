import axios from "axios";

export const apiRequest = async (method, url, payload) => {
  try {
    const response = await axios({
      method: method,
      url: url,
      data: payload,
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    return response.data;
  } catch (error) {
    return error.response;
  }
};
