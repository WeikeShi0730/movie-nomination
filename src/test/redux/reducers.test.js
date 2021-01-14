import {
  SET_MOVIELIST,
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
  SET_SEARCH_FIELD,
} from "../../redux/actions/types";
import { SET_USER } from "../../redux/actions/types";

import nominatedReducer from "../../redux/reducers/movieSelection.reducer";
import userReducer from "../../redux/reducers/user.reducer";

const userInitialState = {
  currentUser: null,
};
describe("test all the user reducers", () => {
  it("should return the initial state", () => {
    expect.assertions(1);
    expect(userReducer(undefined, {})).toEqual(userInitialState);
  });
  it("should handle SET_USER", () => {
    expect.assertions(1);
    expect(
      userReducer(userInitialState, {
        type: SET_USER,
        payload: {
          id: "abc",
          email: "a@gmail.com",
        },
      })
    ).toEqual({
      ...userInitialState,
      currentUser: {
        id: "abc",
        email: "a@gmail.com",
      },
    });
  });
});

const movieInitialState = {
  movieList: [],
  nominatedList: [],
  count: 5,
  isLoading: false,
  searchField: "",
};
describe("test all the movie reducers", () => {
  it("should return the initial state", () => {
    expect.assertions(1);
    expect(nominatedReducer(undefined, {})).toEqual(movieInitialState);
  });

  it("should handle SET_MOVIELIST", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(movieInitialState, {
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
      })
    ).toEqual({
      ...movieInitialState,
      movieList: [
        {
          title: "movie title",
          imdbID: "movie imdbID",
          year: "movie Year",
          nominated: true,
          poster: "http://poster",
        },
      ],
    });
  });

  it("should handle SET_LOADING", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(movieInitialState, {
        type: SET_LOADING,
        payload: true,
      })
    ).toEqual({
      ...movieInitialState,
      isLoading: true,
    });
  });

  it("should handle SET_NOMINATED", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(movieInitialState, {
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
      })
    ).toEqual({
      ...movieInitialState,
      nominatedList: [
        {
          title: "movie title",
          imdbID: "movie imdbID",
          year: "movie Year",
          nominated: true,
          poster: "http://poster",
        },
      ],
    });
  });

  it("should handle SET_COUNT", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(movieInitialState, {
        type: SET_COUNT,
        payload: 4,
      })
    ).toEqual({
      ...movieInitialState,
      count: 4,
    });
  });

  it("should handle SET_SEARCH_FIELD", () => {
    expect(
      nominatedReducer(movieInitialState, {
        type: SET_SEARCH_FIELD,
        payload: "rat",
      })
    ).toEqual({
      ...movieInitialState,
      searchField: "rat",
    });
  });
});
