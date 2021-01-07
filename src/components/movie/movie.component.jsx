import React, { useEffect, useState } from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import { setIsLoading } from "../../redux/actions/movieSelection.action";

import { addMovieToTotalList } from "../../firebase/firebase.utils";

import "./movie.styles.scss";

const Movie = ({
  movie,
  onChange,
  nominated,
  currentUser,
  setIsLoading,
  isLoading,
}) => {
  const [nominatedState, setNominatedState] = useState(nominated);

  const onClickChange = async (event) => {
    if (currentUser) {
      const newNomination = {
        title: movie.Title,
        imdbID: movie.imdbID,
        year: movie.Year,
        nominated: true,
        poster: movie.Poster,
        total: 1,
      };
      setIsLoading(true);
      await addMovieToTotalList(newNomination);
      setIsLoading(false);
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
    <div className={`${isLoading ? "isLoading" : "notLoading"}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,

  isLoading: state.movieSelection.isLoading,
});
export default connect(mapStateToProps, { setIsLoading })(Movie);
