import { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import Styles from "./TodoList.module.css";
import { IoIosArrowForward } from "react-icons/io";

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

    useEffect(() => {
        document.addEventListener("keyup", (e) => {
            if (e.key === "/") {
                if (searchRef.current) {
                    searchRef.current.focus();
                }
            }
        });
    }, []);

    const search = () => {
        const query = searchRef?.current?.value.toLowerCase();
        if (query) {
            setTodoItems(
                items.filter((item) => {
                    return item.task.toLowerCase().includes(query)
                        ? item
                        : null;
                }),
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
                {TodoItems.map((item) => {
                    return item.finished ? null : (
                        <TodoItem key={item.id} finished={false}>
                            {item.task}
                        </TodoItem>
                    );
                })}
            </table>
            <div className={Styles.collapse}>
                <h4>Finished</h4>
                <span className={Styles.arrowIcon}>
                    <IoIosArrowForward></IoIosArrowForward>
                </span>
            </div>
            <table>
                {items.map((item) => {
                    return (
                        <TodoItem finished={true} key={item.id}>
                            {item.task}
                        </TodoItem>
                    );
                })}
            </table>
        </div>
    );
}

export default TodoList;
