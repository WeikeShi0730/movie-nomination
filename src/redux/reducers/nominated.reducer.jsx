import {
  SET_MOVIELIST,
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
  SET_SEARCH_FIELD,
} from "../actions/types";

const initialState = {
  movieList: [],
  nominatedList: [],
  count: 5,
  isLoading: false,
  searchField: "",
};

export default function nominatedReducer(state = initialState, action) {
  switch (action.type) {
    case SET_MOVIELIST:
      return {
        ...state,
        movieList: action.payload,
      };
      
    case SET_NOMINATED:
      return {
        ...state,
        nominatedList: action.payload,
      };

    case SET_COUNT:
      return {
        ...state,
        count: action.payload,
      };
    case SET_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };

    case SET_SEARCH_FIELD:
      return {
        ...state,
        searchField: action.payload,
      };
    default:
      return state;
  }
}
