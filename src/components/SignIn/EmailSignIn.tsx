/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase-config";
import { useRef, FormEvent } from "react";
import Styles from "./SignIn.module.css";
import { produce } from "immer";

interface Props {
    switchTab: (num: number) => void;
    startLoading: () => void;
    stopLoading: () => void;
    setAuthError: React.Dispatch<
        React.SetStateAction<{
            error: boolean;
            code: string;
            message: string;
            unchangedMessage: string;
        }>
    >;
}

function EmailSignIn({
    switchTab,
    startLoading,
    stopLoading,
    setAuthError,
}: Props) {
    // Creating useRef hooks for input elements
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    // Function for handeling click event

    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        startLoading();
        const auth = getAuth(app);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email) {
            if (errorRef.current) {
                errorRef.current.innerText =
                    "Please provide a valid Email address";
            }
            stopLoading();
            return;
        }
        if (!password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Please provide a password";
            }
            stopLoading();
            return;
        }

        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
                stopLoading();
            } catch (e: any) {
                stopLoading();
                setAuthError(
                    produce((draft) => {
                        (draft.error = true),
                            (draft.message = e.message),
                            (draft.code = e.code);
                    }),
                );
            }
        }
        stopLoading();
    }
    return (
        <div>
            <form className={Styles.form} onSubmit={onSubmit}>
                <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <input
                    ref={passwordRef}
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                />
                <div className={Styles.errorText} ref={errorRef}></div>
                <button type="reset" className={Styles.resetButton}>
                    Clear
                </button>
                <button
                    type="button"
                    className={Styles.forgotButton}
                    onClick={() => switchTab(2)}
                >
                    Forgot Password?
                </button>
                <button type="submit" className={Styles.submitButton}>
                    Sign In
                </button>
                <p className={Styles.optionText}>
                    Don't have an account?{" "}
                    <span onClick={() => switchTab(0)}>Sign Up</span> instead!
                </p>
            </form>
        </div>
    );
}

export default EmailSignIn;
