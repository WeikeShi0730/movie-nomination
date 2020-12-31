import { SET_NOMINATED, SET_COUNT } from "../actions/types";

const initialState = {
  nominatedList: [],
  count: 5,
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

    default:
      return state;
  }
}
