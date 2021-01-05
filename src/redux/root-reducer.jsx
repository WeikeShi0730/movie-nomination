import { combineReducers } from "redux";
import movieSelectionReducer from "./reducers/movieSelection.reducer";

const rootReducer = combineReducers({
  movieSelection: movieSelectionReducer,
});

export default rootReducer;
