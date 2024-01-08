import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getFirestore} from "firebase/firestore"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAfOpN97eK960WE_1d2ohO99aa654xxRmk",
  authDomain: "bookingsystem-7eb19.firebaseapp.com",
  projectId: "bookingsystem-7eb19",
  storageBucket: "bookingsystem-7eb19.appspot.com",
  messagingSenderId: "867293411609",
  appId: "1:867293411609:web:7e6fa558fe6cd377b1ad88",
  measurementId: "G-QGTTNZ3Q1B"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);
export const db= getFirestore(app);
