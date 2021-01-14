import React from "react";
import { shallow } from "enzyme";
import Dashboard from "../../page/dashboard/dashboard.component";

it("should render Dashboard component", () => {
  expect(shallow(<Dashboard />).getElement()).toMatchSnapshot();
});
