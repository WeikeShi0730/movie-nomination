import configureMockStore from "redux-mock-store";
import thunk from "redux-thunk";
import {
  SET_MOVIELIST,
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
  SET_SEARCH_FIELD,
} from "../../redux/actions/types";
import { SET_USER } from "../../redux/actions/types";
import * as actions from "../../redux/actions/movieSelection.action";
import * as user_actions from "../../redux/actions/user.action";

const mockStore = configureMockStore([thunk]);

describe("test SET_USER action", () => {
  it("should handle SET_USER action", () => {
    expect.assertions(1);
    const store = mockStore();
    store.dispatch(
      user_actions.setCurrentUser({
        id: "abc",
        email: "a@gmail.com",
      })
    );
    const action = store.getActions();
    const expectedAction = {
      type: SET_USER,
      payload: {
        id: "abc",
        email: "a@gmail.com",
      },
    };
    expect(action[0]).toEqual(expectedAction);
  });
});

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
          poster: "http://poster",
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
          poster: "http://poster",
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
          poster: "http://poster",
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
          poster: "http://poster",
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
