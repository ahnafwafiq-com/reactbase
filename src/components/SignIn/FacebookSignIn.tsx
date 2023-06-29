import app from "firebase-config";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";
import ShowError from "@components/Error";
import { produce } from "immer";

// import React from 'react'

function FacebookSignIn() {
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
        try {
            signInWithPopup(auth, provider);
        } catch (e: any) {
            const code = e.code;
            const msg = e.message;
            setAuthError(
                produce((draft) => {
                    draft.error = true;
                    draft.code = code;
                    draft.message = msg;
                })
            );
        }
    };
    return (
        <div onClick={onClick}>
            <BsFacebook color="#4C4B16" size="36px"></BsFacebook>
            {AuthError.error ? (
                <ShowError code={AuthError.code || ""}>
                    {AuthError.message}
                </ShowError>
            ) : null}
        </div>
    );
}

export default FacebookSignIn;
