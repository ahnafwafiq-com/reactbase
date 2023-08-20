// Firebase Configuration
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCckYNHqLInz82avREypmhPf7U5crbxKuU",
    authDomain: "reactbase.ahnafwafiq.com",
    projectId: "reactbase-todo",
    storageBucket: "reactbase-todo.appspot.com",
    messagingSenderId: "768143232623",
    appId: "1:768143232623:web:a40e654ce12219115dc79a",
    measurementId: "G-9R2YW1CP1W",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const analytics = getAnalytics(app);
export default app;
