import "./styles.css";
import { saveTasks, taskArray } from "./tasks";
import { Task } from "./tasks";
import { addNewTask } from "./tasks";
import { deleteTask } from "./tasks";
import { completeTask, editTask } from "./tasks";
import { uncompleteTask } from "./tasks";
import { filterTasks } from "./tasks";
import { loadTasks } from "./tasks";
import { updateDOM, getRadioButtonValue } from "./dom";

loadTasks();

completeTask(taskArray[0].id);
console.log(taskArray);
filterTasks();
updateDOM();
