const { fetchData } = require("../../page/homepage.component");
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
