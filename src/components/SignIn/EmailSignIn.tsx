import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "../../Firebase-config";
import { useRef, useState, FormEvent } from "react";
import { produce } from "immer";
import Error from "../Error";
import Styles from "./SignIn.module.css";

interface Props {
    switchTab: () => void;
}

function EmailSignIn({ switchTab }: Props) {
    // Creating useRef hooks for input elements
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);
    // Function for handeling click event
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    async function onSubmit(e: FormEvent) {
        e.preventDefault();
        const auth = getAuth(app);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

        if (!email) {
            if (errorRef.current) {
                errorRef.current.innerText =
                    "Please provide a valid Email address";
            }
            return;
        }
        if (!password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Please provide a password";
            }
            return;
        }

        if (email && password) {
            try {
                await signInWithEmailAndPassword(auth, email, password);
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
    }
    return (
        <div>
            <form className={Styles.form} onSubmit={onSubmit}>
                <input
                    className={Styles.input}
                    ref={emailRef}
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Email"
                />
                <input
                    className={Styles.input}
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
                <button type="button" className={Styles.forgotButton}>
                    Forgot Password?
                </button>
                <button type="submit" className={Styles.submitButton}>
                    Sign In
                </button>
                <p className={Styles.optionText}>
                    Don't have an account?{" "}
                    <span onClick={switchTab}>Sign Up</span> instead!
                </p>
            </form>
            {AuthError.error ? (
                <Error code={AuthError.code || ""}>{AuthError.message}</Error>
            ) : null}
        </div>
    );
}

export default EmailSignIn;
