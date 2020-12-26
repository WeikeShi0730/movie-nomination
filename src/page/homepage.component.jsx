import React, { useState, useEffect } from "react";

import { SearchBar } from "../components/search-bar/search-bar.component";
import MovieList from "../components/movie-list/movie-list.component";
import Nomination from "../components/nomination/nomination.component";
import "./homepage.component.jsx";

function Homepage() {
  const [movieList, setMovieList] = useState();
  const [searchField, setSearchField] = useState();
  const [count, setCount] = useState(5);

  const defaultList = [
    {
      title: "",
      imdbID: "",
      year: "",
      nominated: false,
    },
  ];

  const [nominationList, setNominationList] = useState(defaultList);

  useEffect(() => {
    function fetchData() {
      fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=${searchField}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.Response === "True") {
            return json;
          }
        })
        .then((movies) => setMovieList({ movies }));
    }
    fetchData();
  }, [searchField]);

  const onSearchChange = (event) => {
    const newText = event.target.value;
    if (newText.length) setSearchField(event.target.value);
  };

  const onNominationList = (newNominationList) => {
    if (newNominationList.length <= 6) {
      setCount(6 - newNominationList.length);
      setNominationList(newNominationList);
    }
  };

  return (
    <div className="Homepage">
      <SearchBar onSearchChange={onSearchChange} />
      <h1>{count}</h1>
      {searchField !== undefined &&
        movieList !== undefined &&
        movieList.movies !== undefined && (
          <MovieList
            key={0}
            movieList={movieList.movies.Search}
            nominationList={nominationList}
            onChange={(newNominationList) =>
              onNominationList(newNominationList)
            }
          />
        )}
      <hr />
      <Nomination
        key={1}
        onChange={(newNominationList) => onNominationList(newNominationList)}
        nominationList={nominationList}
      />
    </div>
  );
}

export default Homepage;
