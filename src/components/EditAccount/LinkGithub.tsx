/* eslint-disable @typescript-eslint/no-explicit-any */
import {
    BsGithub,
    BsFillPatchCheckFill,
    BsFillPatchMinusFill,
} from "react-icons/bs";

import { getAuth, GithubAuthProvider, linkWithPopup } from "firebase/auth";
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

function LinkGithub({
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
                        const provider = new GithubAuthProvider();
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
                    <BsGithub /> Connect Github
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

export default LinkGithub;
