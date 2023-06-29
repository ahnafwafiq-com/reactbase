import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useRef, useState } from "react";
import app from "firebase-config";
import ShowError from "@components/Error";
import { produce } from "immer";

function EmailSignUp() {
    // Using the useRef hooks for input fields
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirm_passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });

    // Function to handle form submit
    function onSubmitClick(e: FormEvent) {
        e.preventDefault();
        const auth = getAuth(app);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirm_password = confirm_passwordRef.current?.value;
        if (email && password && password === confirm_password) {
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
    function confirmPassword() {
        const password = passwordRef.current?.value;
        const confirm_password = confirm_passwordRef.current?.value;
        if (password !== confirm_password) {
            if (errorRef.current) {
                errorRef.current.innerText = "Passwords do not match";
            }
        }
    }
    return (
        <form onSubmit={onSubmitClick}>
            <input
                ref={emailRef}
                type="email"
                name="email"
                placeholder="Email"
            />
            <input
                ref={passwordRef}
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
            <div className="err" ref={errorRef}></div>
            <button>Sign Up</button>
            {AuthError.error ? (
                <ShowError code={AuthError.code || ""}>
                    {AuthError.message}
                </ShowError>
            ) : null}
        </form>
    );
}

export default EmailSignUp;
