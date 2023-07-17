import { Credentials, User } from "src/store/actions/user";
import http from "../services/httpService";

const postLogin = (credentials: Credentials) =>
  http.post<{ user: User }>("/auth/login", credentials);

const postLogout = () => http.post<void>("/auth/logout");

const postUser = (user: User) => http.post<void>("/user/register", user);

const getUser = () => http.get<{ user: User }>("/user");

const updateUser = (user: User) => http.post<void>("/user/update", user);

export {
  postLogin,
  postLogout,
  postUser,
  getUser,
  updateUser,
};
