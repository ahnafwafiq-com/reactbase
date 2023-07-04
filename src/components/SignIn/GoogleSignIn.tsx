import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../Firebase-config";
import { BsGoogle } from "react-icons/bs";
import { useState } from "react";
import { produce } from "immer";
import ShowError from "../Error";
import Styles from "./SignIn.module.css";

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
        <>
            <div className={Styles.loginIcon} onClick={onClick}>
                <BsGoogle color="#4C4B16" size="36px"></BsGoogle>
            </div>
            {AuthError.error ? (
                <ShowError code={AuthError.code || ""}>
                    {AuthError.message}
                </ShowError>
            ) : null}
        </>
    );
}

export default GoogleSignIn;
