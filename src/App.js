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
import NominationPage from "./page/nomination-page/nomination-page.component";
import SignInAndSignUpPage from "./page/sign-in-sign-up/sign-in-sign-up.component";
import Dashboard from "./page/dashboard/dashboard.component";
import Instruction from "./page/instruction/instruction.component";
import Profile from "./page/profile/profile.component";

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
          if (snapShot.data().nomination.nominatedList.length > 0) {
            setNominated(snapShot.data().nomination.nominatedList);
            setCount(snapShot.data().nomination.count);
          }
        });
      } else {
        setNominated([]);
        setCount(5);
        setSearchField("");
        setCurrentUser(user);
      }
      history.push("/");
    });

    return () => {
      setNominated([]);
      setCount(5);
      setSearchField("");
      setCurrentUser(null);
    };
  }, [setCurrentUser, setNominated, setCount, setSearchField, history]);

  return (
    <div className="App">
      <Header />
      <Switch>
        <Route exact path="/" component={NominationPage} />
        <Route exact path="/nomination" component={NominationPage} />
        <Route exact path="/signin" component={SignInAndSignUpPage} />
        <Route exact path="/dashboard" component={Dashboard} />
        <Route exavt path="/profile" component={Profile} />
        <Route exact path="/instruction" component={Instruction} />
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
