import React from "react";

import Movie from "../movie/movie.component";

import "./movie-list.styles.scss";

const MovieList = (props) => {
  const { nominationList, movieList, onChange } = props;

  const onClickChange = (newNomination) => {
    const newNominationList = nominationList;
    newNominationList.push(newNomination);

    console.log(newNominationList);
    onChange(newNominationList);
  }

  return (
    <div className="movie-list">
      {movieList.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onChange={(newNomincation) => onClickChange(newNomincation)}
          nominated={
            nominationList.find((movie) =>
              nominationList.map(
                (nomination) => nomination.title === movie.title
              )
            ).nominated === true
              ? true
              : false
          }
        />
      ))}
    </div>
  );
};

export default MovieList;
