function createBubbles() {
  const bubbles = document.getElementById("bubbles");
  for (let i = 0; i < 25; i++) {
    let bubble = document.createElement("div");
    let size = Math.random() * 15 + 5 + "px";
    bubble.classList.add("bubble");
    bubble.style.width = size;
    bubble.style.height = size;
    bubble.style.left = Math.random() * 100 + "vw";
    bubble.style.animationDuration = (Math.random() * 10 + 5) + "s";
    bubbles.appendChild(bubble);
  }
}
createBubbles();

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";
  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `task-item ${task.priority.toLowerCase()}`;
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <span>
        ${task.text} - <small>${task.date || "No date"}</small>
      </span>
      <div class="flex gap-2">
        <button onclick="toggleComplete(${index})" class="text-green-400 hover:text-green-600">✔</button>
        <button onclick="editTask(${index})" class="text-yellow-400 hover:text-yellow-600">✏️</button>
        <button onclick="deleteTask(${index})" class="text-red-400 hover:text-red-600">✕</button>
      </div>
    `;
    taskList.appendChild(li);
  });
  updateProgress();
  saveTasks();
}

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const dateInput = document.getElementById("dateInput");
  const priorityInput = document.getElementById("priorityInput");

  if (taskInput.value.trim() === "") return;

  tasks.push({
    text: taskInput.value,
    date: dateInput.value,
    priority: priorityInput.value,
    completed: false
  });

  taskInput.value = "";
  dateInput.value = "";
  priorityInput.value = "Low";
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  renderTasks();
}

function editTask(index) {
  const newText = prompt("Edit task:", tasks[index].text);
  if (newText !== null && newText.trim() !== "") {
    tasks[index].text = newText;
    renderTasks();
  }
}

function updateProgress() {
  const completed = tasks.filter(t => t.completed).length;
  const total = tasks.length;
  const percent = total ? Math.round((completed / total) * 100) : 0;
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("progressText").innerText = percent + "% Completed";
}


renderTasks();
