import { filterTasks } from "./tasks";
const content = document.getElementById("content");

function clearDOM() {
    while (content.firstChild) {
        content.removeChild(content.firstChild);
    };
};
export function updateDOM(filter) {
    clearDOM();
    let filteredTasks = filterTasks(filter);
    for (let i = 0; i < filteredTasks.length; i++) {
        const taskCard = document.createElement("div")
        for (let prop in filteredTasks[i]) {
            let taskCardProperty = document.createElement("span");
            taskCardProperty.classList.add(prop)
            if (prop === "dueDate") {
                let taskCardText = document.createTextNode("Due date: "+filteredTasks[i][prop])
                taskCardProperty.appendChild(taskCardText)
                taskCard.appendChild(taskCardProperty)
            } else if (prop === "priority") {
                let taskCardText = document.createTextNode("Priority: " +filteredTasks[i][prop])
                taskCardProperty.appendChild(taskCardText)
                taskCard.appendChild(taskCardProperty)
            } else {
                let taskCardText = document.createTextNode(filteredTasks[i][prop])
                taskCardProperty.appendChild(taskCardText)
                
                taskCard.appendChild(taskCardProperty)
            }                 
        } content.appendChild(taskCard)
    }
}