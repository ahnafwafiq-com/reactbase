// Importing CSS files
import "./CSS/App.css";
import "normalize.css";

// Importing External Components
import SignIn from "./components/SignIn";
// import TodoList from "./components/TodoList";

// Importing Firebase features
// import app from "./Firebase-config";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";


function App() {
    // const auth = getAuth(app);
    // const [user] = useAuthState(auth);
    return (
        <>
            <SignIn isOpen />
        </>
    );
}

export default App;
