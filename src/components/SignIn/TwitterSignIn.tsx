import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import app from "./../../Firebase-config";
import { BsTwitter } from "react-icons/bs";

// import React from "react";

function TwitterSignIn() {
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new TwitterAuthProvider();
        signInWithPopup(auth, provider);
    };
    return (
        <div>
            <BsTwitter
                onClick={onClick}
                color="#4C4B16"
                size="36px"
            ></BsTwitter>
        </div>
    );
}

export default TwitterSignIn;
