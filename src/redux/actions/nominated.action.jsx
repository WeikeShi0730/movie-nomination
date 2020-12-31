import { SET_NOMINATED, SET_COUNT } from "./types";

export const setNominated = (nominatedList) => (dispatch) => {
  dispatch({
    type: SET_NOMINATED,
    payload: nominatedList,
  });
};

export const setCount = (count) => (dispatch) => {
  dispatch({
    type: SET_COUNT,
    payload: count,
  });
};
