import React from "react";
import { shallow } from "enzyme";
import SignUp from "../../components/sign-up/sign-up.component";

it("should render SignUp component", () => {
  expect(shallow(<SignUp />).getElement()).toMatchSnapshot();
});
