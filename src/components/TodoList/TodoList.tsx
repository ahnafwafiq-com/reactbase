import TodoItem from "./TodoItem";
import Styles from "./TodoList.module.css";

interface Todo {
    id: string;
    task: string;
    finished: boolean;
    created: Date;
}

interface Props {
    items: Todo[];
}

function TodoList({ items }: Props) {
    return (
        <div className={Styles.todoList}>
            {items.map((item) => {
                return item.finished ? null : (
                    <TodoItem key={item.id} finished={false}>
                        {item.task}
                    </TodoItem>
                );
            })}
        </div>
    );
}

export default TodoList;
