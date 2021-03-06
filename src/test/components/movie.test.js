import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Movie from "../../components/movie/movie.component";

const mockStore = configureMockStore();
const store = mockStore({});

it("should render Moive component", () => {
  const mockMovie = {
    Title: "Test Movie Name",
    Year: 1024,
  };
  expect(
    shallow(
      <Provider store={store}>
        <Movie movie={mockMovie} />
      </Provider>
    ).getElement()
  ).toMatchSnapshot();
});
