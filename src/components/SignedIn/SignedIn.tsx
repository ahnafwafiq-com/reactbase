import { useAuthState } from "react-firebase-hooks/auth";
import Styles from "./SignedIn.module.css";
import { getAuth } from "firebase/auth";
import app from "../../Firebase-config";
import TodoList from "../../components/TodoList";
import EditAccount from "../../components/EditAccount";
import { useState } from "react";

const SignedIn = () => {
    const auth = getAuth(app);
    const [editingAccount, setEditingAccount] = useState(false);
    const [user] = useAuthState(auth);
    return (
        <>
            <div className={Styles.topbar}>
                <img
                    src={
                        user?.photoURL ||
                        "https://reactbase.ahnafwafiq.com/user.jpg"
                    }
                    onClick={() => setEditingAccount(true)}
                    alt="Profile Picture"
                    className={Styles.profilePhoto}
                />
            </div>
            <TodoList collectionId="3cL6sW7GFL5zWZxoxuvk" />
            <EditAccount
                isOpen={editingAccount}
                close={() => setEditingAccount(false)}
            />
        </>
    );
};

export default SignedIn;
