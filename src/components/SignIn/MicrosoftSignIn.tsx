import { getAuth, OAuthProvider, signInWithPopup } from "firebase/auth";
import app from "../../Firebase-config";

function MicrosoftSignIn() {
    function onClick() {
        const auth = getAuth(app);
        const provider = new OAuthProvider("microsoft.com");
        signInWithPopup(auth, provider);
    }

    return <button onClick={onClick}>Sign In With Microsoft</button>;
}

export default MicrosoftSignIn;
