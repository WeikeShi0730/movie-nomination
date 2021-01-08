import React from "react";

import Movie from "../movie/movie.component";

import "./movie-list.styles.scss";

const MovieList = ({ nominatedList, movieList, onChange }) => {
  const onClickChange = (newNomination) => {
    if (nominatedList.length < 5) {
      const newNominationList = nominatedList;
      newNominationList.push(newNomination);
      onChange(newNominationList);
    }
  };

  const checkList = (movie) => {
    var nomination;
    for (nomination in nominatedList) {
      if (nominatedList[nomination].imdbID === movie.imdbID) {
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
