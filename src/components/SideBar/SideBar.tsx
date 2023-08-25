import { useState, useEffect } from "react";
import Styles from "./SideBar.module.css";
import { AiOutlineClose, AiOutlineStar } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../Firebase-config";
import {
    getFirestore,
    getDocs,
    query,
    where,
    collection,
    QueryDocumentSnapshot,
    DocumentData,
} from "firebase/firestore";
import { BiEditAlt } from "react-icons/bi";
import { BsGithub } from "react-icons/bs";

function SideBar() {
    const [isOpen, setOpen] = useState(true);
    const auth = getAuth();
    const [user] = useAuthState(auth);
    const [collections, setCollections] =
        useState<QueryDocumentSnapshot<DocumentData, DocumentData>[]>();
    useEffect(() => {
        const db = getFirestore(app);
        const collectionsRef = collection(db, "/collections");
        // if (!user?.uid) return;

        try {
            const q = query(
                collectionsRef,
                where("userId", "==", "P2e61VI1dcaF8VBRcEL0vlv6REr2"),
            );
            getDocs(q)
                .then((Collections) => {
                    setCollections(Collections.docs);
                })
                .catch((e) => {
                    console.log(e);
                });
        } catch (e) {
            console.log(e);
        }
    }, []);
    return (
        <div className={isOpen ? Styles.sidebarOpened : Styles.sidebarClosed}>
            <div className={Styles.branding}>
                <div className={Styles.closebtn} onClick={() => setOpen(false)}>
                    <AiOutlineClose size="32px" />
                </div>
                <img
                    className={Styles.logo}
                    src="https://reactbase.ahnafwafiq.com/logo-transparent.png"
                    alt="ReactBase logo"
                />
                <h1>ReactBase</h1>
            </div>
            <hr />
            <div className={Styles.userInfo}>
                <img
                    src={
                        user?.photoURL ||
                        "https://reactbase.ahnafwafiq.com/user.jpg"
                    }
                    alt="User Profile Picture"
                    className={Styles.userPhoto}
                />
                Signed In as{" "}
                {user?.displayName || user?.email?.split("@")[0].split("+")[0]}
            </div>
            <hr />
            <div>
                <h3 className={Styles.h3}>Collections:</h3>
                <table className={Styles.todoCollections}>
                    {collections?.map((todoCollection) => {
                        return (
                            <tr
                                key={todoCollection.get("id")}
                                className={Styles.todoCollection}
                            >
                                <td>
                                    <div className={Styles.colorCircle}></div>
                                </td>
                                <td>
                                    <div>{todoCollection.get("name")}</div>
                                </td>
                                <td className={Styles.editButton}>
                                    <div>
                                        <BiEditAlt size="20px" />
                                    </div>
                                </td>
                            </tr>
                        );
                    })}
                </table>
            </div>
            <hr />
            <footer className={Styles.sidebarFooter}>
                <div
                    className={Styles.branding}
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                        window.open(
                            "https://github.com/ahnafwafiq09/firebase-react",
                        )
                    }
                >
                    <img
                        className={Styles.logo}
                        src="https://reactbase.ahnafwafiq.com/logo-transparent.png"
                        alt="ReactBase logo"
                    />
                    <h1>ReactBase Todo</h1>
                </div>
                <big>
                    Copyright &copy;{new Date().getFullYear()} Ahnaf Wafiq. All
                    rights reserved.
                </big>
                <small>
                    The ReactBase App and it's code is open sourced and licensed
                    under the{" "}
                    <a
                        href="https://opensource.org/license/mit/"
                        target="_blank"
                    >
                        MIT Open Source license.
                    </a>
                </small>
                <div>
                    <button
                        onClick={() => {
                            window.open(
                                "https://github.com/ahnafwafiq09/firebase-react",
                            );
                        }}
                    >
                        <AiOutlineStar /> Star on <BsGithub /> Github
                    </button>
                </div>
                <small>
                    Created and maintained by{" "}
                    <a href="https://ahnafwafiq.com" target="_blank">
                        Ahnaf Wafiq
                    </a>
                    .
                </small>
            </footer>
        </div>
    );
}

export default SideBar;
