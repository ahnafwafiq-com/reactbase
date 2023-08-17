/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BsFacebook,
    BsFillPatchCheckFill,
    BsFillPatchMinusFill,
} from "react-icons/bs";

import { getAuth, FacebookAuthProvider, linkWithPopup } from "firebase/auth";
import { produce } from "immer";

interface Props {
    connected: boolean;
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
    reRender: () => void;
}

function LinkFacebook({
    connected,
    startLoading,
    stopLoading,
    setError,
    reRender,
}: Props) {
    return (
        <tr>
            <td>
                <button
                    onClick={async (e) => {
                        e.preventDefault();
                        startLoading();
                        if (connected) {
                            stopLoading();
                            return;
                        }
                        const provider = new FacebookAuthProvider();
                        const auth = getAuth();
                        if (auth.currentUser) {
                            try {
                                await linkWithPopup(auth.currentUser, provider);
                                stopLoading();
                                reRender();
                            } catch (e: any) {
                                stopLoading();
                                reRender();
                                setError(
                                    produce((draft) => {
                                        draft.error = true;
                                        draft.code = e.code;
                                        draft.message = e.message;
                                    }),
                                );
                            }
                        }
                    }}
                >
                    <BsFacebook /> Connect Facebook
                </button>
            </td>
            <td>
                <div>
                    {connected ? (
                        <>
                            <BsFillPatchCheckFill color="#4c4b16" /> Connected
                        </>
                    ) : (
                        <>
                            <BsFillPatchMinusFill color="#ff3333" /> Not
                            Connected
                        </>
                    )}
                </div>
            </td>
        </tr>
    );
}

export default LinkFacebook;
