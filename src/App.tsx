// Importing CSS files
import "./CSS/App.css";
import "normalize.css";
import { useEffect, useState } from "react";
// Importing External Components
import SignIn from "./components/SignIn";
// import EditAccount from "./components/EditAccount";
import SideBar from "./components/SideBar";
import ShowError from "./components/Error/Error";
import { produce } from "immer";

// Importing Firebase features
import { getAuth, applyActionCode } from "firebase/auth";
import {
    addDoc,
    collection,
    // connectFirestoreEmulator,
    getFirestore,
    serverTimestamp,
} from "firebase/firestore";
import app from "./Firebase-config";

function App() {
    const db = getFirestore(app);
    // connectFirestoreEmulator(db, "127.0.0.1", 8078);
    useEffect(() => {
        const collectionsRef = collection(db, "collections");
        for (let i = 0; i < 10; i++) {
            addDoc(collectionsRef, {
                name: `Test Collection ${Math.round(Math.random() * 10000)}`,
                userId: "P2e61VI1dcaF8VBRcEL0vlv6REr2",
                createdAt: serverTimestamp(),
                color: "#ffffff",
            });
        }
    });
    const params = new URLSearchParams(window.location.search);
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [ErrorObj, setErrorObj] = useState({
        error: false,
        code: "",
        message: "",
        unchangedMessage: "",
    });

    if (params.get("mode") === "resetPassword") {
        return (
            <SignIn
                window={2}
                isOpen={true}
                close={() => setShowSignIn(false)}
            />
        );
    }
    if (params.get("mode") === "verifyEmail" && params.get("oobCode")) {
        const auth = getAuth();
        const oobCode = params.get("oobCode") || "";
        applyActionCode(auth, oobCode)
            .then(() => {
                const currentURL = window.location.href.split("?")[0];
                history.replaceState({}, document.title, currentURL);
            })
            .catch((e) => {
                const currentURL = window.location.href.split("?")[0];
                history.replaceState({}, document.title, currentURL);
                setErrorObj(
                    produce((draft) => {
                        draft.error = true;
                        draft.message = e.message;
                        draft.code = e.code;
                    }),
                );
            });
    }
    // const [user] = useAuthState(auth);
    return (
        <>
            {/* <EditAccount /> */}
            <SideBar />
            <SignIn
                window={1}
                isOpen={showSignIn}
                close={() => setShowSignIn(false)}
            />
            {ErrorObj.error ? (
                <ShowError
                    code={ErrorObj.code || ""}
                    onClose={() =>
                        setErrorObj({
                            error: false,
                            code: "",
                            message: "",
                            unchangedMessage: "",
                        })
                    }
                    unchangedMessage={ErrorObj.unchangedMessage}
                >
                    {ErrorObj.message}
                </ShowError>
            ) : null}
        </>
    );
}

export default App;
