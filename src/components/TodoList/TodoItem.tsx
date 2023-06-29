import { useState } from "react";
import Styles from "./TodoItem.module.css";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { BiEditAlt, BiSolidEditAlt } from "react-icons/bi";

// Defining Interface for <TodoItem/> props
interface Props {
    finished: boolean;
    children: string;
}

function TodoItem({ children, finished }: Props) {
    const iconSize = "24px";
    const [DeleteHover, setDeleteHover] = useState(false);
    const [EditHover, setEditHover] = useState(false);
    return (
        <tr className={[Styles.todoItem, "todoItem"].join(" ")}>
            <td className={Styles.checkBoxTd}>
                {finished ? (
                    <input
                        type="checkbox"
                        name="todoCheckbox"
                        checked
                        disabled
                        className={[Styles.checkBox, "checkBox"].join(" ")}
                    />
                ) : (
                    <input
                        type="checkbox"
                        name="todoCheckbox"
                        className={[Styles.checkBox, "checkBox"].join(" ")}
                    />
                )}
            </td>
            <td
                className={
                    finished
                        ? [
                              Styles.todoText,
                              "todoText",
                              Styles.textFinished,
                          ].join(" ")
                        : [Styles.todoText, "todoText"].join(" ")
                }
            >
                {children}
            </td>
            <td>
                {finished ? null : (
                    <div
                        className="editButton"
                        onMouseOver={() => {
                            setEditHover(true);
                            setDeleteHover(false);
                        }}
                        onMouseOut={() => {
                            setEditHover(false);
                            setEditHover(false);
                        }}
                    >
                        {EditHover ? (
                            <BiSolidEditAlt size={iconSize} />
                        ) : (
                            <BiEditAlt size={iconSize} />
                        )}
                    </div>
                )}
            </td>

            <td className={Styles.deleteButtonTd}>
                <div
                    className="deleteButton"
                    onMouseOut={() => {
                        setDeleteHover(false);
                        setEditHover(false);
                    }}
                    onMouseOver={() => {
                        setDeleteHover(true);
                        setEditHover(false);
                    }}
                >
                    {DeleteHover ? (
                        <MdDelete size={iconSize} />
                    ) : (
                        <MdOutlineDelete size={iconSize} />
                    )}
                </div>
            </td>
        </tr>
    );
}

export default TodoItem;
