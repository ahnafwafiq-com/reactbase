import "./App.css";
import "normalize.css";
import Error from "./components/Error";
import SocialIcons from "./components/SocialIcons";
import app from "./Firebase-config";

import { getAnalytics } from "firebase/analytics";
// import {} from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

getAnalytics(app);

function App() {
    // const auth = getAuth(app);
    // const [user] = useAuthState(auth);
    return (
        <>
            <Error code="36e7hsh">User already exists</Error>
            <SocialIcons></SocialIcons>
        </>
    );
}

export default App;
