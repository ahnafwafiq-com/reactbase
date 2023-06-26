import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { FormEvent, useRef } from "react";

function EmailSignUp() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const confirm_passwordRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    // Function to handle form submit
    function onSubmitClick(e: FormEvent) {
        e.preventDefault();
        const auth = getAuth();
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;
        const confirm_password = confirm_passwordRef.current?.value;
        if (email && password && password === confirm_password) {
            // Creating a new user using Firebase Auth
            const creatUserPromise = createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
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
        <form onSubmit={(e) => onSubmitClick(e)}>
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
        </form>
    );
}

export default EmailSignUp;
