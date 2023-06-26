import app from "./../../Firebase-config";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { BsFacebook } from "react-icons/bs";

// import React from 'react'

function FacebookSignIn() {
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
        signInWithPopup(auth, provider);
    };
    return (
        <div>
            <BsFacebook
                color="#4C4B16"
                size="36px"
                onClick={onClick}
            ></BsFacebook>
        </div>
    );
}

export default FacebookSignIn;
