import { useState, useEffect } from "react";
import Styles from "./SideBar.module.css";
import { AiOutlineClose } from "react-icons/ai";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";
import app from "../../Firebase-config";
import {
    getFirestore,
    getDocs,
    query,
    where,
    collection,
    QuerySnapshot,
    DocumentData,
} from "firebase/firestore";

function SideBar() {
    const [isOpen, setOpen] = useState(true);
    const auth = getAuth();
    const [user] = useAuthState(auth);
    console.log(user?.uid);
    const [collections, setCollections] =
        useState<QuerySnapshot<DocumentData>>();
    useEffect(() => {
        const db = getFirestore(app);
        const collectionsRef = collection(db, "collections");
        if (!user?.uid) return;

        try {
            const q = query(collectionsRef, where("userId", "==", user.uid));
            getDocs(q).then((collections) => {
                setCollections(collections);
            });
        } catch (e) {
            console.log(e);
        }
        console.log(collections);
    }, [user]);
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
                        "https://s3.ap-southeast-1.amazonaws.com/cdn.ahnafwafiq.com/user.jpg"
                    }
                    alt="User Profile Picture"
                    className={Styles.userPhoto}
                />
                Signed In as{" "}
                {user?.displayName || user?.email?.split("@")[0].split("+")[0]}
            </div>
            <hr />
            {collections?.docs.map((todoCollection) => {
                return (
                    <>
                        <div>{todoCollection.name}</div>
                    </>
                );
            })}
            <hr />
            <footer className={Styles.sidebarFooter}>
                <div className={Styles.branding}>
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
                <small>
                    Created and maintained by{" "}
                    <a href="https://ahnafwafiq.com">Ahnaf Wafiq</a>.
                </small>
            </footer>
        </div>
    );
}

export default SideBar;
