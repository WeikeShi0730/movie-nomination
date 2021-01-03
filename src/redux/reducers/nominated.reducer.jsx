import { SET_NOMINATED, SET_COUNT, SET_LOADING } from "../actions/types";

const initialState = {
  nominatedList: [],
  count: 5,
  isLoading: false,
};

export default function nominatedReducer(state = initialState, action) {
  switch (action.type) {
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
    default:
      return state;
  }
}
