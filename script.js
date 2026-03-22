let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function renderTasks() {
    let list = document.getElementById("taskList");
    list.innerHTML = "";

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        let span = document.createElement("span");
        span.textContent = task.text;

        if (task.completed) {
            span.classList.add("completed");
        }

        span.onclick = () => {
            tasks[index].completed = !tasks[index].completed;
            saveTasks();
        };

        let delBtn = document.createElement("button");
        delBtn.textContent = "X";
        delBtn.className = "deleteBtn";

        delBtn.onclick = () => {
            tasks.splice(index, 1);
            saveTasks();
        };

        li.appendChild(span);
        li.appendChild(delBtn);
        list.appendChild(li);
    });

    document.getElementById("taskCount").textContent =
        "Total Tasks: " + tasks.length;
}

function addTask() {
    let input = document.getElementById("taskInput");
    let text = input.value.trim();

    if (text === "") return;

    tasks.push({ text: text, completed: false });
    input.value = "";

    saveTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
    renderTasks();
}

// Enter key support
document.getElementById("taskInput").addEventListener("keypress", function (e) {
    if (e.key === "Enter") addTask();
});

// Load tasks on start
renderTasks();
function toggleDarkMode() {
    document.body.classList.toggle("dark");

    // Save mode in localStorage
    if (document.body.classList.contains("dark")) {
        localStorage.setItem("theme", "dark");
    } else {
        localStorage.setItem("theme", "light");
    }
}
// Load saved theme
if (localStorage.getItem("theme") === "dark") {
    document.body.classList.add("dark");
}