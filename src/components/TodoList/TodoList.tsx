import { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import Styles from "./TodoList.module.css";
import { IoIosArrowForward } from "react-icons/io";
// import { produce } from "immer";

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
        setTodoItems([]);
        if (query) {
            const searchedTodos: Todo[] = [];
            items.forEach((item) => {
                if (item.task.toLowerCase().includes(query)) {
                    searchedTodos.push(item);
                }
            });
            setTodoItems(searchedTodos);
        } else {
            setTodoItems(items);
        }
        console.log(TodoItems.length);
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
                        <TodoItem key={Math.random()} finished={item.finished}>
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
                {TodoItems.map((item) => {
                    return item.finished ? (
                        <TodoItem finished={item.finished} key={Math.random()}>
                            {item.task}
                        </TodoItem>
                    ) : null;
                })}
            </table>
        </div>
    );
}

export default TodoList;
