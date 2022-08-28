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
  return CreateFunc(`announcement/ad/${id}/`, data);
};
export const GetAdvertsListConfig = (url = "") => {
  return GetFunc(`/announcement/ads/${url}`);
};
export const GetAdvertsIDConfig = (id) => {
  return GetFunc(`/announcement/ads/${id}/`);
};
export const DelAdvertsIDConfig = (id) => {
  return DeleteFunc(`/announcement/ads/${id}/`);
};

// Get user info -----------------------------------------------------------
export const GetUserConfig = () => {
  return GetFunc(`/users/me/`);
};
export const DeleteUserConfig = () => {
  return DeleteFunc(`/users/me/`);
};
export const EditUserConfig = (data) => {
  return EditFunc(`/users/me/`, data, "PATCH");
};

// Get adverts --------------------------------------------------------------
export const GetAdvertsConfig = (params = "") => {
  return GetFunc(`/users/ads/${params}`);
};
export const GetFavoritesConfig = () => {
  return GetFunc(`/users/favorites/`);
};
export const PostLIkeConfig = (data) => {
  return CreateFunc(`/users/like/`, data);
};

// Get statitcs -------------------------------------------------------------
export const GetRegionsConfig = () => {
  return GetFunc(`/announcement/regions/`);
};
export const GetMetroConfig = () => {
  return GetFunc(`/announcement/metro/`);
};
