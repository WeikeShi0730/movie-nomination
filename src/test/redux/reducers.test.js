import {
  SET_NOMINATED,
  SET_COUNT,
  SET_LOADING,
} from "../../redux/actions/types";

import nominatedReducer from "../../redux/reducers/nominated.reducer";

const initialState = {
  movieList: [],
  nominatedList: [],
  count: 5,
  isLoading: false,
  searchField: "",
};
describe("test all the reducers", () => {
  it("should return the initial state", () => {
    expect(nominatedReducer(undefined, {})).toEqual(initialState);
  });

  it("should handle SET_LOADING", () => {
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
});
