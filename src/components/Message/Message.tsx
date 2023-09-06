import { ReactNode } from "react";
import Styles from "./Message.module.css";
import { CgClose } from "react-icons/cg";

interface Props {
    children: string | ReactNode;
    onClose: () => void;
}

function Message({ children, onClose }: Props) {
    return (
        <div className={Styles.messageDiv}>
            <div className={Styles.message}>{children}</div>
            <div onClick={onClose} className={Styles.close}>
                <CgClose size="1.2rem"></CgClose>
            </div>
        </div>
    );
}

export default Message;
