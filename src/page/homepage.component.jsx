import React, { useState, useEffect } from "react";
import { connect } from "react-redux";

import {
  setNominated,
  setCount,
  setIsLoading,
} from "../redux/actions/nominated.action";

import { SearchBar } from "../components/search-bar/search-bar.component";
import MovieList from "../components/movie-list/movie-list.component";
import Nomination from "../components/nomination/nomination.component";

import "./homepage.styles.scss";

function Homepage({
  nominatedList,
  count,
  isLoading,
  setNominated,
  setCount,
  setIsLoading,
}) {
  const [movieList, setMovieList] = useState();
  const [searchField, setSearchField] = useState();

  useEffect(() => {
    setIsLoading(true);
    async function fetchData() {
      const res = await fetch(
        `http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=${searchField}`
      );
      return res;
    }

    fetchData()
      .then((res) => res.json())
      .then((json) => {
        if (json.Response === "True") {
          return json;
        }
      })
      .then((movies) => setMovieList({ movies }));
    setIsLoading(false);
  }, [searchField, setIsLoading]);

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
    <div className={`${isLoading ? "isLoading" : "notLoading"}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="homepage">
        <SearchBar onSearchChange={onSearchChange} />
        <h1>{count > 0 ? count + " Movies left" : "You've picked 5 movies"}</h1>
        <div>
          <div className="column-left">
            {searchField !== undefined &&
              movieList !== undefined &&
              movieList.movies !== undefined && (
                <MovieList
                  key={0}
                  className="column movie-list"
                  movieList={movieList.movies.Search}
                  nominationList={nominatedList}
                  onChange={(newNominationList) =>
                    onNominationList(newNominationList)
                  }
                />
              )}
          </div>
          <div className="column-right">
            <Nomination
              key={1}
              className="nomination-list"
              onChange={(newNominationList) =>
                onNominationList(newNominationList)
              }
              nominationList={nominatedList}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  nominatedList: state.nominated.nominatedList,
  count: state.nominated.count,
  isLoading: state.nominated.isLoading,
});

export default connect(mapStateToProps, {
  setNominated,
  setCount,
  setIsLoading,
})(Homepage);
