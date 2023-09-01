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
import { useRef, useState } from "react";
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

function TodoItem({ children, finished, todoId, updateTodoList }: Props) {
    const [isEditing, setEditing] = useState<boolean>(false);
    const editRef = useRef<HTMLInputElement>(null);
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
                        ref={editRef}
                        placeholder={children}
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
                {finished ? null : isEditing ? (
                    <div
                        className={Styles.editButton}
                        onClick={() => {
                            const newTodo = editRef?.current?.value;
                            if (!newTodo) return;
                            updateTodoList(todoId, "edit", newTodo);
                            setEditing(false);
                            const ref = doc(
                                collection(getFirestore(app), "todos"),
                                todoId,
                            );
                            updateDoc(ref, {
                                name: newTodo,
                            });
                            updateTodoList(todoId, "edit", newTodo);
                        }}
                    >
                        <AiOutlineSave size={iconSize} />
                    </div>
                ) : (
                    <div
                        className={Styles.editButton}
                        title="Edit Todo"
                        onClick={() => {
                            setEditing(() => true);
                            editRef.current?.focus();
                        }}
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
}

export default TodoItem;
