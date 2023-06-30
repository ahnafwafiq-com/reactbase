import "./App.css";
import "normalize.css";
import Error from "./components/Error";
import SocialIcons from "./components/SocialIcons";
import app from "./Firebase-config";
import TodoItem from "./components/TodoList/TodoItem";

import { getAnalytics } from "firebase/analytics";
// import {} from "firebase/firestore";
// import { getAuth } from "firebase/auth";
// import { useAuthState } from "react-firebase-hooks/auth";

getAnalytics(app);

function App() {
    // const auth = getAuth(app);
    // const [user] = useAuthState(auth);
    return (
        <>
            <Error code="36e7hsh">User already exists</Error>
            <TodoItem finished={false}>Hello Todo 1</TodoItem>
            <TodoItem finished={false}>Hello Todo 2</TodoItem>
            <TodoItem finished={true}>Hello Todo 3</TodoItem>
            <TodoItem finished={false}>Hello Todo 4</TodoItem>
            <TodoItem finished={true}>Hello Todo 6</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <TodoItem finished={false}>Hello Todo 7</TodoItem>
            <SocialIcons></SocialIcons>
        </>
    );
}

export default App;
