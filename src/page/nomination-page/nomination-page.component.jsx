import React, { useEffect } from "react";
import { connect } from "react-redux";

import {
  setMovieList,
  setNominated,
  setCount,
  setIsLoading,
  setSearchField,
} from "../../redux/actions/movieSelection.action";

import { SearchBar } from "../../components/search-bar/search-bar.component";
import MovieList from "../../components/movie-list/movie-list.component";
import Nomination from "../../components/nomination/nomination.component";

import { fetchData } from "../../utils/fetchData.utils";
import { addNominationMovie } from "../../firebase/firebase.utils";

import "./nomination-page.styles.scss";

function NominationPage({
  movieList,
  nominatedList,
  count,
  isLoading,
  searchField,
  setMovieList,
  setNominated,
  setCount,
  setIsLoading,
  setSearchField,
  history,
  currentUser,
}) {
  useEffect(() => {
    setIsLoading(true);
    const fetchedData = fetchData(
      `http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=${searchField}`
    );
    fetchedData
      .then((data) => {
        if (data.Response === "True") {
          return data;
        }
      })
      .then((movies) => {
        setMovieList({ movies });
        setIsLoading(false);
      });
  }, [searchField, setIsLoading, setMovieList]);

  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  const onNominationList = (newNominationList) => {
    if (newNominationList.length <= 5) {
      setCount(5 - newNominationList.length);
      setNominated(newNominationList);
      addNominationMovie(newNominationList, currentUser);
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
      <div className="nomination-page">
        <SearchBar onSearchChange={onSearchChange} />
        <h1>{count > 0 ? `${count} Movies left` : `You've picked 5 movies`}</h1>
        <div>
          <div className="column-left">
            {searchField !== undefined &&
              movieList !== undefined &&
              movieList.movies !== undefined &&
              movieList.movies.Search !== undefined && (
                <MovieList
                  key="0"
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
            {currentUser !== null && (
              <Nomination
                key="1"
                className="nomination-list"
                onChange={(newNominationList) =>
                  onNominationList(newNominationList)
                }
                nominationList={nominatedList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

const mapStateToProps = (state) => ({
  movieList: state.movieSelection.movieList,
  nominatedList: state.movieSelection.nominatedList,
  count: state.movieSelection.count,
  isLoading: state.movieSelection.isLoading,
  searchField: state.movieSelection.searchField,

  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps, {
  setMovieList,
  setNominated,
  setCount,
  setIsLoading,
  setSearchField,
})(NominationPage);
