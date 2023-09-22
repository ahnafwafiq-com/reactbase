/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useRef, useEffect } from "react";
import TodoItem from "./TodoItem";
import Styles from "./TodoList.module.css";
import { IoIosArrowForward } from "react-icons/io";
import {
    addDoc,
    collection,
    getDocs,
    getFirestore,
    query,
    serverTimestamp,
    where,
} from "firebase/firestore";
import app from "../../Firebase-config";
import { GrAdd } from "react-icons/gr";

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
    const newTodoRef = useRef<HTMLInputElement>(null);

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

    const updateList = (
        todoId: string,
        mode: "delete" | "finished" | "edit",
        newTodo?: string,
    ) => {
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
        } else if (mode === "edit") {
            if (newTodo) {
                tempTodoItems[index].task = newTodo;
            }
            setItems(tempTodoItems);
            setTodoItems(tempTodoItems);
            if (searchRef.current) {
                searchRef.current.value = "";
            }
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
            <div className={Styles.newTodo}>
                <form
                    onSubmit={async (e) => {
                        e.preventDefault();
                        const todosRef = collection(getFirestore(app), "todos");
                        const newTodo = newTodoRef?.current?.value;
                        if (newTodo) {
                            const todoRef = await addDoc(todosRef, {
                                name: newTodo,
                                collectionId: collectionId,
                                createdAt: serverTimestamp(),
                                updatedAt: serverTimestamp(),
                                finished: false,
                            });
                            setTodoItems([
                                {
                                    id: todoRef.id,
                                    task: newTodo,
                                    finished: false,
                                },
                                ...TodoItems,
                            ]);
                            setItems([
                                {
                                    id: todoRef.id,
                                    task: newTodo,
                                    finished: false,
                                },
                                ...TodoItems,
                            ]);
                            if (newTodoRef.current) {
                                newTodoRef.current.value = "";
                            }
                        }
                    }}
                >
                    <input
                        ref={newTodoRef}
                        type="text"
                        placeholder="Create new todo"
                    />
                    <button>
                        {" "}
                        <GrAdd /> Add
                    </button>
                </form>
            </div>
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
