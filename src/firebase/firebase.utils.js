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

  //   const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  //   try {
  //     await nominationsRef.update({
  //       nomination: {
  //         nominationList: movieList,
  //         total: movieList.length,
  //       },
  //     });
  //   } catch (error) {
  //     console.log("error updating nomination list", error.message);
  //   }
};

export const updataTotalList = async (movie, addOrDelete) => {
  //   const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  //   var list;
  //   nominationsRef.onSnapshot((snapShot) => {
  //     list = snapShot.data().nomination.nominationList;
  //     console.log(list);
  //   });
  //   if (addOrDelete === "add") {
  //     console.log(list);
  //     list.forEach(async (item) => {
  //       if (item.imdbID === movie.imdbID) {
  //         // const total = item.total + 1;
  //         // const newList = null;
  //         // try {
  //         //   await nominationsRef.update({
  //         //     nomination: {
  //         //       nominationList: newList,
  //         //     },
  //         //   });
  //         // } catch (error) {
  //         //   console.log("error updating nomination list", error.message);
  //         // }
  //       } else {
  //         const newList = list.push(movie);
  //         try {
  //           await nominationsRef.update({
  //             nomination: {
  //               nominationList: newList,
  //             },
  //           });
  //         } catch (error) {
  //           console.log("error updating nomination list", error.message);
  //         }
  //       }
  //     });
  //   } else {
  //   }
  //   //   const nominationsRef = firestore.doc("nominations/37RL9wPwbon9SWaqxaG6");
  //   //   if (addOrDelete === "add") {
  //   //     nominationsRef.onSnapshot((snapShot) => {
  //   //       const list = snapShot.data().nomination.nominationList;
  //   //       list.forEach(async (item) => {
  //   //         if (item.imdbID === movie.imdbID) {
  //   //           const total = item.total + 1;
  //   //           //   try {
  //   //           //     await nominationsRef.update({
  //   //           //       nomination: {
  //   //           //         nominationList: newList,
  //   //           //       },
  //   //           //     });
  //   //           //   } catch (error) {
  //   //           //     console.log("error updating nomination list", error.message);
  //   //           //   }
  //   //         } else {
  //   //           const newList = list.push(movie);
  //   //           try {
  //   //             await nominationsRef.update({
  //   //               nomination: {
  //   //                 nominationList: newList,
  //   //               },
  //   //             });
  //   //           } catch (error) {
  //   //             console.log("error updating nomination list", error.message);
  //   //           }
  //   //         }
  //   //       });
  //   //     });
  //   //   }
};

firebase.initializeApp(config);

export const auth = firebase.auth();
export const firestore = firebase.firestore();

export const googleProvider = new firebase.auth.GoogleAuthProvider();
googleProvider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(googleProvider);

export default firebase;
