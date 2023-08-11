// Importing CSS files
import "./CSS/App.css";
import "normalize.css";
import { useState } from "react";
// Importing External Components
import SignIn from "./components/SignIn";
// import TodoList from "./components/TodoList";

// Importing Firebase features
// import app from "./Firebase-config";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

function App() {
    const [showSignIn, setShowSignIn] = useState<boolean>(true);

    // const auth = getAuth(app);
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
