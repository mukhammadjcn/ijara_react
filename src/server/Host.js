import axios from "axios";

// Names for local usage
export const ROLE = "role";
export const ACCESS = "access";
export const REFRESH = "refresh";

// Get cookies
export const role = localStorage.getItem(ROLE);
export const token = localStorage.getItem(ACCESS);
export const refresh = localStorage.getItem(REFRESH);

export let host = "https://backoffice.ijara.edu.uz/api";

export let headers = {
  "X-Requested-With": "XMLHttpRequest",
  "Content-Type": "application/json; charset=utf-8",
  Authorization: token ? `Bearer ${token}` : "",
};

export let axiosInstance = axios.create({
  headers,
  baseURL: host,
  timeout: 100000,
});

export const HttpRequestHub = (config = null) => {
  return axiosInstance(config);
};
