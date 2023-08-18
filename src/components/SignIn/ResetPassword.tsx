/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAuth,
    sendPasswordResetEmail,
    confirmPasswordReset,
    verifyPasswordResetCode,
} from "firebase/auth";
import validatePassword from "./validation";
import app from "../../Firebase-config";
import { produce } from "immer";
import { useRef, FormEvent } from "react";
import Styles from "./SignIn.module.css";

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

function ResetPassword({
    switchTab,
    startLoading,
    stopLoading,
    setAuthError,
}: Props) {
    const params = new URLSearchParams(window.location.search);
    const emailRef = useRef<HTMLInputElement>(null);
    const errorRef = useRef<HTMLDivElement>(null);

    const passwordRef = useRef<HTMLInputElement>(null);
    const confirmPasswordRef = useRef<HTMLInputElement>(null);
    // Function for handeling click event
    const OnSubmit = async (e: FormEvent) => {
        e.preventDefault();
        startLoading();
        const auth = getAuth(app);
        if (emailRef.current?.value) {
            try {
                await sendPasswordResetEmail(auth, emailRef.current.value);
                stopLoading();
            } catch (e: any) {
                stopLoading();
                setAuthError(
                    produce((draft) => {
                        draft.error = true;
                        draft.code = e.code;
                        draft.message = e.message;
                    }),
                );
            }
        } else {
            if (errorRef.current) {
                errorRef.current.innerText = "Please enter a valid e-mail";
            }
            stopLoading();
        }
        stopLoading();
    };
    const handleResetPassword = async (e: FormEvent) => {
        e.preventDefault();
        startLoading();
        const newPassword = passwordRef.current?.value;
        const newPasswordConfirmation = confirmPasswordRef.current?.value;
        const auth = getAuth(app);
        const oobCode = params.get("oobCode") || "";

        if (!newPassword && errorRef.current) {
            errorRef.current.innerText = "Provide a valid Password";
            stopLoading();
            return;
        }
        if (!newPasswordConfirmation && errorRef.current) {
            errorRef.current.innerText = "Re-enter the new Password";
            stopLoading();
            return;
        }
        if (newPassword !== newPasswordConfirmation && errorRef.current) {
            errorRef.current.innerText = "Passwords no not match";
            stopLoading();
            return;
        }
        if (
            newPassword &&
            validatePassword(newPassword).error &&
            errorRef.current
        ) {
            errorRef.current.innerText = validatePassword(newPassword).message;
            stopLoading();
            return;
        }
        function setErrors(e: any) {
            if (errorRef.current) {
                if (e.code === "auth/expired-action-code") {
                    setAuthError(
                        produce((draft) => {
                            draft.error = true;
                            draft.message =
                                "Auth Error: Password reset code expired";
                            draft.code = e.code;
                        }),
                    );
                } else if (e.code === "auth/invalid-action-code") {
                    setAuthError(
                        produce((draft) => {
                            draft.error = true;
                            draft.unchangedMessage =
                                "Auth Error: Password reset code is invalid";
                            draft.code = e.code;
                        }),
                    );
                } else if (e.code === "auth/user-not-found") {
                    setAuthError(
                        produce((draft) => {
                            draft.error = true;
                            draft.unchangedMessage =
                                "Auth Error: User not found";
                            draft.code = e.code;
                        }),
                    );
                } else {
                    setAuthError(
                        produce((draft) => {
                            draft.error = true;
                            draft.message = e.message;
                            draft.code = e.code;
                        }),
                    );
                }
            }
        }
        try {
            await verifyPasswordResetCode(auth, oobCode);
        } catch (e: any) {
            stopLoading();
            setErrors(e);
            return;
        }
        if (newPassword) {
            try {
                await confirmPasswordReset(auth, oobCode, newPassword);
                const currentURL = window.location.href.split("?")[0];
                history.replaceState({}, document.title, currentURL);
                stopLoading();
            } catch (e: any) {
                const currentURL = window.location.href.split("?")[0];
                history.replaceState({}, document.title, currentURL);
                stopLoading();
                setErrors(e);
            }
        }
        stopLoading();
    };

    function confirmPassword() {
        const password = passwordRef.current?.value;
        const confirm_password = confirmPasswordRef.current?.value;
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
    if (params.get("mode") === "resetPassword" && params.get("oobCode")) {
        return (
            <div>
                <form onSubmit={handleResetPassword} className={Styles.form}>
                    <input
                        ref={passwordRef}
                        type="password"
                        name="newPassword"
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
                        id="password"
                        placeholder="Enter New Password:"
                        required
                    />
                    <input
                        ref={confirmPasswordRef}
                        type="password"
                        onChange={confirmPassword}
                        name="confirmNewPassword"
                        id="password"
                        placeholder="Confirm New Password:"
                        required
                    />
                    <div className={Styles.errorText} ref={errorRef}></div>
                    <button type="reset" className={Styles.resetButton}>
                        Clear
                    </button>
                    <button type="submit" className={Styles.submitButton}>
                        Reset Password
                    </button>
                    <p className={Styles.optionText}>
                        Don't want to reset password?{" "}
                        <span onClick={() => switchTab()}>Sign In</span>{" "}
                        instead!
                    </p>
                </form>
            </div>
        );
    }
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
                <div className={Styles.errorText} ref={errorRef}></div>
                <button type="reset" className={Styles.resetButton}>
                    Clear
                </button>
                <button type="submit" className={Styles.submitButton}>
                    Reset Password
                </button>
                <p className={Styles.optionText}>
                    Don't want to reset password?{" "}
                    <span onClick={() => switchTab()}>Sign In</span> instead!
                </p>
            </form>
        </div>
    );
}

export default ResetPassword;
