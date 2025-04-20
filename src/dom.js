import {
  completeTask,
  deleteTask,
  filterTasks,
  addNewTask,
  uncompleteTask,
} from "./tasks";
import { taskUrgency } from "./dates";
const content = document.getElementById("content");

function clearDOM() {
  while (content.childElementCount > 1) {
    content.removeChild(content.lastChild);
  }
}
export function updateDOM(filter) {
  clearDOM();
  let filteredTasks = filterTasks(filter);
  for (let i = 0; i < filteredTasks.length; i++) {
    const taskCard = document.createElement("div");
    taskCard.classList.add("taskCard");
    for (let prop in filteredTasks[i]) {
      let taskCardProperty = document.createElement("span");
      taskCardProperty.classList.add(prop);
      if (filteredTasks[i].completed === true) {
        taskCardProperty.classList.add("taskCompleted");
      }
      // adding class based on urgency from taskUrgency object
      if (prop === "dueDate") {
        if (filteredTasks[i].dateDifference < taskUrgency.high) {
          taskCardProperty.classList.add("highUrgency");
        } else if (filteredTasks[i].dateDifference > taskUrgency.medium) {
          taskCardProperty.classList.add("lowUrgency");
        } else {
          taskCardProperty.classList.add("mediumUrgency");
        }
        let taskCardText = document.createTextNode(filteredTasks[i][prop]);
        taskCardProperty.appendChild(taskCardText);
        taskCard.appendChild(taskCardProperty);
      } else if (prop === "Status") {
        const completeTaskBtn = document.createElement("button");
      } else {
        let taskCardText = document.createTextNode(filteredTasks[i][prop]);
        taskCardProperty.appendChild(taskCardText);

        taskCard.appendChild(taskCardProperty);
      }
    }
    // create edit, remove and complete buttons
    const index = filteredTasks[i].id;
    const cardBtns = document.createElement("div");
    cardBtns.id = "cardBtns"
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.id = "editBtn";
    editBtn.addEventListener("click", function (e) {
      console.log(index);
    });
    let completeBtn = document.createElement("button");
    completeBtn.id = "completeBtn";
    let status = filteredTasks[i].completed;
    if (status === true) {
      completeBtn.innerHTML = "Revert Completion";
    } else {
      completeBtn.innerHTML = "Complete";
    }
    completeBtn.addEventListener("click", function (e) {
      if (status) {
        uncompleteTask(index);
        updateDOM();
      } else {
        completeTask(index);
        updateDOM();
      }
    });

    let removeBtn = document.createElement("button");
    removeBtn.innerHTML = "Delete";
    removeBtn.id = "removeBtn";
    removeBtn.addEventListener("click", function (e) {
      console.log(index);
      deleteTask(index);
      updateDOM();
    });

    cardBtns.append(editBtn, completeBtn, removeBtn);
    taskCard.appendChild(cardBtns);
    content.appendChild(taskCard);
  }
}

//define dialog elements
const createTaskBtn = document.getElementById("createNewTaskhtml");
const dialog = document.getElementById("dialogFormTask");
const form = document.getElementById("newTaskForm")
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const newTaskBtn = document.getElementById("newTaskBtn");
// create new task button functionality
createTaskBtn.addEventListener("click", (e) => {
  dialog.showModal();
});
cancelTaskBtn.addEventListener("click", () => {
  dialog.close();
});
export function getRadioButtonValue() {
  if (document.getElementById("priorityHigh").checked) {
    return "High";
  } else if (document.getElementById("priorityMedium").checked) {
    return "Medium";
  } else if (document.getElementById("priorityLow").checked) {
    return "Low";
  } else {
    return "None";
  }
}
// define form inputs for validation purposes
const newTaskTitle = document.getElementById("title");
const newTaskDescription = document.getElementById("description");
const newTaskDate = document.getElementById("dueDate")
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask(
    newTaskTitle.value,
    newTaskDescription.value,
    newTaskDate.value,
    getRadioButtonValue(),
  );
  updateDOM();
  dialog.close();
});

const taskListButtons = document.getElementsByClassName("taskList");
for ( let i=0; i<taskListButtons.length; i++) {
  let button = taskListButtons[i];
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    updateDOM(value);
  })
};
const createListBtn = document.getElementById("createListBtn")
createListBtn.addEventListener("click", () => {
  console.log("Hello")
})
