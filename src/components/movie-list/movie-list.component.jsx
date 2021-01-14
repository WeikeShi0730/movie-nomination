import React from "react";

import Movie from "../movie/movie.component";

import "./movie-list.styles.scss";

const MovieList = ({ nominatedList, movieList, onChange }) => {
  /*
  if the nomination list is still less than 5, add the new movie 
  from children <Movie> component to the nomination list
  Call parent onChange funtion
   */
  const onClickChange = (newNomination) => {
    if (nominatedList.length < 5) {
      const newNominationList = nominatedList;
      newNominationList.push(newNomination);
      onChange(newNominationList);
    }
  };

  /*
  check if the movie is nominated, and pass as a prop to children
   */
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
      {/*
        map all the movie in the movieList
       */}
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
