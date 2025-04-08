import "./styles.css";
import { taskArray } from "./tasks";
import { Task } from "./tasks";
import { addNewTask } from "./tasks";
import { deleteTask } from "./tasks";
import { completeTask } from "./tasks";
import { uncompleteTask } from "./tasks";


addNewTask("testname","test description", "2025-03-25", "High", "My Tasks")
console.log(taskArray);