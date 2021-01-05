import React from "react";
import { shallow } from "enzyme";
import Movie from "../../components/movie/movie.component";

it("should render Moive component", () => {
  const mockMovie = {
    Title: "Test Movie Name",
    Year: 1024,
  };
  expect(shallow(<Movie movie={mockMovie} />).getElement()).toMatchSnapshot();
});
