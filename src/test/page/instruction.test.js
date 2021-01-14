import React from "react";
import { shallow } from "enzyme";
import Instruction from "../../page/instruction/instruction.component";

it("should render Instruction component", () => {
  expect(shallow(<Instruction />).getElement()).toMatchSnapshot();
});
