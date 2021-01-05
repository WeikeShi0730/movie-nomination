import React from "react";
import { shallow } from "enzyme";
import { SearchBar } from "../../components/search-bar/search-bar.component";

it("should render SearchBar component", () => {
  expect(shallow(<SearchBar />).getElement()).toMatchSnapshot();
});
