import React, { useState, useEffect } from "react";

import { SearchBar } from "../components/search-bar/search-bar.component";
import { MovieList } from "../components/movie-list/movie-list.component";
import "./homepage.component.jsx";

function Homepage() {
  const [movieList, setMovieList] = useState();
  const [searchField, setSearchField] = useState();

  useEffect(() => {
    function fetchData() {
      fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=${searchField}`
      )
        .then((response) => response.json())
        .then((json) => {
          if (json.Response === "True") {
            console.log(json);
            return json;
          }
        })
        .then((movies) => setMovieList({ movies }));

    }
    fetchData();
  }, [searchField]);

  const onSearchChange = (event) => {
    const newText = event.target.value;
    if (newText.length)
    setSearchField(event.target.value);
  };

  return (
    <div className="Homepage">
      <SearchBar onSearchChange={onSearchChange} />
      {searchField !== undefined &&
        movieList !== undefined &&
        movieList.movies !== undefined && (
          <MovieList movieList={movieList.movies.Search} />
        )}
    </div>
  );
}

export default Homepage;
