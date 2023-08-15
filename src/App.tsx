// Importing CSS files
import "./CSS/App.css";
import "normalize.css";
import { useState } from "react";
// Importing External Components
import SignIn from "./components/SignIn";
// import { getAuth } from "firebase/auth";
// import TodoList from "./components/TodoList";

// Importing Firebase features
// import app from "./Firebase-config";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

function App() {
    const params = new URLSearchParams(window.location.search);
    const [showSignIn, setShowSignIn] = useState<boolean>(true);
    if (params.get("mode") === "resetPassword") {
        return (
            <SignIn
                window={2}
                isOpen={showSignIn}
                close={() => setShowSignIn(false)}
            />
        );
    }
    // const [user] = useAuthState(auth);
    return (
        <>
            <SignIn
                window={1}
                isOpen={showSignIn}
                close={() => setShowSignIn(false)}
            />
        </>
    );
}

export default App;
