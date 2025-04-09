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
          console.log("low");
          taskCardProperty.classList.add("lowUrgency");
        } else {
          taskCardProperty.classList.add("mediumUrgency");
        }
        let taskCardText = document.createTextNode(filteredTasks[i][prop]);
        taskCardProperty.appendChild(taskCardText);
        taskCard.appendChild(taskCardProperty);
      } else {
        let taskCardText = document.createTextNode(filteredTasks[i][prop]);
        taskCardProperty.appendChild(taskCardText);

        taskCard.appendChild(taskCardProperty);
      }
    }
    content.appendChild(taskCard);
  }
}
