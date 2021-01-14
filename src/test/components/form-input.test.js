import React from "react";
import { shallow } from "enzyme";
import FormInput from "../../components/form-input/form-input.component";

it("should render FormInput component", () => {
  expect(shallow(<FormInput />).getElement()).toMatchSnapshot();
});
