// Importing CSS files
import "./CSS/App.css";
import "normalize.css";

// Importing External Components
import Error from "./components/Error";
// import SocialIcons from "./components/SocialIcons";
import TodoList from "./components/TodoList";

// Importing Firebase features
import app from "./Firebase-config";
import { getAnalytics } from "firebase/analytics";
// import {} from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

getAnalytics(app);

interface Todo {
    id: string;
    task: string;
    finished: boolean;
    created: Date;
}

function App() {
    const TodoListProps: Todo[] = [];
    for (let i = 0; i <= 1000; i++) {
        TodoListProps.push({
            id: `${Math.random() * 100000000}`,
            task: `Task ${i} ${Math.random()}`,
            finished: Math.round(Math.random()) ? true : false,
            created: new Date(),
        });
    }
    // const auth = getAuth(app);
    // const [user] = useAuthState(auth);
    return (
        <>
            <Error code="36e7hsh">User already exists</Error>
            <TodoList items={TodoListProps} />
        </>
    );
}

export default App;
