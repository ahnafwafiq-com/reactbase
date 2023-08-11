import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useRef, useState } from "react";
import app from "../../Firebase-config";
import ShowError from "../Error";
import { produce } from "immer";
import Styles from "./SignIn.module.css";

interface Props {
    switchTab: () => void;
}

function EmailSignUp({ switchTab }: Props) {
    // Using the useRef hooks for input fields
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirm_passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    // Defining the State error object
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });

    // Function to handle form submit
    function onSubmitClick(e: FormEvent) {
        e.preventDefault();
        // Getting the Auth object
        const auth = getAuth(app);

        //Getting the values from the input fields
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirm_password = confirm_passwordRef.current?.value;

        // Checking if a email was provided
        if (!email) {
            if (errorRef.current) {
                errorRef.current.innerText =
                    "Please provide a valid Email address";
            }
            return;
        }

        // Checking if a password was provided
        if (!password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Please provide a password";
            }
            return;
        }

        //Checking if password confirmation was provided
        if (!confirm_password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Please re-enter the password";
            }
            return;
        }

        // Checking if the password is longer than 8 characters
        if (password && password.length < 8) {
            if (errorRef.current) {
                errorRef.current.innerText =
                    "Password must be longer than 8 characters";
                return;
            }
        }

        // Checking if password and password confirmation match
        if (password !== confirm_password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Passwords do not match";
            }
            return;
        }

        // Doing the final job of signing up a user.
        if (
            email &&
            password &&
            password === confirm_password &&
            password.length >= 8
        ) {
            // Creating a new user using Firebase Auth
            try {
                createUserWithEmailAndPassword(auth, email, password);
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

    // Function to check if passwords match
    function validatePassword() {
        const password = passwordRef.current?.value;
        if (password && password.length < 8) {
            if (errorRef.current) {
                errorRef.current.innerText =
                    "Password must be longer than 8 characters";
            }
        } else if (password && password.length >= 8) {
            if (errorRef.current) {
                errorRef.current.innerText = "";
            }
        }
    }
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
            <form className={Styles.form} onSubmit={onSubmitClick}>
                <input
                    className={Styles.input}
                    ref={emailRef}
                    type="email"
                    name="email"
                    placeholder="Email"
                />
                <input
                    className={Styles.input}
                    ref={passwordRef}
                    onChange={validatePassword}
                    type="password"
                    name="password"
                    placeholder="Password"
                />
                <input
                    className={Styles.input}
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
        </div>
    );
}

export default EmailSignUp;
