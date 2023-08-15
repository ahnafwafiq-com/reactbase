/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../Firebase-config";
import { BsGoogle } from "react-icons/bs";
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

function GoogleSignIn({ startLoading, stopLoading, setAuthError }: Props) {
    async function onClick() {
        startLoading();
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            stopLoading();
        } catch (e: any) {
            stopLoading();
            setAuthError(
                produce((draft) => {
                    draft.error = true;
                    draft.message = e.message;
                    draft.code = e.code;
                }),
            );
        }
    }
    return (
        <>
            <div className={Styles.loginIcon} onClick={onClick}>
                <BsGoogle color="#4C4B16" size="32px"></BsGoogle>
            </div>
        </>
    );
}

export default GoogleSignIn;
