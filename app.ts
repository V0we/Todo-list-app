// Type definition for a task
interface Task  {
    id: string,
    content: string,
    status: "done" | "undone"
}

// Get DOM Elements
const taskInput = document.getElementById('taskInput') as HTMLInputElement;
const addTaskBtn = document.getElementById('addBtn') as HTMLButtonElement;
const taskList = document.querySelector('.taskList') as HTMLDivElement;
const clearListBtn = document.querySelector("#clearAll") as HTMLButtonElement;

// Function to get tasks from local storage
function getTasksFromLocalStorage(): Task[] {
    const tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}

// Function to save tasks to local storage
function saveTasksToLocalStorage(tasks: Task[] = []): void{
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

// Function to add a new task
function addTask(taskContent: string): void {
    if (taskContent === "") return;

    const tasks = getTasksFromLocalStorage();
    const newtask: Task = {
        id: Date.now().toString(),
        content: taskContent,
        status: 'undone'
    }

    tasks.push(newtask);
    saveTasksToLocalStorage(tasks);
    
    //rendertasks
    renderTasks();
}

// Function to remove a task
 function removeTask(taskId: string): void {
    const tasks = getTasksFromLocalStorage();
    const updatedTasks = tasks.filter(task => task.id !== taskId);
    saveTasksToLocalStorage(updatedTasks);

    //rendertasks
    renderTasks();
 }

 // Update a task status 
 function updateTaskStatus(taskId: string): void {
    const tasks = getTasksFromLocalStorage();
    // Loop through the tasks and find the index of the task to update
    for (let i = 0; i < tasks.length; i++) {
        if (tasks[i].id === taskId) {
            // Toggle the status
            tasks[i].status = tasks[i].status === 'done' ? 'undone' : 'done';
            break;
        }
    }
    // Save updated tasks to local storage
    saveTasksToLocalStorage(tasks);
    
    // Re-render the tasks
    renderTasks();
}
 
 // Function to render a single task
 function renderTask(task: Task): void {
    const li = document.createElement('li');
    if (task.status === 'done'){
        li.classList.add('taskCompleted');
    }
        
    // Create check icon based on status of the task
    const check = document.createElement('i');
    if (task.status === 'done'){
        check.classList.add('fa-regular', 'fa-circle-check');
    }
    else if ( task.status === 'undone'){
        check.classList.add('fa-regular', 'fa-circle');
    }
    // Add content
    const content = document.createElement('span');
    content.textContent = task.content;
    content.classList.add('taskContent');

    // Create delete button
    const delBtn = document.createElement('i');
    delBtn.classList.add('fa-solid', 'fa-trash');
    delBtn.addEventListener('click', () => removeTask(task.id))

    // Append to li
    li.appendChild(check);
    li.appendChild(content);
    li.appendChild(delBtn);

    // Event listener for li
    li.addEventListener('click', () => {
        updateTaskStatus(task.id);
    });

    // Append li to document
    taskList.appendChild(li);
 }

 // Function to Render all tasks
 function renderTasks(): void {
    taskList.innerHTML = "";
    const tasks: Task[] = getTasksFromLocalStorage();
    if ( tasks.length === 0) taskList.style.display = 'none';
    else taskList.style.display = 'block';
    tasks.forEach(renderTask);

    // Toggle the display of clearlist button
    tasks.length === 0 ? clearListBtn.style.display = 'none' : clearListBtn.style.display = 'block'; 
 }

 // Add event listener to add button
 addTaskBtn.addEventListener('click', () => {
    const inputValue: string = taskInput.value.trim();
    addTask(inputValue);
    taskInput.value = "";
 })

// Function to Clear list
function clearList() {
    saveTasksToLocalStorage();
    renderTasks();
};
clearListBtn.addEventListener('click', clearList);

 //Render tasks on page load
 window.addEventListener('load', renderTasks);

