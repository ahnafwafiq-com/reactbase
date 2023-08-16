/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    getAuth,
    signOut,
    updateProfile,
    updateEmail,
    onAuthStateChanged,
} from "firebase/auth";
// import { ref, getStorage } from "firebase/storage";
import { useAuthState } from "react-firebase-hooks/auth";
import Styles from "./EditAccount.module.css";
import { FormEvent, useRef, useState, useEffect } from "react";
import AtomicSpinner from "atomic-spinner";
import ShowError from "../Error";
import { produce } from "immer";
import LoadingStyles from "../SignIn/SignIn.module.css";
import { RiDeleteBinLine } from "react-icons/ri";

// Provider icons
import { BsGoogle } from "react-icons/bs";
import { BsFacebook } from "react-icons/bs";
import { BsGithub } from "react-icons/bs";
import { BsTwitter } from "react-icons/bs";

export default function EditAccount() {
    const defaultDpUrl =
        "https://s3.ap-southeast-1.amazonaws.com/cdn.ahnafwafiq.com/user.jpg";
    // console.log(auth.currentUser?.providerData);
    // console.log(auth.currentUser?.providerId);
    const [isLoading, setLoading] = useState(false);
    const [ErrorObj, setErrorObj] = useState({
        error: false,
        code: "",
        message: "",
        unchangedMessage: "",
    });
    const auth = getAuth();
    const user = useAuthState(auth);
    const [providers, setProviders] = useState({
        password: false,
        google: false,
        facebook: false,
        twitter: false,
        github: false,
    });
    useEffect(() => {
        onAuthStateChanged(auth, (user) => {
            if (user) {
                user.providerData.forEach((user) => {
                    if (user.providerId === "password") {
                        setProviders((prev) => {
                            return { ...prev, password: true };
                        });
                    } else if (user.providerId === "google.com") {
                        setProviders((prev) => {
                            return { ...prev, google: true };
                        });
                    } else if (user.providerId === "facebook.com") {
                        setProviders((prev) => {
                            return { ...prev, facebook: true };
                        });
                    } else if (user.providerId === "github.com") {
                        setProviders((prev) => {
                            return { ...prev, github: true };
                        });
                    } else if (user.providerId === "twitter.com") {
                        setProviders((prev) => {
                            return { ...prev, twitter: true };
                        });
                    }
                });
            }
        });
    }, []);
    console.log(providers);

    const displayNameRef = useRef<HTMLInputElement>(null);
    const emailRef = useRef<HTMLInputElement>(null);
    return (
        <>
            <dialog open className={Styles.editAccount}>
                <img
                    className={Styles.displayPicture}
                    src={user[0]?.photoURL || defaultDpUrl}
                    alt="User Profile Picture"
                />
                <h2>Hello, {user[0]?.displayName}</h2>
                <h4>Edit Account Details:</h4>
                <div className={Styles.editingDiv}>
                    <form
                        onSubmit={async (e: FormEvent) => {
                            e.preventDefault();
                            setLoading(true);
                            const newDisplayName =
                                displayNameRef.current?.value;
                            if (newDisplayName && auth.currentUser) {
                                try {
                                    await updateProfile(auth.currentUser, {
                                        displayName: newDisplayName,
                                    });
                                    setLoading(false);
                                } catch (e: any) {
                                    setLoading(false);
                                    setErrorObj(
                                        produce((draft) => {
                                            draft.error = true;
                                            draft.message = e.message;
                                            draft.code = e.code;
                                        }),
                                    );
                                }
                            }
                        }}
                    >
                        <label htmlFor="displayname">Display Name: </label>
                        <input
                            ref={displayNameRef}
                            type="text"
                            id="displayname"
                            name="displayname"
                            placeholder={user[0]?.displayName || ""}
                            required
                        />
                        <button type="submit">Save</button>
                    </form>
                    <form
                        onSubmit={async (e: FormEvent) => {
                            e.preventDefault();
                            setLoading(true);
                            const newEmail = emailRef.current?.value;
                            if (newEmail && auth.currentUser) {
                                try {
                                    await updateEmail(
                                        auth.currentUser,
                                        newEmail,
                                    );
                                    setLoading(false);
                                } catch (e: any) {
                                    setLoading(false);
                                    setErrorObj(
                                        produce((draft) => {
                                            draft.error = true;
                                            draft.message = e.message;
                                            draft.code = e.code;
                                        }),
                                    );
                                }
                            }
                        }}
                    >
                        <label htmlFor="email">Email: </label>
                        <input
                            ref={emailRef}
                            type="text"
                            id="email"
                            name="email"
                            placeholder={user[0]?.email || ""}
                            required
                        />
                        <button type="submit">Save</button>
                    </form>
                </div>
                <h4>Connect other login-in methods:</h4>
                <div className={Styles.connectionDiv}>
                    <button>
                        <BsGoogle /> Connect Google
                    </button>
                    <div>
                        {providers.google ? "Connected" : "Not Connected"}
                    </div>
                    <button>
                        <BsGithub /> Connect Github
                    </button>
                    <div>
                        {providers.github ? "Connected" : "Not Connected"}
                    </div>

                    <button>
                        <BsFacebook /> Connect Facebook
                    </button>
                    <div>
                        {providers.facebook ? "Connected" : "Not Connected"}
                    </div>

                    <button>
                        <BsTwitter /> Connect Twitter
                    </button>
                    <div>
                        {providers.twitter ? "Connected" : "Not Connected"}
                    </div>
                </div>

                <button className={Styles.deleteAccDiv}>
                    <RiDeleteBinLine /> Delete Account
                </button>
                <button
                    onClick={async () => {
                        setLoading(true);
                        await signOut(auth);
                        setLoading(false);
                    }}
                    className={Styles.signOutBtn}
                >
                    Sign Out
                </button>
                <Loading show={isLoading} />
            </dialog>
            {ErrorObj.error ? (
                <ShowError
                    code={ErrorObj.code || ""}
                    onClose={() =>
                        setErrorObj({
                            error: false,
                            code: "",
                            message: "",
                            unchangedMessage: "",
                        })
                    }
                    unchangedMessage={ErrorObj.unchangedMessage}
                >
                    {ErrorObj.message}
                </ShowError>
            ) : null}
        </>
    );
}

interface LoadingProps {
    show: boolean;
}

function Loading({ show }: LoadingProps) {
    if (!show) return null;
    return (
        <>
            <div className={LoadingStyles.loadingDiv}>
                <AtomicSpinner
                    electronColorPalette={["#c6c1b7", "#ada9a0", "#949189"]}
                    electronPathColor="#4c4b16"
                    atomSize={350}
                    nucleusParticleFillColor="#f7f1e5"
                    nucleusParticleBorderColor="#4c4b16"
                />
            </div>
        </>
    );
}
