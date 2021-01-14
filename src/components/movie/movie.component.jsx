import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import "./movie.styles.scss";

const Movie = ({ movie, onChange, nominated, currentUser }) => {
  /*
  set nominatedState local state for button disable condition
   */
  const [nominatedState, setNominatedState] = useState(nominated);

  const onClickChange = () => {
    /*
    If there is user signed in, make this new nomination on click
    else, show alert banner
    */
    if (currentUser) {
      const newNomination = {
        title: movie.Title,
        imdbID: movie.imdbID,
        year: movie.Year,
        nominated: true,
        poster: movie.Poster,
        total: 1,
      };

      // call parent onChange function
      onChange(newNomination);
    } else {
      alert(
        "You are now nominating offline.\nPlease sign in to nominate or your vote will not be counted!"
      );
    }
  };

  /*
  useEffect hook to setNominated state based on prop nominated state 
   */
  useEffect(() => {
    setNominatedState(nominated);
    return () => setNominatedState(false);
  }, [nominated]);

  return (
    <div className="movie-container">
      <div className="info">
        <p>{movie.Title}</p>
        <p> {movie.Year}</p>
        <img src={movie.Poster} alt="Poster Not Avaliable" />
        <CustomButton
          className="button"
          disable={nominatedState}
          onChange={(event) => onClickChange(event)}
        >
          Nominate
        </CustomButton>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});
export default connect(mapStateToProps)(Movie);
