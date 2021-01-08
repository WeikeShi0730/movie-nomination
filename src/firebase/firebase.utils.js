import firebase from "firebase/app";
import "firebase/firestore";
import "firebase/auth";

const config = {
  apiKey: "AIzaSyCZr69KZRbXSWIAQVRECt-fjbS59yYxPDc",
  authDomain: "movie-nomination.firebaseapp.com",
  projectId: "movie-nomination",
  storageBucket: "movie-nomination.appspot.com",
  messagingSenderId: "1038883929331",
  appId: "1:1038883929331:web:d0bd0dbc7e9d390f87cb86",
  measurementId: "G-L20L6VY64V",
};

export const createUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;

  const userRef = firestore.doc(`users/${userAuth.uid}`);
  const userRefSnapShot = await userRef.get();
  if (!userRefSnapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    const nomination = {
      count: 5,
      nominationList: [],
    };
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        nomination,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const addNominationMovie = async (movieList, user) => {
  const userRef = firestore.doc(`users/${user.id}`);
  try {
    await userRef.update({
      nomination: {
        count: 5 - movieList.length,
        nominationList: movieList,
      },
    });
  } catch (error) {
    console.log("error updating nomination list", error.message);
  }
};

export const addMovieToTotalList = async (movie) => {
  const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  const snapShot = await nominationsRef.get();
  var list = snapShot.data().nomination.nominationList;
  const total = snapShot.data().nomination.total;
  if (list !== null) {
    const index = list.findIndex((item) => item.imdbID === movie.imdbID);
    if (index !== -1) {
      list[index].total++;
    } else {
      list.push(movie);
    }
  } else {
    list = [];
    list.push(movie);
  }

  try {
    const newList = [...list];
    await nominationsRef.update({
      nomination: {
        nominationList: newList,
        total: total + 1,
      },
    });
  } catch (error) {
    console.log("error updating nomination list", error.message);
  }
};

export const removeMoiveFromTotalList = async (movie) => {
  const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  const snapShot = await nominationsRef.get();
  var list = await snapShot.data().nomination.nominationList;
  const total = await snapShot.data().nomination.total;
  const index = list.findIndex((item) => item.imdbID === movie.imdbID);
  if (index !== -1) {
    list[index].total--;
    if (list[index].total === 0) {
      list.splice(index, 1);
    }
  } else {
    console.log("cannot find the movie");
  }

  try {
    const newList = [...list];
    await nominationsRef.update({
      nomination: {
        nominationList: newList,
        total: total - 1,
      },
    });
  } catch (error) {
    console.log("error updating nomination list", error.message);
  }
};

export const getNominationData = async () => {
  const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  const snapShot = await nominationsRef.get();
  const list = await snapShot.data().nomination.nominationList;
  const total = await snapShot.data().nomination.total;
  const sortedList = list
    .sort((a, b) => {
      return b.total - a.total;
    })
    .slice(0, 6);

  return { total: total, list: sortedList };
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
