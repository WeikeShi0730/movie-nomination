import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  SET_MOVIELIST,
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
  SET_SEARCH_FIELD,
} from "../../redux/actions/types";
import * as actions from "../../redux/actions/nominated.action";

const mockStore = configureMockStore([thunk]);

describe("test SET_MOVIELIST action", () => {
  expect.assertions(1);
  it("should handle SET_MOVIELIST action", () => {
    const store = mockStore();
    store.dispatch(
      actions.setMovieList([
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
      type: SET_MOVIELIST,
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

describe("test SET_LOADING action", () => {
  it("should handle SET_LOADING action", () => {
    expect.assertions(1);
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
    expect.assertions(1);
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
    expect.assertions(1);
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

describe("test SET_SEARCH_FIELD action", () => {
  it("should handle SET_SEARCH_FIELD action", () => {
    expect.assertions(1);
    const store = mockStore();
    store.dispatch(actions.setSearchField("rat"));
    const action = store.getActions();
    const expectedAction = {
      type: SET_SEARCH_FIELD,
      payload: "rat",
    };
    expect(action[0]).toEqual(expectedAction);
  });
});
