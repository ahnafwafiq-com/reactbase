import "./App.css";
import SignIn from "./components/SignIn";
import SignOut from "./components/SignOut";
import TodoItem from "./components/TodoItem";
import app from "./Firebase-config";
// import { } from 'firebase/<service>';

// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
// import {} from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { useAuthState } from "react-firebase-hooks/auth";

getAnalytics(app);

function App() {
    const auth = getAuth(app);
    const [user] = useAuthState(auth);
    return (
        <>
            <div>{user ? <SignOut /> : <SignIn />}</div>
            {/* <TodoItem>Hello Todo 6</TodoItem> */}
        </>
    );
}

export default App;
