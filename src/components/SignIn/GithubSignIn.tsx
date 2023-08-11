import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase-config";
import { BsGithub } from "react-icons/bs";
import { useState } from "react";
import ShowError from "../Error";
import Styles from "./SignIn.module.css";

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
            setAuthError({
                error: true,
                code: code,
                message: msg,
            });
        }
    };
    return (
        <>
            <div className={Styles.loginIcon} onClick={onClick}>
                <BsGithub color="4C4B16" size="32px"></BsGithub>
            </div>
            {AuthError.error ? (
                <ShowError
                    onClose={() =>
                        setAuthError({ error: false, code: "", message: "" })
                    }
                    code={AuthError.code}
                >
                    {AuthError.message}
                </ShowError>
            ) : null}
        </>
    );
}

export default GithubSignIn;
