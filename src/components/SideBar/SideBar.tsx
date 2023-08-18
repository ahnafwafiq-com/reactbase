import { useState } from "react";
import Styles from "./SideBar.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { getAuth, signOut } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

function SideBar() {
    const [isOpen, setOpen] = useState(true);
    const auth = getAuth();
    const [user] = useAuthState(auth);
    return (
        <div className={isOpen ? Styles.sidebarOpened : Styles.sidebarClosed}>
            <AiOutlineClose size="24px" />
            <div className={Styles.branding}>
                <img
                    className={Styles.logo}
                    src="https://reactbase.ahnafwafiq.com/logo-transparent.png"
                    alt="ReactBase logo"
                />
                <h1>ReactBase</h1>
            </div>
            <div className={Styles.userInfo}>
                <img
                    src={
                        user?.photoURL ||
                        "https://s3.ap-southeast-1.amazonaws.com/cdn.ahnafwafiq.com/user.jpg"
                    }
                    alt="User Profile Picture"
                    width="40px"
                />
                Signed In as {user?.displayName}
                <button
                    onClick={() => {
                        signOut(auth);
                    }}
                >
                    Sign Out
                </button>
            </div>
        </div>
    );
}

export default SideBar;
