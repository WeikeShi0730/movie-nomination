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
import {
  addUserNominationMovie,
  updateSubmitted,
} from "../../firebase/firebase.utils";

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
  currentUser,
}) {
  /** fetch data from API by calling util function fetchData() */
  useEffect(() => {
    setIsLoading(true);
    const fetchedData = fetchData(
      `http://www.omdbapi.com/?i=tt3896198&apikey=e00c961&s=${searchField}`
    );

    /** check if Response is True, then setState */
    fetchedData
      .then((data) => {
        if (data.Response === "True") {
          return data;
        }
      })
      .then((movies) => {
        setMovieList({ movies });
        setIsLoading(false);
      })
      .catch((error) => console.log("Data fetching error: ", error));

    return () => {
      setIsLoading(false);
      setMovieList([]);
    };
  }, [searchField, setIsLoading, setMovieList]);

  /** Keep the value made in the input */
  const onSearchChange = (event) => {
    setSearchField(event.target.value);
  };

  /** if new nomination list is less than 5, set this new list.
   * this function is called when nominate is clicked,
   * keep a session redux state
   */
  const onNominationList = (newNominationList) => {
    if (newNominationList.length <= 5) {
      setCount(5 - newNominationList.length);
      setNominated(newNominationList);
    }
    // if done picking 5, display notification banner
    if (newNominationList.length === 5) {
      diplayBanner();
    }
  };

  /** click on submit button, update user's nomination, and the total nomination list */
  const onClickSubmit = async () => {
    if (nominatedList.length <= 5) {
      setIsLoading(true);
      await addUserNominationMovie(nominatedList, currentUser);
      await updateSubmitted(
        { nominatedList: nominatedList, count: count },
        currentUser
      );
      setIsLoading(false);
    }
  };

  function diplayBanner() {
    var x = document.getElementById("snackbar");
    x.className = "show";
    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  }
  return (
    <div className={`${isLoading ? "isLoading" : "notLoading"}`}>
      {/** isLoading state to display loading animation */}
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
      <div className="nomination-page">
        <SearchBar onSearchChange={onSearchChange} />
        <h1>{count > 0 ? `${count} Movies left` : `You've picked 5 movies`}</h1>
        <div id="snackbar">Congrats! You've picked 5 movies!</div>
        <div>
          {/** left side is for displaying search results */}
          <div className="column-left">
            {searchField !== undefined &&
              movieList !== undefined &&
              movieList.movies !== undefined &&
              movieList.movies.Search !== undefined && (
                <MovieList
                  key="0"
                  className="column movie-list"
                  movieList={movieList.movies.Search}
                  nominatedList={nominatedList}
                  onChange={(newNominationList) =>
                    onNominationList(newNominationList)
                  }
                />
              )}
          </div>
          {/** Right side is for displaying current user nominations */}
          <div className="column-right">
            {currentUser !== null && (
              <Nomination
                key="1"
                className="nomination-list"
                onChange={(newNominationList) =>
                  onNominationList(newNominationList)
                }
                onClickSubmit={onClickSubmit}
                nominatedList={nominatedList}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

/** use states from redux */
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
