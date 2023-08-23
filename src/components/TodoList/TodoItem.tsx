import Styles from "./TodoItem.module.css";
import { MdOutlineDelete } from "react-icons/md";
import { BiEditAlt, BiDotsVerticalRounded } from "react-icons/bi";

// Defining Interface for <TodoItem/> props
interface Props {
    finished: boolean;
    children: string;
}

function TodoItem({ children, finished }: Props) {
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
                    <input className={Styles.checkBox} type="checkbox" />
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
                <div className={Styles.deleteButton} title="Delete Todo">
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
