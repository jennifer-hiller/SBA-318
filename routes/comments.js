const express = require("express");
const router = express.Router();
const tasks = require("../data/tasks.js");
const users = require("../data/users.js");
const comments = require("../data/comments.js");
const error = require("../utilities/error.js");

router.get("/", (req, res, next) => {
  if (req.query.userId) {
    const user = users.find((u) => u.id == req.query.userId);
    if (!user) return next(error(400, "Cannot find user"));
    const filteredComments = comments.filter((comment) => {
      return comment.userId == user.id;
    });
    res.json(filteredComments);
  } else if (req.query.taskId) {
    const task = tasks.find((p) => p.id == req.query.taskId);
    if (!task) return next(error(400, "Cannot find task"));
    const filteredComments = comments.filter(
      (comment) => comment.taskId == task.id
    );
    res.json(filteredComments);
  } else {
    res.json(comments);
  }
});
// Create Comment
router.post("/", (req, res, next) => {
  // Within the task request route, we create a new
  // comment with the data given by the client.
  if (req.body.userId && req.body.taskId && req.body.content) {
    const user = users.find((u) => u.id == req.body.userId);
    if (!user) return next(error(400, "Cannot find user"));
    const task = tasks.find((task) => task.id == req.body.taskId);
    if (!task) return next(error(400, "Cannot find task"));
    const comment = {
      id: comments[comments.length - 1].id + 1,
      userId: req.body.userId,
      taskId: req.body.taskId,
      content: req.body.content,
    };
    comments.push(comment);
    res.json(comment);
  } else {
    next(error(400, "Insufficient Data"));
  }
});

router.get("/:id", (req, res, next) => {
  const comment = comments.find((c) => req.params.id == c.id);
  if (!comment) return next(error(400, "Cannot find comment"));
  res.json(comment);
});

router.patch("/:id", (req, res, next) => {
  const comment = comments.find((c, i) => {
    if (c.id == req.params.id) {
      // req.body holds the update for the comment
      for (const key in req.body) {
        // applying the req.body keys to the existing comment keys, overwriting them
        comments[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (comment) res.json(comment);
  else next(error(404, "Comment not found"));
});

router.delete("/:id", (req, res, next) => {
  const comment = comments.find((c, i) => {
    if (c.id == req.params.id) {
      comments.splice(i, 1);
      return true;
    }
  });

  if (comment) res.json(comment);
  else next(error(404, "Comment not found"));
});

module.exports = router;
