// Importing CSS files
import "./CSS/App.css";
import "normalize.css";
import { useState } from "react";
// Importing External Components
import SignIn from "./components/SignIn";
import { getAuth, applyActionCode } from "firebase/auth";
// import EditAccount from "./components/EditAccount";
import SideBar from "./components/SideBar";
import ShowError from "./components/Error/Error";
import { produce } from "immer";

// Importing Firebase features
// import app from "./Firebase-config";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

function App() {
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
