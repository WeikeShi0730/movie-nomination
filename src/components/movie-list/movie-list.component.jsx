import React from 'react';

import { Movie } from '../movie/movie.component'

import './movie-list.styles.scss';

export const MovieList = props => (
  <div className='movie-list'>
    {props.movieList.map(movies => (
      <Movie key={movies.imdbID} movies={movies} />
    ))}
  </div>
);
