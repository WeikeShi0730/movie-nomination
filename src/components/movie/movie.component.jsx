import React, { useEffect, useState } from "react";

import CustomButton from "../custom-button/custom-button.component";

import "./movie.styles.scss";

const Movie = ({ movie, onChange, nominated }) => {
  const [nominatedState, setNominatedState] = useState(nominated);

  const onClickChange = (event) => {
    const newNomination = {
      title: movie.Title,
      imdbID: movie.imdbID,
      year: movie.Year,
      nominated: true,
      poster: movie.Poster,
    };

    onChange(newNomination);
  };

  useEffect(() => {
    setNominatedState(nominated);
  }, [nominated]);

  return (
    <div className="movie-container">
      <div className="info">
        <p style={{ fontSize: "20px", fontWeight: "bold" }}>{movie.Title}</p>
        <p> {movie.Year}</p>
        <img src={movie.Poster} alt="movie-poster" />
        <CustomButton
          className="button"
          disable={nominatedState}
          nominated={nominatedState}
          onChange={(event) => onClickChange(event)}
        />
      </div>
    </div>
  );
};

export default Movie;
