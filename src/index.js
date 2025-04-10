import "./styles.css";
import { saveTasks, taskArray } from "./tasks";
import { Task } from "./tasks";
import { addNewTask } from "./tasks";
import { deleteTask } from "./tasks";
import { completeTask } from "./tasks";
import { uncompleteTask } from "./tasks";
import { filterTasks } from "./tasks";
import { loadTasks } from "./tasks";
import { updateDOM } from "./dom";

loadTasks();
/*
addNewTask("testname", "test description", "2025-03-25", "High", "My Tasks");
addNewTask(
  "testname2",
  "test description 2",
  "2025-05-31",
  "Medium",
  "School Stuff",
);
saveTasks();*/
/*console.log(taskArray);


console.log(taskArray);*/
completeTask("3t2oke6");
filterTasks();
updateDOM();
