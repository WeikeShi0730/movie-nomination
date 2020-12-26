import React from "react";

import CustomButton from "../custom-button/custom-buttom.component";

import "./nomination.styles.scss";

const Nomination = (props) => {
  const { nominationList, onChange } = props;

  const onClickChange = (event, movie) => {
    event.preventDefault();
    const newNominationList = nominationList.filter(
      (removeMovie) => movie.title !== removeMovie.title
    );

    onChange(newNominationList);
  };

  return (
    <div className="nomination-list">
      {nominationList.map((movie) => {
        if (movie.nominated) {
          return (
            <div>
              <h2>{movie.title}</h2>
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
  );
};

export default Nomination;
