import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../Firebase-config";
import { produce } from "immer";
import React, { useRef, useState } from "react";
import ShowError from "@components/Error";

function ResetPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    // Function for handeling click event
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    const OnClick = async (e: React.FormEvent) => {
        e.preventDefault();
        const auth = getAuth(app);
        if (emailRef.current?.value) {
            try {
                await sendPasswordResetEmail(auth, emailRef.current.value);
            } catch (e: any) {
                setAuthError(
                    produce((draft) => {
                        draft.error = true;
                        draft.code = e.code;
                        draft.message = e.message;
                    })
                );
            }
        }
    };
    return (
        <div>
            <input
                ref={emailRef}
                type="email"
                name="email"
                id="email"
                placeholder="Email Address:"
            />
            <button onClick={OnClick}>Reset Password</button>
            {AuthError.error ? (
                <ShowError
                    code={AuthError.code}
                    onClose={() =>
                        setAuthError({
                            error: false,
                            code: "",
                            message: "",
                        })
                    }
                >
                    {AuthError.message}
                </ShowError>
            ) : null}
        </div>
    );
}

export default ResetPassword;
