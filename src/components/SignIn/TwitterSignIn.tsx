import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import app from "firebase-config";
import { BsTwitter } from "react-icons/bs";
import { produce } from "immer";
import { useState } from "react";
import ShowError from "@components/Error";

function TwitterSignIn() {
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new TwitterAuthProvider();
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
            <BsTwitter color="#4C4B16" size="36px"></BsTwitter>
            {AuthError.error ? (
                <ShowError code={AuthError.code || ""}>
                    {AuthError.message}
                </ShowError>
            ) : null}
        </div>
    );
}

export default TwitterSignIn;
