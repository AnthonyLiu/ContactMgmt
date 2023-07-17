import { Dispatch } from "redux";
import { getUser, updateUser } from "../../api/index";
import { setUser, resetUser, User } from "../actions/user";

export const attemptGetUser = () => (dispatch: Dispatch) =>
  getUser()
    .then((response) => {
      if (response.data.user) {
        dispatch(setUser(response.data.user));
      } else {
        dispatch(resetUser());
      }
    })
    .catch(() => {
      dispatch(resetUser());
    });

export const attemptUpdateUser = (user: User) => () => updateUser(user);