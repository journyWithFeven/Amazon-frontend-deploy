import firebase from "firebase/compat/app";
import "firebase/compat/firestore";
import "firebase/compat/auth";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAbA4DKFWgp6VCS0kiNoFUUw1uU8orE8BI",
  authDomain: "clone-33de3.firebaseapp.com",
  projectId: "clone-33de3",
  storageBucket: "clone-33de3.appspot.com",
  messagingSenderId: "106101287794",
  appId: "1:106101287794:web:a0886817d95a31a0724beb",
};

// Initialize Firebase
const app = firebase.initializeApp(firebaseConfig);

// Get a Firestore instance
const db = app.firestore();

// Get an Auth instance
const auth = getAuth(app);

export { auth, db };
