/* eslint-disable @typescript-eslint/no-explicit-any */
import app from "../../Firebase-config";
import { getAuth, FacebookAuthProvider, signInWithPopup } from "firebase/auth";
import { BsFacebook } from "react-icons/bs";
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

function FacebookSignIn({ startLoading, stopLoading, setAuthError }: Props) {
    const onClick = async () => {
        startLoading();
        const auth = getAuth(app);
        const provider = new FacebookAuthProvider();
        try {
            await signInWithPopup(auth, provider);
            stopLoading();
        } catch (e: any) {
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
                <BsFacebook color="#4C4B16" size="32px"></BsFacebook>
            </div>
        </>
    );
}

export default FacebookSignIn;
