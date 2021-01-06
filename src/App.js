import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route, Redirect } from "react-router-dom";
import { connect } from "react-redux";

import { setCurrentUser } from "./redux/actions/user.action";

import Header from "./components/header/header.component";
import Homepage from "./page/homepage/homepage.component";
import SignInAndSignUpPage from "./page/sign-in-sign-up/sign-in-sign-up.component";
import { auth, createUserProfileDocument } from "./firebase/firebase.utils";

import "./App.css";

function App({ currentUser, setCurrentUser }) {
  useEffect(() => {
    auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userRef = await createUserProfileDocument(user);
        userRef.onSnapshot((snapShot) => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data(),
          });
        });
      } else {
        setCurrentUser(null);
      }
    });
  }, [setCurrentUser]);

  return (
    <div className="App">
      <BrowserRouter>
        <Header />
        <Switch>
          <Route exact path="/" component={Homepage} />
          <Route exact path="/signin" component={SignInAndSignUpPage} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

const mapStateToProps = (state) => ({
  currentUser: state.user.setCurrentUser,
});

export default connect(mapStateToProps, { setCurrentUser })(App);
