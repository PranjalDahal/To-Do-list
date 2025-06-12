const taskForm = document.getElementById('task-form');
const taskInput = document.getElementById('task-input');
const dueDateInput = document.getElementById('due-date');
const priorityInput = document.getElementById('priority');
const taskList = document.getElementById('task-list');
const filterPriority = document.getElementById('priority-filter');

let tasks = [];

function createTask(title, dueDate, priority) {
  return {
    id: Date.now(),
    title,
    dueDate,
    priority,
    completed: false
  };
}

function renderTasks() {
  taskList.innerHTML = '';
  const selectedPriority = filterPriority.value;

  const filteredTasks = tasks.filter(task =>
    selectedPriority === 'all' || task.priority === selectedPriority
  );

  if (filteredTasks.length === 0) {
    taskList.innerHTML = '<li>No tasks found.</li>';
    return;
  }

  filteredTasks.forEach(task => {
    const li = document.createElement('li');
    li.className = 'task-item';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', () => {
      task.completed = checkbox.checked;
      renderTasks();
    });

    const title = document.createElement('span');
    title.className = 'task-title';
    title.textContent = task.title;
    if (task.completed) {
      title.style.textDecoration = 'line-through';
      title.style.color = '#888';
    }

    const meta = document.createElement('span');
    meta.className = 'task-meta';
    meta.textContent = `Due: ${task.dueDate || 'N/A'} | Priority: ${task.priority}`;

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-task';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => {
      tasks = tasks.filter(t => t.id !== task.id);
      renderTasks();
    });

    li.appendChild(checkbox);
    li.appendChild(title);
    li.appendChild(meta);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

taskForm.addEventListener('submit', e => {
  e.preventDefault();

  const title = taskInput.value.trim();
  const dueDate = dueDateInput.value;
  const priority = priorityInput.value;

  if (!title) return;

  const newTask = createTask(title, dueDate, priority);
  tasks.push(newTask);
  renderTasks();
  taskForm.reset();
});

filterPriority.addEventListener('change', renderTasks);

renderTasks();
