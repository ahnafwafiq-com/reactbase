import GithubSignIn from "./GithubSignIn";
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn from "./GoogleSignIn";
import TwitterSignIn from "./TwitterSignIn";
import ResetPassword from "./ResetPassword";
import EmailSignIn from "./EmailSignIn";
import EmailSignUp from "./EmailSignUp";
import Styles from "./SignIn.module.css";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";

interface Props {
    isOpen: boolean;
    window: 0 | 1 | 2;
    close: () => void;
}

function SignIn({ isOpen, close, window }: Props) {
    useEffect(() => {
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                close();
            }
        });
    }, [isOpen, close]);
    // 0 = Sign Up
    // 1 = Sign In
    // 2 = Reset Password
    const [Window, setWindow] = useState<number>(window);
    return (
        <dialog open={isOpen} className={Styles.signInModal}>
            <div className={Styles.closebutton} onClick={() => close()}>
                <CgClose size="20px"></CgClose>
            </div>
            {Window ? <h2>Sign In</h2> : <h2>Sign Up</h2>}
            <button
                type="button"
                className={[
                    Styles.signUpTab,
                    Window ? undefined : Styles.activeTab,
                ].join(" ")}
                onClick={() => setWindow(0)}
            >
                Sign Up
            </button>
            <button
                type="button"
                className={[
                    Styles.signInTab,
                    Window ? Styles.activeTab : undefined,
                ].join(" ")}
                onClick={() => setWindow(1)}
            >
                Sign In
            </button>
            {Window ? (
                Window === 1 ? (
                    <EmailSignIn switchTab={(num) => setWindow(num)} />
                ) : (
                    <ResetPassword />
                )
            ) : (
                <EmailSignUp switchTab={() => setWindow(1)} />
            )}
            <div className={Styles.providerContainer}>
                <div className={Styles.providerButtons}>
                    <p>Or Sign in with: </p>
                    <GoogleSignIn />
                    <FacebookSignIn />
                    <GithubSignIn />
                    <TwitterSignIn />
                </div>
            </div>
        </dialog>
    );
}

export default SignIn;
