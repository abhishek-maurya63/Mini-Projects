let taskInput = document.getElementById("task-input");
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");
const all = document.getElementsByClassName("filter-btn")[0];
const active = document.getElementsByClassName("filter-btn")[1];
const completed = document.getElementsByClassName("filter-btn")[2];
const taskCount = document.getElementById("task-count");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

renderCard(tasks);

addTaskBtn.addEventListener("click", addTask);

function addTask() {
  let inpTxt = taskInput.value.trim();
  if (inpTxt === "") return;

  const task = {
    id: Date.now(),
    text: inpTxt,
    completed: false,
  };

  tasks.push(task);
  saveTask();
  renderCard(tasks);
  taskInput.value = ""; // Clear input after adding
}

function renderCard(taskArray) {
  taskList.innerHTML = "";
  let count = 0;
  taskArray.forEach((element) => {
    count++;
    taskCount.innerText = count+" task";
    let li = document.createElement("li");
    li.className =
      "flex justify-between items-center bg-gray-700 p-3 rounded-xl";

    let span = document.createElement("span");
    span.className =
      "flex-grow cursor-pointer text-gray-400 hover:text-indigo-300";
    if (element.completed) {
      span.classList.add("line-through");
      span.classList.add("text-gray-500");
    }
    span.innerText = element.text;

    let btn = document.createElement("button");
    btn.classList = "ml-4 text-red-400 hover:text-red-500";
    btn.innerText = "🗑️";
    btn.setAttribute("data-id", element.id);

    span.addEventListener("click", () => taskDone(element.id));
    li.appendChild(span);
    li.appendChild(btn);

    taskList.appendChild(li);
  });

}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Handle delete
taskList.addEventListener("click", (dets) => {
  if (dets.target.tagName === "BUTTON") {
    const id = parseInt(dets.target.getAttribute("data-id"));
    tasks = tasks.filter((task) => task.id !== id);
    saveTask();
    renderCard(tasks);
  }
});

function taskDone(id) {
  const index = tasks.findIndex((task) => task.id === id);
  if (index !== -1) {
    tasks[index].completed = !tasks[index].completed;
    saveTask();
    renderCard(tasks);
  }
}

// Filter buttons
completed.addEventListener("click", () => {
  let completedTasks = tasks.filter((task) => task.completed);
  renderCard(completedTasks);
});

active.addEventListener("click", () => {
  let activeTasks = tasks.filter((task) => !task.completed);
  renderCard(activeTasks);
});

all.addEventListener("click", () => {
  renderCard(tasks);
});
