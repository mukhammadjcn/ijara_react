import { HttpRequestHub } from "../Host";

export const GetFunc = (url, data = "") => {
  const config = {
    method: "GET",
    url: `${url}`,
    data,
  };
  return HttpRequestHub(config);
};

export const DeleteFunc = (url) => {
  const config = {
    method: "DELETE",
    url: `${url}`,
  };
  return HttpRequestHub(config);
};

export const CreateFunc = (url, data) => {
  const config = {
    method: "POST",
    url: `${url}`,
    data,
  };
  return HttpRequestHub(config);
};

export const EditFunc = (url, data, method = "PUT") => {
  const config = {
    method: method,
    url: `${url}`,
    data,
  };
  return HttpRequestHub(config);
};
