// Importing CSS files
import "./CSS/App.css";
import "normalize.css";

// Importing External Components
import SignIn from "./components/SignIn";

// Importing Firebase features
import app from "./Firebase-config";
import { getAnalytics } from "firebase/analytics";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

getAnalytics(app);

function App() {
    // const auth = getAuth(app);
    // const [user] = useAuthState(auth);
    return (
        <>
            <SignIn></SignIn>
        </>
    );
}

export default App;
