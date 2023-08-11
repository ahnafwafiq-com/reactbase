import GithubSignIn from "./GithubSignIn";
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn from "./GoogleSignIn";
import TwitterSignIn from "./TwitterSignIn";
// import ResetPassword from "./ResetPassword";
import EmailSignIn from "./EmailSignIn";
import EmailSignUp from "./EmailSignUp";
import Styles from "./SignIn.module.css";
import { useState, useRef } from "react";
import { CgClose } from "react-icons/cg";

function SignIn() {
    const dialogRef = useRef<HTMLDialogElement>(null);
    // 0 = Sign In
    // 1 = Sign Up
    const [isSignUp, setWindow] = useState<boolean>(false);
    return (
        <dialog open className={Styles.signInModal}>
            <div
                className={Styles.closebutton}
                onClick={() => dialogRef.current?.close()}
            >
                <CgClose size="20px"></CgClose>
            </div>
            {isSignUp ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            <button
                type="button"
                className={Styles.signUpButton}
                onClick={() => setWindow(true)}
            >
                Sign Up
            </button>
            <button
                type="button"
                className={Styles.signInButton}
                onClick={() => setWindow(false)}
            >
                Sign In
            </button>
            {isSignUp ? (
                <EmailSignUp switchTab={() => setWindow(false)} />
            ) : (
                <EmailSignIn switchTab={() => setWindow(true)} />
            )}
            <div className={Styles.providerButtons}>
                <p>Or Sign in with: </p>
                <GoogleSignIn />
                <FacebookSignIn />
                <GithubSignIn />
                <TwitterSignIn />
            </div>
        </dialog>
    );
}

export default SignIn;
