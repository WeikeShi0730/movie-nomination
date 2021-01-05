import React from "react";
import { shallow } from "enzyme";
import CustomButton from "../../components/custom-button/custom-button.component";

it("should render CustomButton component", () => {
  expect(shallow(<CustomButton />).getElement()).toMatchSnapshot();
});
