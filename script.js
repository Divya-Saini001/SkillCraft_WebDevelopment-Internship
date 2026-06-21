const todoForm = document.getElementById('todo-form');
const taskInput = document.getElementById('task-input');
const taskDatetime = document.getElementById('task-datetime');
const taskList = document.getElementById('task-list');

let editMode = false;
let editElement = null;

// Handle Form Submit (Add or Edit Task)
todoForm.addEventListener('submit', function(e) {
    e.preventDefault();

    const text = taskInput.value.trim();
    const datetime = taskDatetime.value;

    if (!text || !datetime) return;

    // Format Date & Time for display
    const formattedDate = new Date(datetime).toLocaleString();

    if (editMode) {
        // Edit existing task
        editElement.querySelector('.task-text').textContent = text;
        editElement.querySelector('.task-time').textContent = `Due: ${formattedDate}`;
        
        // Reset Form and State
        document.getElementById('add-btn').textContent = 'Add Task';
        editMode = false;
        editElement = null;
    } else {
        // Create new task
        createTaskElement(text, formattedDate);
    }

    todoForm.reset();
});

// Function to Create Task Element
function createTaskElement(text, datetimeStr) {
    const li = document.createElement('li');
    li.className = 'task-item';

    li.innerHTML = `
        <div class="task-details">
            <span class="task-text">${text}</span>
            <span class="task-time">Due: ${datetimeStr}</span>
        </div>
        <div class="actions">
            <button class="complete-btn">✓</button>
            <button class="edit-btn">Edit</button>
            <button class="delete-btn">X</button>
        </div>
    `;

    // Complete Button Functionality
    li.querySelector('.complete-btn').addEventListener('click', function() {
        li.classList.toggle('completed');
    });

    // Delete Button Functionality
    li.querySelector('.delete-btn').addEventListener('click', function() {
        li.remove();
    });

    // Edit Button Functionality
    li.querySelector('.edit-btn').addEventListener('click', function() {
        taskInput.value = li.querySelector('.task-text').textContent;
        
        // Setup edit mode
        editMode = true;
        editElement = li;
        document.getElementById('add-btn').textContent = 'Update Task';
        taskInput.focus();
    });

    taskList.appendChild(li);
}