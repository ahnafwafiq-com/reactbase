import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase-config";
import { BsTwitter } from "react-icons/bs";
import { produce } from "immer";
import { useState } from "react";
import ShowError from "../Error";
import Styles from "./SignIn.module.css";

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
                }),
            );
        }
    };
    return (
        <div className={Styles.loginIcon} onClick={onClick}>
            <BsTwitter color="#4C4B16" size="32px"></BsTwitter>
            {AuthError.error ? (
                <ShowError
                    code={AuthError.code}
                    onClose={() =>
                        setAuthError({ error: false, code: "", message: "" })
                    }
                >
                    {AuthError.message}
                </ShowError>
            ) : null}
        </div>
    );
}

export default TwitterSignIn;
