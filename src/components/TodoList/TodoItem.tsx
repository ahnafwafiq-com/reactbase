import Styles from "./TodoItem.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt, BiDotsVerticalRounded } from "react-icons/bi";
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    updateDoc,
} from "firebase/firestore";
import app from "../../Firebase-config";

interface Props {
    finished: boolean;
    children: string;
    todoId: string;
    removeTodo: (todoId: string) => void;
}

function TodoItem({ children, finished, todoId, removeTodo }: Props) {
    const iconSize = "24px";
    return (
        <tr className={Styles.todoItem}>
            <td className={Styles.checkBoxTd}>
                {finished ? (
                    <input
                        className={Styles.checkBox}
                        type="checkbox"
                        disabled
                        checked
                    />
                ) : (
                    <input
                        className={Styles.checkBox}
                        type="checkbox"
                        onChange={(e) => {
                            if (finished) return;
                            if (e.target.checked) {
                                const ref = doc(
                                    collection(getFirestore(app), "todos"),
                                    todoId,
                                );

                                updateDoc(ref, {
                                    finished: true,
                                });
                            }
                        }}
                    />
                )}
            </td>
            <td
                className={
                    finished
                        ? [Styles.todoText, Styles.textFinished].join(" ")
                        : [Styles.todoText, "todoText"].join(" ")
                }
            >
                {children}
            </td>
            <td>
                {finished ? null : (
                    <div className={Styles.editButton} title="Edit Todo">
                        <BiEditAlt size={iconSize} />
                    </div>
                )}
            </td>

            <td>
                <div
                    className={Styles.deleteButton}
                    title="Delete Todo"
                    onClick={() => {
                        removeTodo(todoId);
                        const todosRef = collection(getFirestore(app), "todos");
                        deleteDoc(doc(todosRef, todoId));
                        removeTodo(todoId);
                    }}
                >
                    <MdOutlineDelete size={iconSize} />
                </div>
            </td>
            <td>
                <div className={Styles.optionsButton}>
                    <BiDotsVerticalRounded size={iconSize} />
                </div>
            </td>
        </tr>
    );
}

export default TodoItem;
