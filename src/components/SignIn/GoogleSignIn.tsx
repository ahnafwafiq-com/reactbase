import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "firebase-config";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import { produce } from "immer";
import ShowError from "@components/Error";

function GoogleSignIn() {
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    async function onClick() {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
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
    }
    return (
        <div onClick={onClick}>
            <BsGoogle color="#4C4B16" size="36px"></BsGoogle>
            {AuthError.error ? (
                <ShowError code={AuthError.code || ""}>
                    {AuthError.message}
                </ShowError>
            ) : null}
        </div>
    );
}

export default GoogleSignIn;
