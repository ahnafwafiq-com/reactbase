/* eslint-disable @typescript-eslint/no-explicit-any */
import { getAuth, deleteUser } from "firebase/auth";
import {
    collection,
    getFirestore,
    deleteDoc,
    doc,
    getDocs,
    query,
    where,
} from "firebase/firestore";
import app from "../../Firebase-config";
import Styles from "./EditAccount.module.css";
import { RiDeleteBinLine } from "react-icons/ri";
import { FormEvent, useRef, useState } from "react";
import { produce } from "immer";

interface Props {
    startLoading: () => void;
    stopLoading: () => void;
    setError: React.Dispatch<
        React.SetStateAction<{
            error: boolean;
            code: string;
            message: string;
            unchangedMessage: string;
        }>
    >;
}

function DeleteAccount({ startLoading, stopLoading, setError }: Props) {
    const dialogRef = useRef<HTMLDialogElement>(null);
    const consentRef = useRef<HTMLInputElement>(null);
    const [consentScreen, setConsentScreen] = useState(0);
    const deleteAccount = async (e: FormEvent) => {
        e.preventDefault();
        startLoading();
        const auth = getAuth();
        if (
            consentRef.current &&
            consentRef.current.value !== "deleteaccount"
        ) {
            stopLoading();
            setError(
                produce((draft) => {
                    draft.error = true;
                    draft.code = "auth/incorrect-deleteion-code";
                    draft.unchangedMessage = "Please enter the correct code";
                }),
            );
            return;
        }
        if (
            consentRef.current &&
            auth.currentUser &&
            consentRef?.current.value === "deleteaccount"
        ) {
            const uid = auth.currentUser.uid;
            try {
                const db = getFirestore(app);
                const collections = await getDocs(
                    query(
                        collection(db, "collections"),
                        where("userId", "==", uid),
                    ),
                );
                const todosRef = collection(db, "todos");
                collections.forEach(async (collection) => {
                    const todos = await getDocs(
                        query(
                            todosRef,
                            where("collectionId", "==", collection.id),
                        ),
                    );
                    todos.forEach(async (todo) => {
                        const ref = doc(db, "todos", todo.id);
                        await deleteDoc(ref);
                    });
                });

                await deleteUser(auth.currentUser);
                stopLoading();
            } catch (e: any) {
                stopLoading();
                setError(
                    produce((draft) => {
                        draft.error = true;
                        draft.message = e.message;
                        draft.code = e.code;
                    }),
                );
            }
        } else {
            stopLoading();
        }
    };
    return (
        <>
            <button
                className={Styles.deleteAccBtn}
                onClick={() => {
                    setConsentScreen(0);
                    dialogRef?.current?.showModal();
                }}
            >
                <RiDeleteBinLine /> Delete Account
            </button>
            <dialog ref={dialogRef} className={Styles.deleteAccDialog}>
                {consentScreen ? (
                    <>
                        <p>
                            Write <code>deleteaccount</code> below to confirm
                        </p>
                        <form onSubmit={deleteAccount}>
                            <input
                                ref={consentRef}
                                type="text"
                                placeholder="Type here"
                            />
                            <button type="submit" className={Styles.yesBtn}>
                                <RiDeleteBinLine /> Delete my Account
                            </button>
                        </form>
                        <button onClick={() => setConsentScreen(0)}>
                            Back
                        </button>
                    </>
                ) : (
                    <>
                        <h3>Are you sure you want to delete your account?</h3>
                        <p>
                            You account will be permanently deleted from our
                            database. You will lose all your todos and
                            collections. This action if irriversible!
                        </p>
                        <button
                            onClick={() => setConsentScreen(1)}
                            className={Styles.btnYes}
                        >
                            <RiDeleteBinLine /> Yes, delete my account.
                        </button>
                        <button onClick={() => dialogRef.current?.close()}>
                            No, close
                        </button>
                    </>
                )}
            </dialog>
        </>
    );
}

export default DeleteAccount;
