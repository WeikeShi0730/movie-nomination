import React from "react";

import CustomButton from "../custom-button/custom-buttom.component";

import "./movie.styles.scss";

const Movie = (props) => {
  const { movie, onChange } = props;

  const onClickChange = () => {
    const newNomination = {
      title: movie.Title,
      imdbID: movie.imdbID,
      year: movie.Year,
      nominated: true,
    };

    onChange(newNomination);
  };

  return (
    <div className="movie-container">
      <h2> {movie.Title} </h2>
      <h3> {movie.Year} </h3>
      <CustomButton nominated={props.nominated} onChange={onClickChange} />
    </div>
  );
};

export default Movie;
