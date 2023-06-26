import GithubSignIn from "./GithubSignIn";
import FacebookSignIn from "./FacebookSignIn";
import GoogleSignIn from "./GoogleSignIn";
import TwitterSignIn from "./TwitterSignIn";

function SignIn() {
    return (
        <>
            <GoogleSignIn />
            <FacebookSignIn />
            <GithubSignIn />
            <TwitterSignIn />
        </>
    );
}

export default SignIn;
