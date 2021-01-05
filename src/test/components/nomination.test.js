import React from "react";
import { shallow } from "enzyme";
import Nomination from "../../components/nomination/nomination.component";

it("should render Nomination component", () => {
  const mockNominationList = [
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
  expect(shallow(<Nomination nominationList={mockNominationList} />).getElement()).toMatchSnapshot();
});
