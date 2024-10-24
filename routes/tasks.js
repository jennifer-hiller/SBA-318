const express = require("express");
const router = express.Router();
const users = require("../data/users");
const tasks = require("../data/tasks");
const comments = require("../data/comments");
const error = require("../utilities/error.js");

function getComments(id) {}

// get all tasks, or filter by querystring assignedTo or createdBy
router.get("/", (req, res, next) => {
  if (req.query.assignedTo) {
    const user = users.find((u) => u.id == req.query.assignedTo);
    if (!user) return next(error(400, "User not found"));
    const filteredTasks = tasks.filter((task) => {
      return task.assignedTo == user.id;
    });
    res.json(filteredTasks);
  } else if (req.query.createdBy) {
    const user = users.find((u) => u.id == req.query.createdBy);
    if (!user) return next(error(400, "User not found"));
    const filteredTasks = tasks.filter((task) => {
      return task.createdBy == user.id;
    });
    res.json(filteredTasks);
  } else {
    res.json(tasks);
  }
});

// get task by task ID
router.get("/:id", (req, res, next) => {
  const task = tasks.find((p) => p.id == req.params.id);
  const filteredComments = comments.filter(
    (comment) => comment.taskId == req.params.id
  );
  if (task) res.json({ task, comments: filteredComments });
  else next(error(404, "Task not found"));
});

// Create Task
router.post("/", (req, res, next) => {
  if (
    req.body.createdBy &&
    req.body.title &&
    req.body.description &&
    req.body.assignedTo
  ) {
    const date = new Date().toISOString();
    const task = {
      id: tasks[tasks.length - 1].id + 1,
      createdBy: req.body.createdBy,
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      status: "To Do",
      dateCreated: date,
      dateLastUpdated: date,
    };
    tasks.push(task);
    res.json(task);
  } else {
    next(error(400, "Insufficient Data"));
  }
});

// Update a task
router.patch("/:id", (req, res, next) => {
  const date = new Date().toISOString();
  let index;
  const task = tasks.find((t, i) => {
    if (req.params.id == t.id) {
      index = i;
      return true;
    }
  });
  if (!task) return next(error(404, "Task not found"));
  if (
    req.body.createdBy &&
    req.body.title &&
    req.body.description &&
    req.body.assignedTo &&
    req.body.status
  ) {
    const tsk = {
      ...task,
      title: req.body.title,
      description: req.body.description,
      assignedTo: req.body.assignedTo,
      status: req.body.status,
      dateLastUpdated: date,
    };
    tasks[index] = tsk;
    res.json(tsk);
  } else {
    next(error(400, "Insufficient Data"));
  }
});

router.delete("/:id", (req, res, next) => {
  const task = tasks.find((p, i) => {
    if (p.id == req.params.id) {
      tasks.splice(i, 1);
      return true;
    }
  });

  if (task) res.json(task);
  else next(error(404, "Task not found"));
});

module.exports = router;
