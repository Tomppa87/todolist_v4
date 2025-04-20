import { daysBetweenDueDate } from "./dates";
import { date } from "./dates";
// set up empty array to hold tasks
export let taskArray = [];

// class constructor for task creator with edit methods
export class Task {
  constructor(title, description, dueDate, priority, listName, completed, id) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.listName = listName;
    this.completed = completed;
    this.id = id;
  }
  get dateDifference() {
    return daysBetweenDueDate(this.dueDate, date);
  }
  toJSON() {
    return {
      title: this.title,
      description: this.description,
      dueDate: this.dueDate,
      priority: this.priority,
      listName: this.listName,
      completed: this.completed,
      id: this.id,
    };
  }
  completeTask() {
    this.completed = true;
  }
  uncompleteTask() {
    this.completed = false;
  }
  editTask(title, description, dueDate, priority, listName) {
    this.title = title;
    this.description = description;
    this.dueDate = dueDate;
    this.priority = priority;
    this.listName = listName;
  }
}

export function addNewTask(
  title,
  description,
  dueDate,
  priority,
  listName = "My Tasks",
  completed = false,
) {
  let id = generateId();
  let newTask = new Task(
    title,
    description,
    dueDate,
    priority,
    listName,
    completed,
    id,
  );
  taskArray.push(newTask);
  saveTasks();
  loadTasks();
}
// function to generate unique id for each task
function generateId() {
  let id;
  let idExists;
  do {
    id = Math.random().toString(36).substring(2, 9);
    for (let i = 0; i < taskArray.length; i++) {
      if (taskArray[i].id === id) {
        idExists = true;
      } else {
        idExists = false;
        break;
      }
    }
  } while (idExists);
  return id;
}
function findId(id) {
  for (let i = 0; i < taskArray.length; i++) {
    if (taskArray[i].id === id) {
      console.log(i);
      return i;
    }
  }
}

export function deleteTask(id) {
  taskArray.splice(findId(id), 1);
  saveTasks();
  loadTasks();
}
export function completeTask(id) {
  taskArray[findId(id)].completeTask();
  taskArray[findId(id)].listName = "Completed Tasks"
  saveTasks();
  loadTasks();
}
export function uncompleteTask(id) {
  taskArray[findId(id)].uncompleteTask();
  taskArray[findId(id)].listName = "My Tasks"
  saveTasks();
  loadTasks();
}
export function editTask(id, title, description, dueDate, priority, listName) {
  taskArray[findId(id)].editTask(title,description, dueDate, priority, listName);  
  saveTasks();
  loadTasks();
}

export function filterTasks(listName) {
  if (listName === "My Tasks" || listName === undefined) {
    return taskArray;
  } else {
    let filteredTasks = taskArray.filter((task) => task.listName === listName);
    return filteredTasks;
  }
}
export function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(taskArray));
}
export function loadTasks() {
  const savedTasks = localStorage.getItem("tasks");
  const parsedTasks = JSON.parse(savedTasks);
  if (savedTasks) {
    const restoredTasks = parsedTasks.map(
      (taskdata) =>
        new Task(
          taskdata.title,
          taskdata.description,
          taskdata.dueDate,
          taskdata.priority,
          taskdata.listName,
          taskdata.completed,
          taskdata.id,
        ),
    );
    taskArray = restoredTasks;
  }
};
taskLists = [];
