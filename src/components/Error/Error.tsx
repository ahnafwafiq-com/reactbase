import Styles from "./Error.module.css";
import { ReactNode } from "react";
import { CgClose } from "react-icons/cg";
import { useRef } from "react";

interface Props {
    children: string | ReactNode;
    code: string;
    onClose: () => void;
}

function ShowError({ children, code, onClose }: Props) {
    const divRef = useRef<HTMLDivElement>(null);
    return (
        <div ref={divRef} className={Styles.errorDiv}>
            <div className={Styles.errorMsg}>
                <b>Error:</b> {children}
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
