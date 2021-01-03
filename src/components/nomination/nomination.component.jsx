import React from "react";

import CustomButton from "../custom-button/custom-buttom.component";

import "./nomination.styles.scss";

const Nomination = (props) => {
  const { nominationList, onChange } = props;

  const onClickChange = (event, movie) => {
    event.preventDefault();

    const newNominationList = nominationList.filter(
      (removeMovie) => movie.imdbID !== removeMovie.imdbID
    );

    onChange(newNominationList);
  };

  return (
    <div>
      <div className="nomination-list">
        <h2 className="title">Nomination List</h2>
        {nominationList.map((movie) => {
          if (movie.nominated) {
            return (
              <div className="nomination">
                <h2>{movie.title}</h2>
                <p>{movie.year}</p>
                <CustomButton
                  key={movie.imdbID}
                  nominated={movie.nominated}
                  value={movie.title}
                  onChange={(event) => onClickChange(event, movie)}
                />
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};

export default Nomination;
