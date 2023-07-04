import GithubSignIn from "./GithubSignIn";
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn from "./GoogleSignIn";
import TwitterSignIn from "./TwitterSignIn";
// import ResetPassword from "./ResetPassword";
import EmailSignIn from "./EmailSignIn";
import EmailSignUp from "./EmailSignUp";
import Styles from "./SignIn.module.css";
import { useState } from "react";

function SignIn() {
    // 0 = Sign In
    // 1 = Sign Up
    const [window, setWindow] = useState(0);
    return (
        <div className={Styles.signInWindow}>
            {window ? <h2>Sign Up</h2> : <h2>Sign In</h2>}
            <button
                type="button"
                className={
                    window
                        ? [
                              Styles.tabButton,
                              Styles.tabButton0,
                              Styles.tabButtonActive,
                          ].join(" ")
                        : [
                              Styles.tabButton,
                              Styles.tabButton0,
                              Styles.tabButtonInactive,
                          ].join(" ")
                }
                onClick={() => setWindow(1)}
            >
                Sign Up
            </button>
            <button
                type="button"
                className={
                    window
                        ? [
                              Styles.tabButton,
                              Styles.tabButton1,
                              Styles.tabButtonInactive,
                          ].join(" ")
                        : [
                              Styles.tabButton,
                              Styles.tabButton1,
                              Styles.tabButtonActive,
                          ].join(" ")
                }
                onClick={() => setWindow(0)}
            >
                Sign In
            </button>
            {window ? (
                <EmailSignUp switchTab={() => setWindow(0)} />
            ) : (
                <EmailSignIn switchTab={() => setWindow(1)} />
            )}
            <div className={Styles.providerButtons}>
                <p>Or Sign in with: </p>
                <GoogleSignIn />
                <FacebookSignIn />
                <GithubSignIn />
                <TwitterSignIn />
            </div>
        </div>
    );
}

export default SignIn;
