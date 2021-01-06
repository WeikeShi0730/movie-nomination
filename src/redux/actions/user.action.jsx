import { SET_USER } from "./types";

export const setCurrentUser = (currentUser) => (dispatch) => {
  dispatch({
    type: SET_USER,
    payload: currentUser,
  });
};
