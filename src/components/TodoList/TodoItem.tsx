import Styles from "./TodoItem.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
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
    updateTodoList: (todoId: string, mode: "delete" | "finished") => void;
}

function TodoItem({ children, finished, todoId, updateTodoList }: Props) {
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
                                updateTodoList(todoId, "finished");
                                // updateTodoList(todoId, "finished");
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
                        updateTodoList(todoId, "delete");
                        const todosRef = collection(getFirestore(app), "todos");
                        deleteDoc(doc(todosRef, todoId));
                        updateTodoList(todoId, "delete");
                    }}
                >
                    <MdOutlineDelete size={iconSize} />
                </div>
            </td>
        </tr>
    );
}

export default TodoItem;
