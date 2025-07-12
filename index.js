
import { DataAPIClient } from "@datastax/astra-db-ts";
import bodyParser from "body-parser";
import express from "express";
import mongoose from "mongoose";

const app = express();
const port = 3000;

// ✅ MongoDB Atlas Connection
mongoose.connect("mongodb+srv://rr9133238:sRSTRtEwA1YS4SNq@cluster0.ss2voqd.mongodb.net/?retryWrites=true&w=majority&appName=TodoList", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("✅ Connected to MongoDB Atlas");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});




// // ✅ Mongoose Schema
// const todoSchema = new mongoose.Schema({
//   title: String,
//   priority: String,
//   completed: Boolean,
// });

// const Todo = mongoose.model("Todo", todoSchema);

// // ✅ Middlewares
// app.set("view engine", "ejs");
// app.use(express.static("public"));
// app.use(bodyParser.urlencoded({ extended: true }));

// // ✅ Home Route - Show All / Filtered Tasks
// app.get("/", async (req, res) => {
//   const priority = req.query.priority;
//   const filter = priority ? { priority } : {};
//   const todos = await Todo.find(filter);
//   res.render("app", { todos });
// });

// // ✅ Add Task
// app.post("/add", async (req, res) => {
//   const { title, priority } = req.body;
//   if (!title.trim()) {
//     return res.send("<script>alert('Please enter a task.'); window.history.back();</script>");
//   }

//   await Todo.create({
//     title,
//     priority,
//     completed: false,
//   });

//   res.redirect("/");
// });

// // ✅ Delete Task
// app.post("/delete", async (req, res) => {
//   await Todo.findByIdAndDelete(req.body.id);
//   res.redirect("/");
// });

// // ✅ Edit Task
// app.post("/edit", async (req, res) => {
//   const { id, updatedTask, priority } = req.body;
//   await Todo.findByIdAndUpdate(id, {
//     title: updatedTask,
//     priority,
//   });
//   res.redirect("/");
// });

// // ✅ Toggle Completion
// app.post("/toggle", async (req, res) => {
//   const todo = await Todo.findById(req.body.id);
//   if (todo) {
//     todo.completed = !todo.completed;
//     await todo.save();
//   }
//   res.redirect("/");
// });

// // ✅ Start Server
// app.listen(port, () => {
//   console.log(`✅ Todo app running at http://localhost:${port}`);
// });



// ✅ Schema
const todoSchema = new mongoose.Schema({
  title: String,
  priority: String,
  completed: Boolean,
});

const Todo = mongoose.model("Todo", todoSchema);

// ✅ Middleware
app.set("view engine", "ejs");
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// ✅ Home
app.get("/", async (req, res) => {
  const priority = req.query.priority;
  const filter = priority ? { priority } : {};
  const todos = await Todo.find(filter);
  res.render("app", { todos, message: req.query.message });
});

// ✅ Add Task
app.post("/add", async (req, res) => {
  const { title, priority } = req.body;
  if (!title.trim()) {
    return res.send("<script>alert('Please enter a task.'); window.history.back();</script>");
  }

  await Todo.create({ title, priority, completed: false });
  res.redirect("/?message=added");
});

// ✅ Edit Task
app.post("/edit", async (req, res) => {
  const { id, updatedTask, priority } = req.body;
  await Todo.findByIdAndUpdate(id, {
    title: updatedTask,
    priority,
  });
  res.redirect("/?message=edited");
});

// ✅ Delete Task
app.post("/delete", async (req, res) => {
  await Todo.findByIdAndDelete(req.body.id);
  res.redirect("/?message=deleted");
});

// ✅ Toggle Completion
app.post("/toggle", async (req, res) => {
  const todo = await Todo.findById(req.body.id);
  if (todo) {
    todo.completed = !todo.completed;
    await todo.save();
  }
  res.redirect("/");
});

app.listen(port, () => console.log(`✅ Server running at http://localhost:${port}`));
