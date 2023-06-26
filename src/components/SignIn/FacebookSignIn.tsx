import app from "./../../Firebase-config";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";

// import React from 'react'

function FacebookSignIn() {
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    };
    return <button onClick={onClick}>Sign In With Facebook</button>;
}

export default FacebookSignIn;
