import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = ({ currentUser, history }) => (
  <div className="header">
    <div className="options">
      {currentUser ? (
        <div
          className="option"
          onClick={() => {
            auth.signOut();
            history.push("/");
          }}
        >
          SIGN OUT
        </div>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default compose(withRouter, connect(mapStateToProps))(Header);
