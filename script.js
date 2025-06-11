const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
const filterPriority = document.getElementById('filter-priority');
const filterStatus = document.getElementById('filter-status');

let tasks = [];

// Task object structure
function createTask(title, dueDate, priority) {
  return {
    id: Date.now(),
    title,
    dueDate,
    priority,
    completed: false
  };
}

// Render tasks to UI
function renderTasks() {
  taskList.innerHTML = '';

  const priorityFilter = filterPriority.value;
  const statusFilter = filterStatus.value;

  const filteredTasks = tasks.filter(task => {
    const matchPriority = priorityFilter === 'all' || task.priority === priorityFilter;
    const matchStatus = statusFilter === 'all' ||
      (statusFilter === 'completed' && task.completed) ||
      (statusFilter === 'pending' && !task.completed);
    return matchPriority && matchStatus;
  });

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li>No tasks found.</li>';
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const titleSpan = document.createElement('span');
    titleSpan.className = 'task-title';
    titleSpan.textContent = task.title;
    if (task.completed) {
      titleSpan.style.textDecoration = 'line-through';
      titleSpan.style.color = '#888';
    }

    const metaSpan = document.createElement('span');
    metaSpan.className = 'task-meta';
    metaSpan.textContent = `Due: ${task.dueDate || 'N/A'} | Priority: ${task.priority}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(titleSpan);
    li.appendChild(metaSpan);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

// Handle form submit
taskForm.addEventListener('submit', function (e) {
  e.preventDefault();
  const title = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (title) {
    const newTask = createTask(title, dueDate, priority);
    tasks.push(newTask);
    renderTasks();
    taskForm.reset();
  }
});

// Filters
filterPriority.addEventListener('change', renderTasks);
filterStatus.addEventListener('change', renderTasks);

// Initial render
renderTasks();
