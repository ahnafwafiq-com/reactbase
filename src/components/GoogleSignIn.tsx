import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../App";
import "./GoogleSignIn.css";

function GoogleSignIn() {
    function SignInWithGoogle() {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    return (
        <>
            <button onClick={SignInWithGoogle}>Sign in With Google</button>
        </>
    );
}

export default GoogleSignIn;
