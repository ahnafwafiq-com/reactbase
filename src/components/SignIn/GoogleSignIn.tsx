import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import app from "../../Firebase-config";
import { BsGoogle } from "react-icons/bs";

function GoogleSignIn() {
    function SignInWithGoogle() {
        const auth = getAuth(app);
        const provider = new GoogleAuthProvider();
        signInWithPopup(auth, provider);
    }
    return (
        <div>
            <BsGoogle
                onClick={SignInWithGoogle}
                color="#4C4B16"
                size="36px"
            ></BsGoogle>
        </div>
    );
}

export default GoogleSignIn;
