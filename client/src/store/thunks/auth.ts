import { login, logout, User } from "../actions/user";
import { Dispatch } from "redux";
import { Credentials } from "src/store/actions/user";

import {
  postUser,
  postLogin,
  postLogout,
} from "../../api/index";
import { NavigateFunction } from "react-router";

export const attemptLogin =
  (credentials: Credentials, navigate: NavigateFunction) => (dispatch: Dispatch) =>
    postLogin(credentials).then(({ data }) => {
      dispatch(login(data.user));
      navigate("/home", { replace: true });
    });

export const attemptLogout = (navigate: NavigateFunction) => (dispatch: Dispatch) =>
  postLogout()
    .then(() => {
      dispatch(logout());
    })
    .finally(() => {
      navigate("/login", { replace: true });
    });

export const attemptRegister = (newUser: User) => () => postUser(newUser);