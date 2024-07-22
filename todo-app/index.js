const express = require('express');
const fs = require('fs');
const app = express();
const PORT = 3000;

app.use(express.json());

// Function to read data from db.json
const readTodos = () => {
  const data = fs.readFileSync('db.json');
  return JSON.parse(data);
};

// Function to write data to db.json
const writeTodos = (data) => {
  fs.writeFileSync('db.json', JSON.stringify(data, null, 2));
};

// Get all todos
app.get('/todos', (req, res) => {
  const data = readTodos();
  res.json(data.todos);
});

// Add a new todo
app.post('/todos', (req, res) => {
  const data = readTodos();
  const newTodo = req.body;
  newTodo.id = data.todos.length ? data.todos[data.todos.length - 1].id + 1 : 1;
  data.todos.push(newTodo);
  writeTodos(data);
  res.status(201).json(newTodo);
});

// Update status of todos with even IDs
app.patch('/todos/even-status', (req, res) => {
  const data = readTodos();
  data.todos.forEach(todo => {
    if (todo.id % 2 === 0 && !todo.status) {
      todo.status = true;
    }
  });
  writeTodos(data);
  res.json(data.todos);
});

// Delete todos with status true
app.delete('/todos/true-status', (req, res) => {
  let data = readTodos();
  data.todos = data.todos.filter(todo => !todo.status);
  writeTodos(data);
  res.json(data.todos);
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
