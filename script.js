document.addEventListener('DOMContentLoaded', () => {
    const taskForm = document.getElementById('taskForm');
    const taskList = document.getElementById('taskList');
    const taskTitle = document.getElementById('taskTitle');
    const taskDescription = document.getElementById('taskDescription');

    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();

    taskForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const title = taskTitle.value;
        const description = taskDescription.value;

        if (title.trim() !== '') {
            tasks.push({ title, description, completed: false });
            saveTasks();
            renderTasks();
            taskTitle.value = '';
            taskDescription.value = '';
        }
    });

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach((task, index) => {
            const li = document.createElement('li');
            li.innerHTML = `
                <span class="${task.completed ? 'completed' : ''}">${task.title} - ${task.description}</span>
                <button onclick="deleteTask(${index})">Supprimer</button>
                <input type="checkbox" ${task.completed ? 'checked' : ''} onchange="toggleTask(${index})">
            `;
            taskList.appendChild(li);
        });
    }

    window.deleteTask = (index) => { // Déclarée dans le scope global pour être accessible depuis le HTML
        tasks.splice(index, 1);
        saveTasks();
        renderTasks();
    };

    window.toggleTask = (index) => {
        tasks[index].completed = !tasks[index].completed;
        saveTasks();
        renderTasks();
    };


    function saveTasks() {
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
});