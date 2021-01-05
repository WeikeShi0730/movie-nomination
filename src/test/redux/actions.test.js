import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
} from "../../redux/actions/types";
import * as actions from "../../redux/actions/nominated.action";

const mockStore = configureMockStore([thunk]);

describe("test SET_LOADING action", () => {
  it("should handle SET_LOADING action", () => {
    const store = mockStore();
    store.dispatch(actions.setIsLoading(true));
    const action = store.getActions();
    const expectedAction = {
      type: SET_LOADING,
      payload: true,
    };
    expect(action[0]).toEqual(expectedAction);
  });
});

describe("test SET_COUNT action", () => {
  it("should handle SET_COUNT action", () => {
    const store = mockStore();
    store.dispatch(actions.setCount(4));
    const action = store.getActions();
    const expectedAction = {
      type: SET_COUNT,
      payload: 4,
    };
    expect(action[0]).toEqual(expectedAction);
  });
});

describe("test SET_NOMINATED action", () => {
  it("should handle SET_NOMINATED action", () => {
    const store = mockStore();
    store.dispatch(
      actions.setNominated([
        {
          title: "movie title",
          imdbID: "movie imdbID",
          year: "movie Year",
          nominated: true,
        },
      ])
    );
    const action = store.getActions();
    const expectedAction = {
      type: SET_NOMINATED,
      payload: [
        {
          title: "movie title",
          imdbID: "movie imdbID",
          year: "movie Year",
          nominated: true,
        },
      ],
    };
    expect(action[0]).toEqual(expectedAction);
  });
});
