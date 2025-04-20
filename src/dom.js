import {
  completeTask,
  deleteTask,
  filterTasks,
  addNewTask,
  uncompleteTask,
  createTaskList,
  getTaskLists,
  saveTaskLists,
  taskLists,
  editTask
} from "./tasks";
import { taskUrgency } from "./dates";
const content = document.getElementById("content");
const editDialog = document.getElementById("editTask");
let cancelEdit = document.getElementById("cancelEdit");
let confirmBtn = document.getElementById("confirmBtn")

function clearDOM() {
  while (content.childElementCount > 1) {
    content.removeChild(content.lastChild);
  }
}
export function updateDOM(filter) {
  clearDOM();
  updateTaskListDOM();
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
    cardBtns.id = "cardBtns";
    let editBtn = document.createElement("button");
    editBtn.innerHTML = "Edit";
    editBtn.id = "editBtn";
    editBtn.addEventListener("click", function (e) {
      const editTitle = document.getElementById("editTitle");
      const editDescription = document.getElementById("editDescription");
      const editDueDate = document.getElementById("editDueDate");
      const editTo_do_list = document.getElementById("editTo_do_list")
      function editGetRadioButtonValue() {
        if (document.getElementById("priorityHigh").checked) {
          return "High";
        } else if (document.getElementById("priorityMedium").checked) {
          return "Medium";
        } else if (document.getElementById("priorityLow").checked) {
          return "Low";
        } else {
          return "None";
        }
      };
      confirmBtn.addEventListener("click", () => {
        console.log("Hello");
        editTask(index, editTitle.value, 
          editDescription.value, 
          editDueDate.value, editGetRadioButtonValue(),editTo_do_list.value);
          updateDOM();
          editDialog.close();
          dropDownEmpty();
      })
      cancelEdit.addEventListener("click", () => {
        console.log("Bye");
        editDialog.close();
        dropDownEmpty();
      })
      populateDropDown()
      editDialog.showModal();
      console.log(index);
      //editTask()
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
const form = document.getElementById("newTaskForm");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
const newTaskBtn = document.getElementById("newTaskBtn");
// create new task button functionality
createTaskBtn.addEventListener("click", (e) => {
  dialog.showModal();
  populateDropDown()
});
cancelTaskBtn.addEventListener("click", () => {
  dialog.close();
  dropDownEmpty()
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
};
const select = document.getElementById("to_do_list");
const editselect = document.getElementById("editTo_do_list")
function populateDropDown() {
  for (let i=0; i<taskLists.length; i++) {
    let option = taskLists[i];
    let element = document.createElement("option");
    element.textContent = option;
    element.value = option;
    select.appendChild(element);
    editselect.appendChild(element)
  };
};
function dropDownEmpty() {
  while (select.firstChild) {
      select.removeChild(select.firstChild)
  };
  while (editselect.firstChild) {
    editselect.removeChild(editselect.firstChild)
}
}
// define form inputs for validation purposes
const newTaskTitle = document.getElementById("title");
const newTaskDescription = document.getElementById("description");
const newTaskDate = document.getElementById("dueDate");
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addNewTask(
    newTaskTitle.value,
    newTaskDescription.value,
    newTaskDate.value,
    getRadioButtonValue(),
  );
  updateDOM();
  dropDownEmpty();
  dialog.close();
});

const taskListButtons = document.getElementsByClassName("taskList");
for (let i = 0; i < taskListButtons.length; i++) {
  let button = taskListButtons[i];
  button.addEventListener("click", (e) => {
    let value = e.target.innerHTML;
    updateDOM(value);
  });
}
const taskListDialog = document.getElementById("TaskListDialog");
const taskListBtn = document.getElementById("taskListBtn");
const taskListDiv = document.getElementById("taskLists");

function updateTaskListDOM() {
  while (taskListDiv.childElementCount >= 1) {
    taskListDiv.removeChild(taskListDiv.lastChild);
  }
  getTaskLists();
  for (let i = 0; i < taskLists.length; i++) {
    const sidebar = document.createElement("div");
    sidebar.classList.add("sidebarOption");
    sidebar.classList.add("taskList");
    sidebar.innerHTML = taskLists[i];
    sidebar.addEventListener("click", (e) => {
      let value = e.target.innerHTML;
      updateDOM(value);
    });
    taskListDiv.appendChild(sidebar);
  }
}
const createListBtn = document.getElementById("createListBtn");
createListBtn.addEventListener("click", () => {
  console.log("Hello");
  taskListDialog.showModal();
});
taskListBtn.addEventListener("click", () => {
  const taskListInput = document.getElementById("taskListInput");
  createTaskList(taskListInput.value);
  updateTaskListDOM();
});
