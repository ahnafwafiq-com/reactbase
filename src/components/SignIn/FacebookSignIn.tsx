import app from "../../Firebase-config";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { BsFacebook } from "react-icons/bs";
import { useState } from "react";
import ShowError from "../Error";
import { produce } from "immer";
import Styles from "./SignIn.module.css";

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
                }),
            );
        }
    };
    return (
        <>
            <div className={Styles.loginIcon} onClick={onClick}>
                <BsFacebook color="#4C4B16" size="32px"></BsFacebook>
            </div>
            {AuthError.error ? (
                <ShowError
                    code={AuthError.code || ""}
                    onClose={() =>
                        setAuthError({ error: false, code: "", message: "" })
                    }
                >
                    {AuthError.message}
                </ShowError>
            ) : null}
        </>
    );
}

export default FacebookSignIn;
