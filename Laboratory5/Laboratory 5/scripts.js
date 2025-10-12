// ✅ API URL
const API_URL = "http://localhost:8080/api/items";

// DOM elements
const itemForm = document.getElementById("item-form");
const nameInput = document.getElementById("name");
const descriptionInput = document.getElementById("description");
const itemIdInput = document.getElementById("item-id");
const messageBox = document.getElementById("message");
const tableBody = document.getElementById("items-body");
const emptyState = document.getElementById("empty-state");
const refreshBtn = document.getElementById("refresh");
const cancelBtn = document.getElementById("cancel-btn");
const searchInput = document.getElementById("search");

// 🟢 Load items on page load
window.addEventListener("DOMContentLoaded", () => loadTodos());

// 📝 Load todos from backend
async function loadTodos() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) throw new Error("Failed to fetch items");
    const todos = await response.json();
    renderTable(todos);
  } catch (err) {
    showMessage("Failed to load todos: " + err.message, true);
  }
}

// 💾 Create or Update todo
itemForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const title = nameInput.value.trim();
  const description = descriptionInput.value.trim();

  if (title === "") {
    showMessage("Title is required", true);
    return;
  }

  const id = itemIdInput.value;
  const todoData = { title, description, completed: false };

  try {
    let response;
    if (id) {
      // UPDATE
      response = await fetch(`${API_URL}/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) throw new Error("Failed to update");
      showMessage("Todo updated successfully!");
    } else {
      // CREATE
      response = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(todoData),
      });
      if (!response.ok) throw new Error("Failed to create");
      showMessage("Todo created successfully!");
    }

    itemForm.reset();
    itemIdInput.value = "";
    loadTodos();
  } catch (err) {
    showMessage("Error: " + err.message, true);
  }
});

// Refresh list
refreshBtn.addEventListener("click", loadTodos);

// Cancel edit
cancelBtn.addEventListener("click", () => {
  itemForm.reset();
  itemIdInput.value = "";
});

// 🧭 Search todos
searchInput.addEventListener("input", async (e) => {
  const query = e.target.value.toLowerCase();
  try {
    const response = await fetch(API_URL);
    const todos = await response.json();
    const filtered = todos.filter((todo) =>
      todo.title.toLowerCase().includes(query)
    );
    renderTable(filtered);
  } catch (err) {
    console.error(err);
  }
});

// Render table rows
function renderTable(todos) {
  tableBody.innerHTML = "";

  if (todos.length === 0) {
    emptyState.style.display = "block";
    return;
  }

  emptyState.style.display = "none";

  todos.forEach((todo) => {
    const tr = document.createElement("tr");

    tr.innerHTML = `
      <td>${todo.id}</td>
      <td>${todo.title}</td>
      <td>${todo.description || ''}</td>
      <td class="actions-col">
        <button onclick="editTodo(${todo.id}, '${escapeQuotes(todo.title)}',
        '${escapeQuotes(todo.description || '')}')">EDIT</button>
        <button onclick="deleteTodo(${todo.id})">DELETE</button>
      </td>
    `;

    tableBody.appendChild(tr);
  });
}

// Edit todo
function editTodo(id, title, description) {
  itemIdInput.value = id;
  nameInput.value = title;
  descriptionInput.value = description;
}

// Delete todo
async function deleteTodo(id) {
  if (!confirm("Are you sure you want to delete this item?")) return;

  try {
    const response = await fetch(`${API_URL}/${id}`, { method: "DELETE" });
    if (!response.ok) throw new Error("Failed to delete");
    showMessage("Todo deleted successfully!");
    loadTodos();
  } catch (err) {
    showMessage("Error deleting: " + err.message, true);
  }
}

// Show feedback message
function showMessage(text, isError = false) {
  messageBox.textContent = text;
  messageBox.className = "message " + (isError ? "error" : "success");
  messageBox.style.display = "block";
  setTimeout(() => {
    messageBox.style.display = "none";
  }, 3000);
}

// Helper to escape single quotes in strings for onclick attributes
function escapeQuotes(str) {
  return str.replace(/'/g, "\\'");
}
