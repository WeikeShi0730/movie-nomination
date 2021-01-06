import { combineReducers } from "redux";
import movieSelectionReducer from "./reducers/movieSelection.reducer";
import userReducer from "./reducers/user.reducer";

const rootReducer = combineReducers({
  movieSelection: movieSelectionReducer,
  user: userReducer,
});

export default rootReducer;
