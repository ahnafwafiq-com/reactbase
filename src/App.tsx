// Importing CSS files
import "./CSS/App.css";
import "normalize.css";
import { useState, useEffect } from "react";
// Importing External Components
import SignIn from "./components/SignIn";
// import EditAccount from "./components/EditAccount";
import SignedIn from "./components/SignedIn";
// import SideBar from "./components/SideBar";
import ShowError from "./components/Error/Error";
import { produce } from "immer";

// Importing Firebase features
import {
    getAuth,
    applyActionCode,
    onAuthStateChanged,
    checkActionCode,
} from "firebase/auth";
import Message from "./components/Message";
// import {
//     addDoc,
//     collection,
//     // connectFirestoreEmulator,
//     getFirestore,
//     serverTimestamp,
// } from "firebase/firestore";
// import app from "./Firebase-config";

function App() {
    // const db = getFirestore(app);
    // // connectFirestoreEmulator(db, "127.0.0.1", 8078);
    // useEffect(() => {
    //     const todosRef = collection(db, "todos");
    //     for (let i = 0; i < 10; i++) {
    //         addDoc(todosRef, {
    //             name: `Test Todo ${Math.round(Math.random() * 1000)}`,
    //             collectionId: "3cL6sW7GFL5zWZxoxuvk",
    //             createdAt: serverTimestamp(),
    //             updatedAt: serverTimestamp(),
    //             finished: Math.round(Math.random()) ? true : false,
    //         });
    //     }
    // });
    const params = new URLSearchParams(window.location.search);
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [ErrorObj, setErrorObj] = useState({
        error: false,
        code: "",
        message: "",
        unchangedMessage: "",
    });

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (
                    user.metadata.creationTime === user.metadata.lastSignInTime
                ) {
                    const searchParams = new URLSearchParams();
                    searchParams.append("email", user.email || "");
                    searchParams.append(
                        "name",
                        user.displayName ||
                            user?.email?.split("@")[0].split("+")[0] ||
                            "",
                    );
                    fetch(
                        `https://ahnafwafiq.com/api/reactbase/welcome?${searchParams.toString()}`,
                    );
                }
            }
        });
    }, []);

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
        checkActionCode(auth, oobCode)
            .then(({ data }) => {
                console.log(data);
                applyActionCode(auth, oobCode)
                    .then(() => {
                        history.replaceState(
                            {},
                            document.title,
                            window.location.href.split("?")[0],
                        );
                    })
                    .catch((e) => {
                        history.replaceState(
                            {},
                            document.title,
                            window.location.href.split("?")[0],
                        );
                        setErrorObj(
                            produce((draft) => {
                                draft.error = true;
                                draft.message = e.message;
                                draft.code = e.code;
                            }),
                        );
                    });
            })
            .catch((e) => {
                history.replaceState(
                    {},
                    document.title,
                    window.location.href.split("?")[0],
                );
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
            {/* <SideBar /> */}
            <Message onClose={() => console.log("Message Closed")}>
                Hello Message!
            </Message>
            <SignedIn />
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
