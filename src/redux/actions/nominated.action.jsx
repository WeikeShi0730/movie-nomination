import { SET_NOMINATED, SET_COUNT, SET_LOADING } from "./types";

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

export const setIsLoading = (isLoading) => (dispatch) => {
  dispatch({
    type: SET_LOADING,
    payload: isLoading,
  });
};
