import "./styles.css";
import { saveTasks, taskArray } from "./tasks";
import { Task } from "./tasks";
import { addNewTask } from "./tasks";
import { deleteTask } from "./tasks";
import { completeTask } from "./tasks";
import { uncompleteTask } from "./tasks";
import { filterTasks } from "./tasks";
import { loadTasks } from "./tasks";
import { updateDOM, getRadioButtonValue } from "./dom";

loadTasks();
/*addNewTask("testname", "test description", "2025-03-25", "High","My Tasks");
addNewTask(
  "testname2",
  "test description 2",
  "2025-05-31",
  "Medium",
  "School Stuff",
);

saveTasks();*/
//loadTasks();
completeTask(taskArray[0].id)
console.log(taskArray);
filterTasks();
updateDOM();
