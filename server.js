const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;

let todos = [];

app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// Home route
app.get("/", (req, res) => {
  const priority = req.query.priority;
  const filteredTodos = priority ? todos.filter(todo => todo.priority === priority) : todos;
  res.render("index", { todos: filteredTodos });
});

// Add task route
app.post("/add", (req, res) => {
  const { task, priority } = req.body;
  if (!task.trim()) {
    return res.send("<script>alert('Please enter a task.'); window.history.back();</script>");
  }

  // ✅ Correct placement with completed flag
  todos.push({ id: Date.now(), task, priority, completed: false });

  res.redirect("/");
});

// Delete task
app.post("/delete", (req, res) => {
  todos = todos.filter(todo => todo.id != req.body.id);
  res.redirect("/");
});

// Edit task
app.post("/edit", (req, res) => {
  const { id, updatedTask, priority } = req.body;
  const todo = todos.find(t => t.id == id);
  if (todo) {
    todo.task = updatedTask;
    todo.priority = priority;
  }
  res.redirect("/");
});

// Toggle completed status
app.post("/toggle", (req, res) => {
  const id = req.body.id;
  const todo = todos.find(t => t.id == id);
  if (todo) {
    todo.completed = !todo.completed;
  }
  res.redirect("/");
});

// Start server
app.listen(port, () => {
  console.log(`✅ Todo app running at http://localhost:${port}`);
});
