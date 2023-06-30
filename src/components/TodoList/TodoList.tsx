import { useState, useRef } from "react";
import TodoItem from "./TodoItem";
import Styles from "./TodoList.module.css";
// import { getAuth } from "firebase/auth";
// import app from "../../Firebase-config";
// import { collection } from "firebase/firestore";
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
    const [TodoItems, setTodoItems] = useState(items);
    // const auth = getAuth(app);
    // auth.currentUser?.photoURL;
    const searchRef = useRef<HTMLInputElement>(null);

    document.addEventListener("keyup", (e) => {
        if (e.key === "/") {
            if (searchRef.current) {
                searchRef.current.focus();
            }
        }
    });

    const search = () => {
        const query = searchRef?.current?.value.toLowerCase();
        if (query) {
            setTodoItems(
                items.filter((item) => {
                    return item.task.toLowerCase().includes(query)
                        ? item
                        : null;
                })
            );
        }
    };
    return (
        <div className={Styles.todoList}>
            <input
                onChange={search}
                ref={searchRef}
                type="text"
                placeholder="Search for Todo:"
                name="searchTodo"
                className={Styles.searchbox}
            />
            <table>
                <tbody>
                    {TodoItems.map((item) => {
                        return item.finished ? null : (
                            <TodoItem key={item.id} finished={false}>
                                {item.task}
                            </TodoItem>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default TodoList;
