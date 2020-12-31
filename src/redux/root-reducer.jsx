import { combineReducers } from "redux";
import nominatedReducer from "./reducers/nominated.reducer";

const rootReducer = combineReducers({
  nominated: nominatedReducer,
});

export default rootReducer;
