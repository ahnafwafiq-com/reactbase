import Styles from "./TodoItem.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt } from "react-icons/bi";
import {
    collection,
    deleteDoc,
    doc,
    getFirestore,
    updateDoc,
    serverTimestamp,
} from "firebase/firestore";
import app from "../../Firebase-config";
import { useEffect, useState } from "react";
import { AiOutlineSave } from "react-icons/ai";

interface Props {
    finished: boolean;
    children: string;
    todoId: string;
    updateTodoList: (
        todoId: string,
        mode: "delete" | "finished" | "edit",
        newTodo?: string,
    ) => void;
}

const TodoItem = ({ children, finished, todoId, updateTodoList }: Props) => {
    const [isEditing, setEditing] = useState<boolean>(false);
    const [newTodo, setNewTodo] = useState(children);
    const iconSize = "24px";
    useEffect(() => {
        document.addEventListener("keyup", (e: KeyboardEvent) => {
            if (isEditing && e.key === "Enter") {
                setEditing(false);
                if (newTodo) {
                    updateTodoList(todoId, "edit", newTodo);
                    setEditing(false);
                    const ref = doc(
                        collection(getFirestore(app), "todos"),
                        todoId,
                    );
                    updateDoc(ref, {
                        name: newTodo,
                        updatedAt: serverTimestamp(),
                    });
                    updateTodoList(todoId, "edit", newTodo);
                }
            }
        });
    });
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
                            setEditing(false);
                            if (finished) return;
                            if (e.target.checked) {
                                updateTodoList(todoId, "finished");
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
            {isEditing ? (
                <td>
                    <input
                        type="text"
                        placeholder={children}
                        value={newTodo}
                        onChange={(e) => setNewTodo(e.target.value)}
                        className={Styles.editTodo}
                    />
                </td>
            ) : (
                <td
                    className={
                        finished
                            ? [Styles.todoText, Styles.textFinished].join(" ")
                            : Styles.todoText
                    }
                >
                    {children}
                </td>
            )}
            <td>
                {finished ? (
                    <div
                        style={{
                            width: "22px",
                            aspectRatio: 1,
                        }}
                    ></div>
                ) : isEditing ? (
                    <div
                        className={Styles.editButton}
                        onClick={() => {
                            setEditing(false);
                            if (newTodo) {
                                updateTodoList(todoId, "edit", newTodo);
                                setEditing(false);
                                const ref = doc(
                                    collection(getFirestore(app), "todos"),
                                    todoId,
                                );
                                updateDoc(ref, {
                                    name: newTodo,
                                    updatedAt: serverTimestamp(),
                                });
                                updateTodoList(todoId, "edit", newTodo);
                            }
                        }}
                    >
                        <AiOutlineSave size={iconSize} />
                    </div>
                ) : (
                    <div
                        className={Styles.editButton}
                        title="Edit Todo"
                        onClick={() => setEditing(() => true)}
                    >
                        <BiEditAlt size={iconSize} />
                    </div>
                )}
            </td>
            <td>
                <div
                    className={Styles.deleteButton}
                    title="Delete Todo"
                    onClick={() => {
                        setEditing(false);
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
};

export default TodoItem;
