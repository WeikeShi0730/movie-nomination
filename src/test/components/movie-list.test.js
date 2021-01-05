import React from "react";
import { shallow } from "enzyme";
import MovieList from "../../components/movie-list/movie-list.component";

it("should render MoiveList component", () => {
  const mockMovieList = [
    {
      Title: "Test Movie Name_0",
      Year: 1024,
      imdbID: "imdbID_0",
    },
    {
      Title: "Test Movie Name_1",
      Year: 1025,
      imdbID: "imdbID_1",
    },
    {
      Title: "Test Movie Name_2",
      Year: 1026,
      imdbID: "imdbID_2",
    },
  ];
  expect(shallow(<MovieList movieList={mockMovieList} />).getElement()).toMatchSnapshot();
});
