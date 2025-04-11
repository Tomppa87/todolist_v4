import { filterTasks } from "./tasks";
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
        const completeTaskBtn = document.createElement("button")
      } else {
        let taskCardText = document.createTextNode(filteredTasks[i][prop]);
        taskCardProperty.appendChild(taskCardText);

        taskCard.appendChild(taskCardProperty);
      }
    } 
    // create edit, remove and complete buttons
    const index = filteredTasks[i].id
    const cardBtns = document.createElement("div");
    let editBtn = document.createElement("button"); 
    editBtn.innerHTML = "Edit"
    editBtn.id = "editBtn";
    editBtn.addEventListener("click", function(e) {
    console.log(index)
    
    });
    let completeBtn = document.createElement("button");
    completeBtn.innerHTML = "Complete"
    completeBtn.id = "completeBtn";
    completeBtn.addEventListener("click", function(e) {
    console.log(index)
      
    });
    let removeBtn = document.createElement("button") 
    removeBtn.innerHTML = "Delete";
    removeBtn.id = "removeBtn"
    removeBtn.addEventListener("click", function(e) {
    console.log(index)
      //removeTask(index)
    });
    cardBtns.append(editBtn, completeBtn, removeBtn)
    taskCard.appendChild(cardBtns)
    content.appendChild(taskCard);
  }
}
// create new task button functionality
const createTaskBtn = document.getElementById("createNewTaskhtml");
const dialog = document.getElementById("dialogFormTask");
const cancelTaskBtn = document.getElementById("cancelTaskBtn");
createTaskBtn.addEventListener("click", () => {
  dialog.showModal();
});
cancelTaskBtn.addEventListener("click", () => {
  console.log("hello")
  dialog.close();
})
