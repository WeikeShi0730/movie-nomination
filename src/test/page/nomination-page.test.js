import React from "react";
import { shallow } from "enzyme";
import { Provider } from "react-redux";
import configureMockStore from "redux-mock-store";
import NominationPage from "../../page/nomination-page/nomination-page.component.jsx";

const mockStore = configureMockStore();
const store = mockStore({});

it("should render NominationPage component", () => {
  expect(
    shallow(
      <Provider store={store}>
        <NominationPage />
      </Provider>
    ).getElement()
  ).toMatchSnapshot();
});

const { fetchData } = require("../../utils/fetchData.utils");
it("calls OMDb API to get movie data", () => {
  expect.assertions(2);
  return fetchData(
    "http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=king"
  ).then((data) => {
    expect(data.Search.length).toEqual(10);
    expect(
      data.Search.every((movie) => movie.Title.toLowerCase().includes("king"))
    ).toBeTruthy();
  });
});

it("calls OMDb API to get movie data", () => {
  expect.assertions(2);
  return fetchData(
    "http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=r"
  ).then((data) => {
    expect(data.Response).toEqual("False");
    expect(data.Error).toEqual("Too many results.");
  });
});

it("calls OMDb API to get movie data", () => {
  expect.assertions(2);
  return fetchData(
    "http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=crazy rich asians"
  ).then((data) => {
    expect(data.Search.length).toEqual(3);
    expect(
      data.Search.every((movie) =>
        movie.Title.toLowerCase().includes("crazy rich asians")
      )
    ).toBeTruthy();
  });
});
