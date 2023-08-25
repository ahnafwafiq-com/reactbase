/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import Styles from "./TodoList.module.css";
import { IoIosArrowForward } from "react-icons/io";
import {
    collection,
    getDocs,
    getFirestore,
    query,
    where,
} from "firebase/firestore";
import app from "../../Firebase-config";

interface Todo {
    id: string;
    task: string;
    finished: boolean;
}
interface Props {
    collectionId: string;
}

function TodoList({ collectionId }: Props) {
    const [items, setItems] = useState<Todo[]>([]);
    const [TodoItems, setTodoItems] = useState<Todo[]>([]);
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

    useEffect(() => {
        // setItems([]);
        // setTodoItems([]);
        const db = getFirestore(app);
        const todosRef = collection(db, "todos");
        const q = query(todosRef, where("collectionId", "==", collectionId));
        getDocs(q).then((todosSnapshot) => {
            const tempTodoItems: Todo[] = [];
            todosSnapshot.forEach((todo) => {
                tempTodoItems.push({
                    id: todo.id,
                    task: todo.get("name"),
                    finished: todo.get("finished"),
                });
            });
            setItems(tempTodoItems);
            setTodoItems(tempTodoItems);
            if (searchRef.current) {
                searchRef.current.value = "";
            }
        });
    }, []);

    const updateList = (todoId: string, mode?: "delete" | "finished") => {
        const tempTodoItems = [...items];
        const index = items.findIndex((item) => item.id === todoId);
        if (mode === "delete") {
            if (index !== -1) {
                tempTodoItems.splice(index, 1);
                setItems(tempTodoItems);
                setTodoItems(tempTodoItems);
                if (searchRef.current) {
                    searchRef.current.value = "";
                }
                return;
            }
            return;
        } else if (mode === "finished") {
            tempTodoItems[index].finished = true;
            setItems(tempTodoItems);
            setTodoItems(tempTodoItems);
            if (searchRef.current) {
                searchRef.current.value = "";
            }
            return;
        }
    };

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
                        <TodoItem
                            todoId={item.id}
                            updateTodoList={updateList}
                            key={item.id}
                            finished={item.finished}
                        >
                            {item.task}
                        </TodoItem>
                    );
                })}
            </table>
            <div className={Styles.collapse}>
                <h4>Finished</h4>
                <span className={Styles.arrowIcon}>
                    <IoIosArrowForward />
                </span>
            </div>
            <table>
                {TodoItems.map((item) => {
                    return item.finished ? (
                        <TodoItem
                            todoId={item.id}
                            updateTodoList={updateList}
                            finished={item.finished}
                            key={item.id}
                        >
                            {item.task}
                        </TodoItem>
                    ) : null;
                })}
            </table>
        </div>
    );
}

export default TodoList;
