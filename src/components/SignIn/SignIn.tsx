import GithubSignIn from "./GithubSignIn";
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn from "./GoogleSignIn";
import TwitterSignIn from "./TwitterSignIn";
import ResetPassword from "./ResetPassword";
import EmailSignIn from "./EmailSignIn";
import EmailSignUp from "./EmailSignUp";
import AtomicSpinner from "atomic-spinner";
import Styles from "./SignIn.module.css";
import { useState, useEffect } from "react";
import { CgClose } from "react-icons/cg";
import ShowError from "../Error";

interface Props {
    isOpen: boolean;
    window: 0 | 1 | 2;
    close: () => void;
}

function SignIn({ isOpen, close, window }: Props) {
    useEffect(() => {
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (e.key === "Escape") {
                e.preventDefault();
                close();
            }
        });
    }, [isOpen, close]);
    const [AuthError, setAuthError] = useState({
        error: false,
        code: "",
        message: "",
        unchangedMessage: "",
    });
    const [isLoading, setLoading] = useState<boolean>(false);
    // 0 = Sign Up
    // 1 = Sign In
    // 2 = Reset Password
    const [Window, setWindow] = useState<0 | 1 | 2>(window);
    return (
        <>
            <dialog open={isOpen} className={Styles.signInModal}>
                <div className={Styles.closebutton} onClick={() => close()}>
                    <CgClose size="20px"></CgClose>
                </div>
                {Window ? (
                    Window === 1 ? (
                        <h2>Sign In</h2>
                    ) : (
                        <h2>Reset Password</h2>
                    )
                ) : (
                    <h2>Sign Up</h2>
                )}
                <button
                    type="button"
                    className={[
                        Styles.signUpTab,
                        Window ? undefined : Styles.activeTab,
                    ].join(" ")}
                    onClick={() => setWindow(0)}
                >
                    Sign Up
                </button>
                <button
                    type="button"
                    className={[
                        Styles.signInTab,
                        Window ? Styles.activeTab : undefined,
                    ].join(" ")}
                    onClick={() => setWindow(1)}
                >
                    Sign In
                </button>
                {Window ? (
                    Window === 1 ? (
                        <EmailSignIn
                            setAuthError={setAuthError}
                            startLoading={() => setLoading(true)}
                            stopLoading={() => setLoading(false)}
                            switchTab={setWindow}
                        />
                    ) : (
                        <ResetPassword
                            startLoading={() => setLoading(true)}
                            stopLoading={() => setLoading(false)}
                            switchTab={() => setWindow(1)}
                            setAuthError={setAuthError}
                        />
                    )
                ) : (
                    <EmailSignUp
                        stopLoading={() => setLoading(false)}
                        startLoading={() => setLoading(true)}
                        switchTab={() => setWindow(1)}
                        setAuthError={setAuthError}
                    />
                )}
                <div className={Styles.providerContainer}>
                    <div className={Styles.providerButtons}>
                        <p>Or Sign in with: </p>
                        <GoogleSignIn
                            startLoading={() => setLoading(true)}
                            stopLoading={() => setLoading(false)}
                            setAuthError={setAuthError}
                        />
                        <FacebookSignIn
                            startLoading={() => setLoading(true)}
                            stopLoading={() => setLoading(false)}
                            setAuthError={setAuthError}
                        />
                        <GithubSignIn
                            startLoading={() => setLoading(true)}
                            stopLoading={() => setLoading(false)}
                            setAuthError={setAuthError}
                        />
                        <TwitterSignIn
                            startLoading={() => setLoading(true)}
                            stopLoading={() => setLoading(false)}
                            setAuthError={setAuthError}
                        />
                    </div>
                </div>
                <Loading show={isLoading} />
            </dialog>
            {AuthError.error ? (
                <ShowError
                    code={AuthError.code || ""}
                    onClose={() =>
                        setAuthError({
                            error: false,
                            code: "",
                            message: "",
                            unchangedMessage: "",
                        })
                    }
                    unchangedMessage={AuthError.unchangedMessage}
                >
                    {AuthError.message}
                </ShowError>
            ) : null}
        </>
    );
}

interface LoadingProps {
    show: boolean;
}

function Loading({ show }: LoadingProps) {
    if (!show) return null;
    return (
        <>
            <div className={Styles.loadingDiv}>
                <AtomicSpinner
                    electronColorPalette={["#c6c1b7", "#ada9a0", "#949189"]}
                    electronPathColor="#4c4b16"
                    atomSize={350}
                    nucleusParticleFillColor="#f7f1e5"
                    nucleusParticleBorderColor="#4c4b16"
                />
            </div>
        </>
    );
}

export default SignIn;
