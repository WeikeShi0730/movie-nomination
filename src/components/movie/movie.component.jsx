import React, { useEffect, useState } from "react";

import CustomButton from "../custom-button/custom-buttom.component";

import "./movie.styles.scss";

const Movie = (props) => {
  const { movie, onChange, nominated } = props;

  const [nominatedState, setNominatedState] = useState(nominated);

  const onClickChange = (event) => {
    event.preventDefault();

    const newNomination = {
      title: movie.Title,
      imdbID: movie.imdbID,
      year: movie.Year,
      nominated: true,
    };

    onChange(newNomination);
  };

  useEffect(() => {
    setNominatedState(nominated);
  }, [nominated]);

  return (
    <div className="movie-container">
      <div className="info">
        <h3> {movie.Title} </h3>
        <h5> {movie.Year} </h5>
      </div>
      <CustomButton
        className="button"
        disable={nominatedState}
        nominated={nominatedState}
        onChange={(event) => onClickChange(event)}
      />
    </div>
  );
};

export default Movie;
