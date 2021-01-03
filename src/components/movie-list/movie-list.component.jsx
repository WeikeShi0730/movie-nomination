import React from "react";

import Movie from "../movie/movie.component";

import "./movie-list.styles.scss";

const MovieList = (props) => {
  const { nominationList, movieList, onChange } = props;

  const onClickChange = (newNomination) => {
    if (nominationList.length < 5) {
      const newNominationList = nominationList;
      newNominationList.push(newNomination);
      onChange(newNominationList);
    }
  };

  const checkList = (movie) => {
    var nomination;
    for (nomination in nominationList) {
      if (nominationList[nomination].imdbID === movie.imdbID) {
        return true;
      }
    }
    return false;
  };

  return (
    <div className="movie-list">
      <h2 className="title">Result</h2>
      {movieList.map((movie) => (
        <Movie
          key={movie.imdbID}
          movie={movie}
          onChange={(newNomincation) => onClickChange(newNomincation)}
          nominated={checkList(movie)}
        />
      ))}
    </div>
  );
};

export default MovieList;
