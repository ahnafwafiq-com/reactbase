import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useRef, useState } from "react";
import app from "../../Firebase-config";
import ShowError from "../Error";
import { produce } from "immer";
import Styles from "./SignIn.module.css";
import PasswordValidator from "password-validator";

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
        if (!errorRef.current) return;
        // Checking if a email was provided
        if (!email) {
            errorRef.current.innerText = "Please provide a valid Email address";
            return;
        }
        //Checking if password confirmation was provided
        if (!confirm_password) {
            errorRef.current.innerText = "Please re-enter the password";

            return;
        }

        if (password !== confirm_password) {
            errorRef.current.innerText = "Passwords do not match";
            return;
        }

        // Checking if a password was provided
        if (validatePassword()) {
            return;
        }

        // Doing the final job of signing up a user.
        if (
            email &&
            password &&
            password === confirm_password &&
            validatePassword()
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
                    }),
                );
            }
        }
    }

    // Function to check if passwords match
    function validatePassword(): boolean {
        const schema = new PasswordValidator();
        schema
            .is()
            .min(8, "Password must have atleast 8 characters") // Minimum length 8
            .is()
            .max(100, "Password can't have more than 100 characters") // Maximum length 100
            .has()
            .uppercase(1, "Password must contain uppercase letters") // Must have uppercase letters
            .has()
            .lowercase(1, "Password must contain lowercase letters") // Must have lowercase letters
            .has()
            .digits(2, "Password must have atleast 2 numbers") // Must have at least 2 digits
            .has()
            .not()
            .spaces(0, "Password must not contain spaces"); // Should not have spaces
        const password = passwordRef.current?.value;
        if (!password) return false;
        const validation = schema.validate(password, { details: true });
        if (Array.isArray(validation) && validation.length !== 0) {
            if (errorRef.current) {
                errorRef.current.innerText = validation[0].message;
            }
            return false;
        } else {
            if (errorRef.current) {
                errorRef.current.innerText = "";
                return true;
            }
        }
        return false;
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
