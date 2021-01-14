import React from "react";
import { connect } from "react-redux";

import photo from "../../assets/profile.jpeg";
import "./profile.styles.scss";

function Profile({ currentUser }) {
  return (
    <div>
      {currentUser && (
        <div className="profile">
          <div className="column-left">
            <img src={photo} alt="Logo" />
            <h1>{currentUser.displayName}</h1>
            <h3>{currentUser.email}</h3>
          </div>
          <div className="column-right">
            {currentUser.nomination.nominatedList.map((movie) => (
              <div className="movie-info" key={movie.imdbID}>
                <div>{movie.title}</div>
                <div>{movie.year}</div>
              </div>
            ))}
          </div>
          <div className="contact">
            <hr />
            <div>If you want to change your nominations, please contact us</div>
            <ul>
              <p>Phone: (365)888-3730</p>
              <p>email: weikeshih@gmail.com</p>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default connect(mapStateToProps)(Profile);
