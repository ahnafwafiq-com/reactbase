import "./App.css";
import GoogleSignIn from "./components/SignIn/GoogleSignIn";
import SignOut from "./components/SignOut";
import TodoItem from "./components/TodoItem";

// Firebase Configuration

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

// import { } from 'firebase/<service>';
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
export const app = initializeApp(firebaseConfig);
getAnalytics(app);

function App() {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    return (
        <>
            <div>{user ? <SignOut /> : <GoogleSignIn />}</div>
            <TodoItem>Hello Todo 6</TodoItem>
        </>
    );
}

export default App;
