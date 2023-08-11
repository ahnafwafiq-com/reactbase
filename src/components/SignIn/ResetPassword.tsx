import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import app from "../../Firebase-config";
import { produce } from "immer";
import { useRef, useState, FormEvent } from "react";
import Styles from "./SignIn.module.css";
import ShowError from "../Error";

function ResetPassword() {
    const emailRef = useRef<HTMLInputElement>(null);
    // Function for handeling click event
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
    });
    const OnSubmit = async (e: FormEvent) => {
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
                    }),
                );
            }
        }
    };
    return (
        <div>
            <form onSubmit={OnSubmit} className={Styles.form}>
                <input
                    ref={emailRef}
                    type="email"
                    name="email"
                    id="email"
                    required
                    placeholder="Email Address:"
                />
                <button type="reset" className={Styles.resetButton}>
                    Clear
                </button>
                <button type="submit" className={Styles.submitButton}>
                    Reset Password
                </button>
            </form>
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
