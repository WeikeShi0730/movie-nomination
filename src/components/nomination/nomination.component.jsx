import React from "react";
import { connect } from "react-redux";

import CustomButton from "../custom-button/custom-button.component";
import { setIsLoading } from "../../redux/actions/movieSelection.action";

import { removeMoiveFromTotalList } from "../../firebase/firebase.utils";

import "./nomination.styles.scss";

const Nomination = ({ nominationList, onChange, setIsLoading, isLoading }) => {
  const onClickChange = async (event, movie) => {
    event.preventDefault();

    const newNominationList = nominationList.filter(
      (removeMovie) => movie.imdbID !== removeMovie.imdbID
    );
    setIsLoading(true);
    await removeMoiveFromTotalList(movie);
    setIsLoading(false);
    onChange(newNominationList);
  };

  return (
    <div className={`${isLoading ? "isLoading" : "notLoading"}`}>
      <div className="lds-ellipsis">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
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
    </div>
  );
};

const mapStateToProps = (state) => ({
  isLoading: state.movieSelection.isLoading,
});
export default connect(mapStateToProps, {
  setIsLoading,
})(Nomination);
