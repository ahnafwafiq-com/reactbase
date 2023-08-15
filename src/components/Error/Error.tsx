import Styles from "./Error.module.css";
import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";

interface Props {
    children: string | ReactNode;
    code: string;
    unchangedMessage?: string;
    onClose: () => void;
}

function ShowError({ code, onClose, unchangedMessage }: Props) {
    let errorMessage = "";

    if (code === "auth/network-request-failed") {
        errorMessage = "No Internet Connecttion";
    } else if (code === "auth/user-not-found") {
        errorMessage = "Auth Error: User not found";
    } else if (code === "auth/popup-closed-by-user") {
        errorMessage = "Auth Error: Sign in pop-up closed by user";
    } else if (code === "auth/internal-error") {
        errorMessage =
            "Auth Error: Unexpected internal error occured. Please try again later";
    } else if (code === " auth/wrong-password") {
        errorMessage =
            "Auth Rrror: Incorrect password provided. Please try again";
    } else if (code === "auth/email-already-in-use") {
        errorMessage = "Auth Error: User already exists";
    } else if (code === "auth/account-exists-with-different-credential") {
        errorMessage =
            "Auth Error: Account already exists with different credentials";
    } else {
        errorMessage = "Something went wrong. Please try again";
    }

    return (
        <div className={Styles.errorDiv}>
            <div className={Styles.errorMsg}>
                <b>Error:</b>{" "}
                {unchangedMessage ? unchangedMessage : errorMessage}
            </div>
            <div className={Styles.code}>
                <b>Code:</b> {code}
            </div>
            <div onClick={onClose} className={Styles.closeError}>
                <CgClose size="1.6rem"></CgClose>
            </div>
        </div>
    );
}

export default ShowError;
