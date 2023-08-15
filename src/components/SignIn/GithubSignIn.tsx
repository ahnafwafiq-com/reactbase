/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, GithubAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase-config";
import { BsGithub } from "react-icons/bs";
import Styles from "./SignIn.module.css";
import { produce } from "immer";

interface Props {
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

function GithubSignIn({ startLoading, stopLoading, setAuthError }: Props) {
    const onClick = async () => {
        startLoading();
        const auth = getAuth(app);
        const provider = new GithubAuthProvider();
        try {
            await signInWithPopup(auth, provider);
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
    };
    return (
        <>
            <div className={Styles.loginIcon} onClick={onClick}>
                <BsGithub color="4C4B16" size="32px"></BsGithub>
            </div>
        </>
    );
}

export default GithubSignIn;
