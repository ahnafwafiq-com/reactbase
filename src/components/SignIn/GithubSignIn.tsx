import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from "firebase-config";
import { BsGithub } from "react-icons/bs";
import { useState } from "react";
import { produce } from "immer";
import ShowError from "@components/Error";

function GithubSignIn() {
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    const onClick = () => {
        const auth = getAuth(app);
        const provider = new GithubAuthProvider();
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
            <BsGithub color="4C4B16" size="36px"></BsGithub>
            {AuthError.error ? (
                <ShowError code={AuthError.code || ""}>
                    {AuthError.message}
                </ShowError>
            ) : null}
        </div>
    );
}

export default GithubSignIn;
