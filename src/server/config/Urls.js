import { CreateFunc, GetFunc, EditFunc, DeleteFunc } from "./Requests";

// Login Configs ----------------------------------------------------------
export const LoginConfig = (data) => {
  return CreateFunc("/auth/token/", data);
};
export const GetAccessConfig = (data) => {
  return CreateFunc("/auth/token/refresh/", data);
};

// Regsiter Configs --------------------------------------------------------
export const RegisterConfig = (data) => {
  return CreateFunc("/auth/registration/", data);
};
export const RegisterCheckConfig = (data) => {
  return CreateFunc("/auth/registration/check/", data);
};
export const ResendConfig = (data) => {
  return CreateFunc("/auth/reset/send-code/", data);
};

// Edit user password  -----------------------------------------------------
export const ChangePasswordConfig = (phone, data) => {
  return EditFunc(`/auth/reset/password/${phone}/`, data);
};

// Create Advert -----------------------------------------------------------
export const PostAdvertConfig = (data) => {
  return CreateFunc(`announcement/ad/create/`, data);
};
export const EditAdvertConfig = (id, data) => {
  return EditFunc(`announcement/ads/${id}/`, data);
};
export const ChangeAdvertConfig = (id, data) => {
  return EditFunc(`announcement/ads/${id}/`, data, "PATCH");
};
export const GetAdvertsListConfig = (url = "") => {
  return GetFunc(`/announcement/ads/${url}`);
};
export const GetMapListConfig = (data) => {
  return CreateFunc(`/announcement/map/`, data);
};
export const GetAdvertsIDConfig = (id) => {
  return GetFunc(`/announcement/ads/${id}/`);
};
export const DelAdvertsIDConfig = (id) => {
  return DeleteFunc(`/announcement/ads/${id}/`);
};
export const PhoneStatConfig = (id) => {
  return GetFunc(`/announcement/calls/${id}/`);
};

// Get Edit user info -----------------------------------------------------------
export const GetUserConfig = () => {
  return GetFunc(`/users/me/`);
};
export const DeleteUserConfig = () => {
  return DeleteFunc(`/users/me/`);
};
export const EditUserConfig = (data) => {
  return EditFunc(`/users/me/`, data, "PATCH");
};
export const PostLIkeConfig = (data) => {
  return CreateFunc(`/users/like/`, data);
};
export const EditPasswordConfig = (data) => {
  return CreateFunc(`/users/password/`, data);
};

// Get adverts --------------------------------------------------------------
export const GetAdvertsConfig = (params = "") => {
  return GetFunc(`/users/ads/${params}`);
};
export const GetFavoritesConfig = () => {
  return GetFunc(`/users/favorites/`);
};
export const MyAdvertsConfig = (status) => {
  return GetFunc(`/users/ads/?status=${status}`);
};
export const MyFavoritesConfig = () => {
  return GetFunc(`/users/favorites/`);
};

// Get statitcs -------------------------------------------------------------
export const GetRegionsConfig = () => {
  return GetFunc(`/announcement/regions/`);
};
export const GetMetroConfig = () => {
  return GetFunc(`/announcement/metro/`);
};
