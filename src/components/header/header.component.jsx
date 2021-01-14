import React from "react";

import { Link, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { auth } from "../../firebase/firebase.utils";

import "./header.styles.scss";

const Header = ({ currentUser }) => (
  <div className="header">
    <div className="options">
      <div className="navbar" id="topnav">
        {/*
        Add Link to the nav bar header
       */}
        <Link className="option" to="/nomination">
          NOMINATION
        </Link>
        <Link className="option" to="/instruction">
          INSTRUCTION
        </Link>
        <Link className="option" to="/dashboard">
          RESULTS
        </Link>
        {/*
        If currentUser is not null (signed in), display profile and sign out
       */}
        {currentUser ? (
          <div className="dropdown">
            <button className="dropbtn">
              {currentUser.displayName} <i className="fa fa-caret-down"></i>
            </button>
            <div className="dropdown-content">
              <Link className="option" to="/profile">
                PROFILE
              </Link>
              <Link
                className="option"
                onClick={() => {
                  auth.signOut();
                }}
                to="/"
              >
                SIGN OUT
              </Link>
            </div>
          </div>
        ) : (
          <Link className="option" to="/signin">
            SIGN IN
          </Link>
        )}
      </div>
    </div>
  </div>
);

/*
Get currentUser state
 */
const mapStateToProps = (state) => ({
  currentUser: state.user.currentUser,
});

export default compose(withRouter, connect(mapStateToProps))(Header);
