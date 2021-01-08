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
      <Link className="option" to="/instruction">
        INSTRUCTION
      </Link>
      <Link className="option" to="/nomination">
        NOMINATION
      </Link>
      <Link className="option" to="/dashboard">
        RESULTS
      </Link>
      {currentUser ? (
        <div class="dropdown">
          <button
            class="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {currentUser.displayName}
            <span class="caret"></span>
          </button>
          <ul class="dropdown-menu">
            <li>
              <Link className="option" to="/profile">
                PROFILE
              </Link>
            </li>
            <li>
              <Link
                className="option"
                onClick={() => {
                  auth.signOut();
                }}
                to="/"
              >
                SIGN OUT
              </Link>
            </li>
          </ul>
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
