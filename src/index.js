import "./styles.css";
import { saveTasks, taskArray, getTaskLists } from "./tasks";
import { Task } from "./tasks";
import { addNewTask } from "./tasks";
import { deleteTask } from "./tasks";
import { completeTask, editTask } from "./tasks";
import { uncompleteTask } from "./tasks";
import { filterTasks } from "./tasks";
import { loadTasks, removeTaskList } from "./tasks";
import { updateDOM, getRadioButtonValue } from "./dom";

loadTasks();
getTaskLists()

completeTask(taskArray[0].id);
console.log(taskArray);
filterTasks();
updateDOM();
//removeTaskList("Testing")
