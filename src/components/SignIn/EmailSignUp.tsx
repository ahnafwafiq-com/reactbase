/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAuth,
    createUserWithEmailAndPassword,
    sendEmailVerification,
} from "firebase/auth";
import { FormEvent, useRef } from "react";
// import app from "../../Firebase-config";
import { produce } from "immer";
import Styles from "./SignIn.module.css";
import validatePassword from "./validation";
interface Props {
    switchTab: () => void;
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

function EmailSignUp({
    switchTab,
    startLoading,
    stopLoading,
    setAuthError,
}: Props) {
    // Using the useRef hooks for input fields
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirm_passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    // Function to handle form submit
    async function handleSubmit(e: FormEvent) {
        e.preventDefault();
        startLoading();
        // Getting the Auth object
        let auth = getAuth();

        //Getting the values from the input fields
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirm_password = confirm_passwordRef.current?.value;
        if (!errorRef.current) return;
        // Checking if a email was provided
        if (!email) {
            errorRef.current.innerText = "Please provide a valid Email address";
            stopLoading();
            return;
        }
        //Checking if password confirmation was provided
        if (!confirm_password) {
            errorRef.current.innerText = "Please re-enter the password";
            stopLoading();
            return;
        }

        if (password !== confirm_password) {
            errorRef.current.innerText = "Passwords do not match";
            stopLoading();
            return;
        }

        // Checking if a password was provided
        if (validatePassword(password).error) {
            stopLoading();
            errorRef.current.innerText = validatePassword(password).message;
            return;
        }

        // Doing the final job of signing up a user.
        if (
            email &&
            password &&
            password === confirm_password
            // validatePassword()
        ) {
            // Creating a new user using Firebase Auth
            try {
                await createUserWithEmailAndPassword(auth, email, password);
                auth = getAuth();
                if (auth.currentUser) {
                    sendEmailVerification(auth.currentUser);
                }
                stopLoading();
            } catch (e: any) {
                stopLoading();
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
        }
        stopLoading();
    }

    // Function to check if passwords match

    function confirmPassword() {
        const password = passwordRef.current?.value;
        const confirm_password = confirm_passwordRef.current?.value;
        if (password === confirm_password) {
            if (errorRef.current) {
                errorRef.current.innerText = "";
            }
        } else if (password !== confirm_password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Passwords do not match";
            }
        }
    }
    return (
        <div>
            <form className={Styles.form} onSubmit={handleSubmit}>
                <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    ref={passwordRef}
                    onChange={(e) => {
                        const validation = validatePassword(e.target.value);
                        if (validation.error && errorRef.current) {
                            errorRef.current.innerText = validation.message;
                            return;
                        } else {
                            if (errorRef.current) {
                                errorRef.current.innerText = "";
                            }
                        }
                    }}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <input
                    ref={confirm_passwordRef}
                    type="password"
                    name="confirm_password"
                    onChange={confirmPassword}
                    placeholder="Confirm Password"
                />
                <div className={Styles.errorText} ref={errorRef}></div>
                <button type="reset" className={Styles.resetButton}>
                    Clear
                </button>
                <button className={Styles.submitButton} type="submit">
                    Sign Up
                </button>
                <p className={Styles.optionText}>
                    Already have an account?{" "}
                    <span onClick={switchTab}>Sign In</span> instead!
                </p>
            </form>
        </div>
    );
}

export default EmailSignUp;
