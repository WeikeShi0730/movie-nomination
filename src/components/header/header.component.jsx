import React from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = ({ currentUser, history }) => (
  <div className="header">
    <div className="options">
      <button className="btn btn-primary" type="button">
        <Link className="option" to="/">
          HOME
        </Link>
      </button>
      <button className="btn btn-primary" type="button">
        <Link className="option" to="/instruction">
          INSTRUCTION
        </Link>
      </button>
      <button className="btn btn-primary" type="button">
        <Link className="option" to="/nomination">
          NOMINATION
        </Link>
      </button>
      <button className="btn btn-primary" type="button">
        <Link className="option" to="/dashboard">
          RESULTS
        </Link>
      </button>
      {currentUser ? (
        <div className="dropdown">
          <button
            className="btn btn-primary dropdown-toggle"
            type="button"
            data-toggle="dropdown"
          >
            {currentUser.displayName}
            <span className="caret"></span>
          </button>
          <ul className="dropdown-menu">
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
        <button className="btn btn-primary" type="button">
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        </button>
      )}
    </div>
  </div>
);

const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default compose(withRouter, connect(mapStateToProps))(Header);
