import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Header from "../../components/header/header.component";

const mockStore = configureMockStore();
const store = mockStore({});

it("should render Header component", () => {
  expect(
    shallow(
      <Provider store={store}>
        <Header />
      </Provider>
    ).getElement()
  ).toMatchSnapshot();
});
