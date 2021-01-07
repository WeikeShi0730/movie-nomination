import React from "react";

import CustomButton from "../custom-button/custom-button.component";

import { removeMoiveFromTotalList } from "../../firebase/firebase.utils";

import "./nomination.styles.scss";

const Nomination = ({ nominationList, onChange }) => {
  const onClickChange = async (event, movie) => {
    event.preventDefault();

    const newNominationList = nominationList.filter(
      (removeMovie) => movie.imdbID !== removeMovie.imdbID
    );
    await removeMoiveFromTotalList(movie);
    onChange(newNominationList);
  };

  return (
    <div>
      <div className="nomination-list">
        <h2 className="title">Nomination List</h2>
        {nominationList.map((movie) => {
          if (movie.nominated) {
            return (
              <div key={movie.imdbID} className="nomination">
                <h2>{movie.title}</h2>
                <p>{movie.year}</p>
                <img src={movie.poster} alt="Poster Not Avaliable" />
                <CustomButton
                  value={movie.title}
                  onChange={(event) => onClickChange(event, movie)}
                >
                  Un-Nominate
                </CustomButton>
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
