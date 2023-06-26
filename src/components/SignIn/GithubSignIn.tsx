import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./../../Firebase-config";
// import React from 'react'

function GithubSignIn() {
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider);
    }
  return (
    <button onClick={onClick}>Sign in With Github</button>
  )
}

export default GithubSignIn