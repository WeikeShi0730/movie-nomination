import {SET_MOVIELIST,
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
  SET_SEARCH_FIELD,
} from "./types";

export const setMovieList = (movieList) => (dispatch) => {
  dispatch({
    type: SET_MOVIELIST,
    payload: movieList,
  });
};

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

export const setSearchField = (searchField) => (dispatch) => {
  dispatch({
    type: SET_SEARCH_FIELD,
    payload: searchField,
  });
};
