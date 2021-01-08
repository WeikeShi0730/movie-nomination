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
    const submitted = false;
    const nomination = {
      count: 5,
      nominatedList: [],
    };
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        nomination,
        submitted,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  }
  return userRef;
};

export const updateSubmitted = async (nomination, user) => {
  const userRef = firestore.doc(`users/${user.id}`);
  try {
    await userRef.set({
      ...user,
      nomination,
      submitted: true,
    });
  } catch (error) {
    console.log("error creating user", error.message);
  }
};

export const addUserNominationMovie = async (movieList, user) => {
  const userRef = firestore.doc(`users/${user.id}`);
  try {
    await userRef.update({
      nomination: {
        count: 5 - movieList.length,
        nominatedList: movieList,
      },
    });
  } catch (error) {
    console.log("error updating nomination list", error.message);
  }

  const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  const nominationsSnapShot = await nominationsRef.get();
  const total = nominationsSnapShot.data().nomination.total;
  var oldList = nominationsSnapShot.data().nomination.nominatedList;
  movieList.forEach(async (movie) => {
    if (oldList !== null) {
      const index = oldList.findIndex((item) => item.imdbID === movie.imdbID);
      if (index !== -1) {
        oldList[index].total++;
      } else {
        oldList.push(movie);
      }
    } else {
      oldList = [];
      oldList.push(movie);
    }
  });
  try {
    const newList = [...oldList];
    await nominationsRef.update({
      nomination: {
        nominatedList: newList,
        total: total + movieList.length,
      },
    });
  } catch (error) {
    console.log("error updating nomination list", error.message);
  }
};

export const getNominationData = async () => {
  const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  const snapShot = await nominationsRef.get();
  const list = await snapShot.data().nomination.nominatedList;
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
