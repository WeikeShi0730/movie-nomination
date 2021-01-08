import React from "react";
import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = ({ currentUser, history }) => (
  <div className="header">
    <div className="options">
      <Link className="option" to="/">
        HOME
      </Link>
      {currentUser ? (
        <Link
          className="option"
          onClick={() => {
            auth.signOut();
          }}
          to="/"
        >
          SIGN OUT
        </Link>
      ) : (
        <Link className="option" to="/signin">
          SIGN IN
        </Link>
      )}
      <Link className="option" to="/dashboard">
        DASHBOARD
      </Link>
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default compose(withRouter, connect(mapStateToProps))(Header);
