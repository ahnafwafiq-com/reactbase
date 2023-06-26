import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./../../Firebase-config";
import { BsGithub } from "react-icons/bs";
// import React from 'react'

function GithubSignIn() {
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new GithubAuthProvider();
        signInWithPopup(auth, provider);
    };
    return (
        <div>
            <BsGithub onClick={onClick} color="4C4B16" size="36px"></BsGithub>
        </div>
    );
}

export default GithubSignIn;
