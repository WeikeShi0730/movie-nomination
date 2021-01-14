import React from "react";
import { shallow } from "enzyme";
import SignInAndSignUpPage from "../../page/sign-in-sign-up/sign-in-sign-up.component";

it("should render SignInAndSignUpPage component", () => {
  expect(shallow(<SignInAndSignUpPage />).getElement()).toMatchSnapshot();
});
