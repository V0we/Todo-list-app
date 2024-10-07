// Get DOM Elements
var taskInput = document.getElementById('taskInput');
var addTaskBtn = document.getElementById('addBtn');
var taskList = document.querySelector('.taskList');
var clearListBtn = document.querySelector("#clearAll");
// Function to get tasks from local storage
function getTasksFromLocalStorage() {
    var tasks = localStorage.getItem('tasks');
    return tasks ? JSON.parse(tasks) : [];
}
// Function to save tasks to local storage
function saveTasksToLocalStorage(tasks) {
    if (tasks === void 0) { tasks = []; }
    localStorage.setItem('tasks', JSON.stringify(tasks));
}
// Function to add a new task
function addTask(taskContent) {
    if (taskContent === "")
        return;
    var tasks = getTasksFromLocalStorage();
    var newtask = {
        id: Date.now().toString(),
        content: taskContent,
        status: 'undone'
    };
    tasks.push(newtask);
    saveTasksToLocalStorage(tasks);
    //rendertasks
    renderTasks();
}
// Function to remove a task
function removeTask(taskId) {
    var tasks = getTasksFromLocalStorage();
    var updatedTasks = tasks.filter(function (task) { return task.id !== taskId; });
    saveTasksToLocalStorage(updatedTasks);
    //rendertasks
    renderTasks();
}
// Update a task status 
function updateTaskStatus(taskId) {
    var tasks = getTasksFromLocalStorage();
    // Loop through the tasks and find the index of the task to update
    for (var i = 0; i < tasks.length; i++) {
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
function renderTask(task) {
    var li = document.createElement('li');
    if (task.status === 'done') {
        li.classList.add('taskCompleted');
    }
    // Create check icon based on status of the task
    var check = document.createElement('i');
    if (task.status === 'done') {
        check.classList.add('fa-regular', 'fa-circle-check');
    }
    else if (task.status === 'undone') {
        check.classList.add('fa-regular', 'fa-circle');
    }
    // Add content
    var content = document.createElement('span');
    content.textContent = task.content;
    content.classList.add('taskContent');
    // Create delete button
    var delBtn = document.createElement('i');
    delBtn.classList.add('fa-solid', 'fa-trash');
    delBtn.addEventListener('click', function () { return removeTask(task.id); });
    // Append to li
    li.appendChild(check);
    li.appendChild(content);
    li.appendChild(delBtn);
    // Event listener for li
    li.addEventListener('click', function () {
        updateTaskStatus(task.id);
    });
    // Append li to document
    taskList.appendChild(li);
}
// Function to Render all tasks
function renderTasks() {
    taskList.innerHTML = "";
    var tasks = getTasksFromLocalStorage();
    if (tasks.length === 0)
        taskList.style.display = 'none';
    else
        taskList.style.display = 'block';
    tasks.forEach(renderTask);
    // Toggle the display of clearlist button
    tasks.length === 0 ? clearListBtn.style.display = 'none' : clearListBtn.style.display = 'block';
}
// Add event listener to add button
addTaskBtn.addEventListener('click', function () {
    var inputValue = taskInput.value.trim();
    addTask(inputValue);
    taskInput.value = "";
});
// Function to Clear list
function clearList() {
    saveTasksToLocalStorage();
    renderTasks();
}
;
clearListBtn.addEventListener('click', clearList);
//Render tasks on page load
window.addEventListener('load', renderTasks);
