import React, { useEffect } from "react";
import { Switch, Route, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import { compose } from "redux";

import { setCurrentUser } from "./redux/actions/user.action";
import {
  setCount,
  setNominated,
  setSearchField,
} from "./redux/actions/movieSelection.action";

import Header from "./components/header/header.component";
import Homepage from "./page/homepage/homepage.component";
import SignInAndSignUpPage from "./page/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

function App({
  currentUser,
  setCurrentUser,
  setNominated,
  setCount,
  setSearchField,
  history,
}) {
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
          setNominated(snapShot.data().nomination.nominationList);
          setCount(snapShot.data().nomination.count);
        });
      } else {
        setNominated([]);
        setCount(5);
        setSearchField("");
        setCurrentUser(user);
      }
      history.push("/");
    });
  }, [setCurrentUser, setNominated, setCount, setSearchField]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={Homepage} />
        <Route exact path="/signin" component={SignInAndSignUpPage} />
      </Switch>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.setCurrentUser,
});

export default compose(
  withRouter,
  connect(mapStateToProps, {
    setCurrentUser,
    setNominated,
    setCount,
    setSearchField,
  })
)(App);
