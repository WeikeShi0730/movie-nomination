import React from 'react';

import './movie.styles.scss';

export const Movie = props => (
  <div className='movie-container'>
    <h2> {props.movies.Title} </h2>
  </div>
);
