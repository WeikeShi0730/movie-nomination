import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";

import "./nomination.styles.scss";

const Nomination = ({
  nominatedList,
  onChange,
  onClickSubmit,
  currentUser,
}) => {
  var newNominatedList;

  /*
  click on un-nominated button on a movie, filter out other movie, 
  and call parent onChange function with the new nomination list
   */
  const onClickChange = (event, movie) => {
    event.preventDefault();
    newNominatedList = nominatedList.filter(
      (removeMovie) => movie.imdbID !== removeMovie.imdbID
    );
    onChange(newNominatedList);
  };

  return (
    <div>
      <div className="nomination-list">
        <h2 className="title">Nomination List</h2>
        {nominatedList.map((movie) => {
          if (movie.nominated) {
            return (
              <div key={movie.imdbID} className="nomination">
                <p>{movie.title}</p>
                <p> {movie.year}</p>
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
        {/*
          conditionally mount Submit button when there is a nomination list
         */}
        {nominatedList.length > 0 && (
          <CustomButton
            className="submit"
            disable={currentUser.submitted}
            onChange={onClickSubmit}
          >
            SUBMIT
          </CustomButton>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Nomination);
