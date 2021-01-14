import React from "react";
import { shallow } from "enzyme";
import SignIn from "../../components/sign-in/sign-in.component";

it("should render SignIn component", () => {
  expect(shallow(<SignIn />).getElement()).toMatchSnapshot();
});
