// Seleccionar elementos principales del DOM
const taskInput = document.getElementById('task-input');
const addTaskBtn = document.getElementById('add-task-btn');
const taskList = document.getElementById('task-list');
const changeModeBtn = document.getElementById('change-mode-btn');

function changeMode() {
    const body = document.body;
    const isDarkMode = body.classList.contains('dark-mode');
    
    if (isDarkMode) {
        body.classList.remove('dark-mode');
        changeModeBtn.textContent = 'Modo Oscuro';
    } else {
        body.classList.add('dark-mode');
        changeModeBtn.textContent = 'Modo Claro';
    }
}

changeModeBtn.addEventListener('click', changeMode);

function createTaskElement(taskText) {

    const taskItem = document.createElement('li');
    taskItem.className = 'task-item';
    taskItem.textContent = taskText;
    
    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Eliminar';
    
    deleteBtn.addEventListener('click', function() {
        taskItem.remove();
        saveTasks();
    });
    
    taskItem.appendChild(deleteBtn);
    
    taskList.appendChild(taskItem);
    
    saveTasks();
}

function saveTasks() {
    
    const taskElements = document.querySelectorAll('.task-item');
    
    const tasks = [];
    taskElements.forEach(function(taskElement) {
        const taskText = taskElement.textContent.replace('Eliminar', '').trim();
        tasks.push(taskText);
    });
    
    localStorage.setItem('tasks', JSON.stringify(tasks));
}

addTaskBtn.addEventListener('click', function() {

    const taskText = taskInput.value.trim();
    
    if (taskText !== '') {
        createTaskElement(taskText);
        
        taskInput.value = '';
    }
});

function loadTasks() {
    const savedTasks = localStorage.getItem('tasks');
    
    if (savedTasks) {

        const tasks = JSON.parse(savedTasks);
        
        tasks.forEach(function(taskText) {
            createTaskElement(taskText);
        });
    }
}

loadTasks();
