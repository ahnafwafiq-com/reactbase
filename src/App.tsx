// Importing CSS files
import "./CSS/App.css";
import "normalize.css";
import { useState, useEffect, ReactNode } from "react";
// Importing External Components
import SignIn from "./components/SignIn";
import SignedIn from "./components/SignedIn";
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

function App() {
    const params = new URLSearchParams(window.location.search);
    const [showSignIn, setShowSignIn] = useState<boolean>(false);
    const [ErrorObj, setErrorObj] = useState({
        error: false,
        code: "",
        message: "",
        unchangedMessage: "",
    });

    const [messageObj, setMessageObj] = useState<{
        show: boolean;
        message: string | ReactNode;
    }>({ show: false, message: "" });

    useEffect(() => {
        const auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if (user) {
                if (
                    user.metadata.creationTime === user.metadata.lastSignInTime
                ) {
                    const searchParams = new URLSearchParams();
                    searchParams.append("email", user.email!);
                    searchParams.append(
                        "name",
                        user.displayName ||
                            user?.email!.split("@")[0].split("+")[0],
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
        const oobCode = params.get("oobCode")!;
        checkActionCode(auth, oobCode)
            .then(({ data }) => {
                console.log(data);
                applyActionCode(auth, oobCode)
                    .then(() => {
                        const { currentUser: user } = getAuth();
                        if (user?.emailVerified) {
                            setMessageObj(
                                produce((draft) => {
                                    draft.show = true;
                                    draft.message = `Your email (${user.email} has been succesfully verified.)`;
                                }),
                            );
                        }
                    })
                    .catch((e) => {
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
                setErrorObj(
                    produce((draft) => {
                        draft.error = true;
                        draft.message = e.message;
                        draft.code = e.code;
                    }),
                );
            })
            .finally(() => {
                history.replaceState(
                    {},
                    document.title,
                    window.location.href.split("?")[0],
                );
            });
    }
    return (
        <>
            <SignedIn />
            <SignIn
                window={1}
                isOpen={showSignIn}
                close={() => setShowSignIn(false)}
            />
            {messageObj.show ? (
                <Message
                    onClose={() => setMessageObj({ show: false, message: "" })}
                >
                    {messageObj.message}
                </Message>
            ) : null}
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
