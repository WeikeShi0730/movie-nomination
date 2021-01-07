import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import { updataTotalList } from "../../firebase/firebase.utils";

import "./movie.styles.scss";

const Movie = ({ movie, onChange, nominated, currentUser }) => {
  const [nominatedState, setNominatedState] = useState(nominated);

  const onClickChange = (event) => {
    if (currentUser) {
      const newNomination = {
        title: movie.Title,
        imdbID: movie.imdbID,
        year: movie.Year,
        nominated: true,
        poster: movie.Poster,
        total: 1,
      };
      updataTotalList(newNomination, "add");
      onChange(newNomination);
    } else {
      alert(
        "You are now nominating offline.\nPlease sign in to nominate or your vote will not be counted!"
      );
    }
  };

  useEffect(() => {
    setNominatedState(nominated);
  }, [nominated]);

  return (
    <div className="movie-container">
      <div className="info">
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{movie.Title}</p>
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
