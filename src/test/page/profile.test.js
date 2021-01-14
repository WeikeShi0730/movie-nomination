import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import Profile from "../../page/profile/profile.component";

const mockStore = configureMockStore();
const store = mockStore({});

it("should render Profile component", () => {
  expect(
    shallow(
      <Provider store={store}>
        <Profile />
      </Provider>
    ).getElement()
  ).toMatchSnapshot();
});
