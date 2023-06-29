import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import app from "firebase-config";
import React, { useRef, useState } from "react";
import { produce } from "immer";
import Error from "@components/Error";

function EmailSignIn() {
    // Creating useRef hooks for input elements
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    // Function for handeling click event
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    async function OnClick(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) {
        e.preventDefault();
        const auth = getAuth(app);
        const email = emailRef.current?.value;
        const password = passwordRef.current?.value;

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
            <input ref={emailRef} type="email" name="email" id="email" />
            <input
                ref={passwordRef}
                type="password"
                name="password"
                id="password"
            />
            <button id="submit-btn" onClick={OnClick}>
                Sign In
            </button>
            {AuthError.error ? (
                <Error code={AuthError.code || ""}>{AuthError.message}</Error>
            ) : null}
        </div>
    );
}

export default EmailSignIn;
