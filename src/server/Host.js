import axios from "axios";

// Names for local usage
export const ROLE = "role";
export const METRO = "metro";
export const ACCESS = "access";
export const REFRESH = "refresh";
export const REGIONS = "regions";

// Get cookies
export const role = localStorage.getItem(ROLE);
export const token = localStorage.getItem(ACCESS);
export const refresh = localStorage.getItem(REFRESH);
export const metroList = JSON.parse(localStorage.getItem(METRO)) || [];
export const regionsList = JSON.parse(localStorage.getItem(REGIONS)) || [];

// Set localstorage items
export const SetLocal = (name, value) => localStorage.setItem(name, value);

// Host JS
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
