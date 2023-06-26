// Firebase Configuration
import { initializeApp } from "firebase/app";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyABqTDSmwk5mSnrAaNhECPVgSmMY__otuo",
    authDomain: "aw-firebase-react.firebaseapp.com",
    databaseURL: "https://aw-firebase-react-default-rtdb.firebaseio.com",
    projectId: "aw-firebase-react",
    storageBucket: "aw-firebase-react.appspot.com",
    messagingSenderId: "153560891735",
    appId: "1:153560891735:web:620c71f67c75928478fe12",
    measurementId: "G-CVK1JSKSZT",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default app;
