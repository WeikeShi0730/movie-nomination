import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import { setNominated, setCount } from "../redux/actions/nominated.action";

import { SearchBar } from "../components/search-bar/search-bar.component";
import MovieList from "../components/movie-list/movie-list.component";
import Nomination from "../components/nomination/nomination.component";

import "./homepage.styles.scss";

function Homepage({ nominatedList, count, setNominated, setCount }) {
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
    if (newNominationList.length <= 5) {
      setCount(5 - newNominationList.length);
      setNominated(newNominationList);
    }
  };

  return (
    <div className="homepage">
      <SearchBar onSearchChange={onSearchChange} />
      <h1>{count > 0 ? count + " Movies left" : "You've picked 5 movies"}</h1>
      {searchField !== undefined &&
        movieList !== undefined &&
        movieList.movies !== undefined && (
          <MovieList
            key={0}
            movieList={movieList.movies.Search}
            nominationList={nominatedList}
            onChange={(newNominationList) =>
              onNominationList(newNominationList)
            }
          />
        )}

      <Nomination
        key={1}
        onChange={(newNominationList) => onNominationList(newNominationList)}
        nominationList={nominatedList}
      />
    </div>
  );
}

const mapStateToProps = (state) => ({
  nominatedList: state.nominated.nominatedList,
  count: state.nominated.count,
});

export default connect(mapStateToProps, { setNominated, setCount })(Homepage);
