/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, TwitterAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase-config";
import { BsTwitter } from "react-icons/bs";
import { produce } from "immer";
import Styles from "./SignIn.module.css";

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

function TwitterSignIn({ startLoading, stopLoading, setAuthError }: Props) {
    const onClick = async () => {
        startLoading();
        const auth = getAuth(app);
        const provider = new TwitterAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            stopLoading();
        } catch (e: any) {
            stopLoading();
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
    };
    return (
        <div className={Styles.loginIcon} onClick={onClick}>
            <BsTwitter color="#4C4B16" size="32px"></BsTwitter>
        </div>
    );
}

export default TwitterSignIn;
