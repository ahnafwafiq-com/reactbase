import { useState } from "react";
import Styles from "./TodoItem.module.css";
import { MdDelete, MdOutlineDelete } from "react-icons/md";
import { BiEditAlt, BiSolidEditAlt } from "react-icons/bi";

// Defining Interface for <TodoItem/> props
interface Props {
    children: string;
}

function TodoItem({ children }: Props) {
    const iconSize = "24px";
    const [DeleteHover, setDeleteHover] = useState(false);
    const [EditHover, setEditHover] = useState(false);
    return (
        <tr className={[Styles.todoItem, "todoItem"].join(" ")}>
            <td className={Styles.checkBoxTd}>
                <input
                    type="checkbox"
                    name="todoChcked"
                    className={[Styles.checkBox, "checkBox"].join(" ")}
                />
            </td>
            <td
                className={[
                    Styles.todoText,
                    Styles.todoTextTd,
                    "todoText",
                ].join(" ")}
            >
                {children}
            </td>
            <td>
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
