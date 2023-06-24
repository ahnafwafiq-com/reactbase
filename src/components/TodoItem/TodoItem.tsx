import Styles from "./TodoItem.module.css";

// Defining Interface for <TodoItem/> props
interface Props {
    children: string;
}

function TodoItem({ children }: Props) {
    return (
        <div className={[Styles.todoItem, "todoItem"].join(" ")}>
            <input
                type="checkbox"
                name="todoChcked"
                className={[Styles.checkBox, "checkBox"].join(" ")}
            />
            <div className={[Styles.todoText, "todoText"].join(" ")}>
                {children}
            </div>
        </div>
    );
}

export default TodoItem;
