// set up empty array to hold tasks
export let taskArray = [];

// class constructor for task creator with edit methods
export class Task {
    constructor(title, description, dueDate, priority, 
        listName, id) {
        this.title = title;
        this.description = description;
        this.dueDate = dueDate;
        this.priority = priority;
        this.listName = listName;
        this.completed = false
        this.id = id
        

    }
    get dateDifference() {
        console.log(differenceInDays(this.dueDate,date));
        return differenceInDays(this.dueDate,date)
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

export function addNewTask(title, description, dueDate, priority, 
                    listName) {
    let id = generateId();
    let newTask = new Task (title, description, dueDate, priority, 
        listName, id);
    taskArray.push(newTask);    
    
};
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
};
function findId(id) {
    for (let i = 0; i < taskArray.length; i++) {
        if (taskArray[i].id === id) {
            console.log(i)
            return i;
        }
    }
}

export function deleteTask(id) {
    taskArray.splice(findId(id), 1);
};
export function completeTask(id) {
    taskArray[findId(id)].completeTask();
};
export function uncompleteTask(id) {
    taskArray[findId(id)].uncompleteTask();
};