import express from "express";
import bodyParser from "body-parser";
const app=express();
const port=3000;
app.set('view engine', 'ejs');
app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

let tasks = [];
let completedTasks = [];

app.get('/', (req, res) => {
  res.render('index', { tasks, completedTasks });
});

app.post('/addTask', (req, res) => {
  const newTask = req.body.title;
  tasks.push(newTask);
  res.redirect('/');
});

app.post('/completeTask', (req, res) => {
  const taskId = req.body.taskId;
  const task = tasks[taskId];
  completedTasks.push(task);
  tasks.splice(taskId, 1);
  res.redirect('/');
});

app.post('/clearCompleted', (req, res) => {
  completedTasks = [];
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});