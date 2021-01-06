import { SET_USER } from "../actions/types";

const initialState = {
  currentUser: null,
};

export default function userReducer(state = initialState, action) {
  switch (action.type) {
    case SET_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
}
