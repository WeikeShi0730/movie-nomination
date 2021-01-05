import {
  SET_MOVIELIST,
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
  SET_SEARCH_FIELD,
} from "../../redux/actions/types";

import nominatedReducer from "../../redux/reducers/movieSelection.reducer";

const initialState = {
  movieList: [],
  nominatedList: [],
  count: 5,
  isLoading: false,
  searchField: "",
};
describe("test all the reducers", () => {
  it("should return the initial state", () => {
    expect.assertions(1);
    expect(nominatedReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_MOVIELIST", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(initialState, {
        type: SET_MOVIELIST,
        payload: [
          {
            title: "movie title",
            imdbID: "movie imdbID",
            year: "movie Year",
            nominated: true,
          },
        ],
      })
    ).toEqual({
      ...initialState,
      movieList: [
        {
          title: "movie title",
          imdbID: "movie imdbID",
          year: "movie Year",
          nominated: true,
        },
      ],
    });
  });

  it("should handle SET_LOADING", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(initialState, {
        type: SET_LOADING,
        payload: true,
      })
    ).toEqual({
      ...initialState,
      isLoading: true,
    });
  });

  it("should handle SET_NOMINATED", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(initialState, {
        type: SET_NOMINATED,
        payload: [
          {
            title: "movie title",
            imdbID: "movie imdbID",
            year: "movie Year",
            nominated: true,
          },
        ],
      })
    ).toEqual({
      ...initialState,
      nominatedList: [
        {
          title: "movie title",
          imdbID: "movie imdbID",
          year: "movie Year",
          nominated: true,
        },
      ],
    });
  });

  it("should handle SET_COUNT", () => {
    expect.assertions(1);
    expect(
      nominatedReducer(initialState, {
        type: SET_COUNT,
        payload: 4,
      })
    ).toEqual({
      ...initialState,
      count: 4,
    });
  });

  it("should handle SET_SEARCH_FIELD", () => {
    expect(
      nominatedReducer(initialState, {
        type: SET_SEARCH_FIELD,
        payload: "rat",
      })
    ).toEqual({
      ...initialState,
      searchField: "rat",
    });
  });
});
