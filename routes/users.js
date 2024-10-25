const express = require("express");
const router = express.Router();
const users = require("../data/users.js");
const tasks = require("../data/tasks.js");
const comments = require("../data/comments.js");
const error = require("../utilities/error.js");

//////////////USERS//////////////
// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
router.get("/", (req, res, next) => {
  res.json({ users });
});

// Creating a simple GET route for individual users,
// using a route parameter for the unique id.
router.get("/:id", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  if (user) res.json({ user });
  else next(404, "User not found");
});

// Create User
router.post("/", (req, res, next) => {
  // Within the POST request route, we create a new
  // user with the data given by the client.
  // We should also do some more robust validation here,
  // but this is just an example for now.
  if (req.body.name && req.body.username && req.body.email) {
    const foundUser = users.find((u) => u.username === req.body.username);
    if (foundUser) {
      return next(error(400, "Username Already Taken"));
    }

    const user = {
      id: users[users.length - 1].id + 1,
      name: req.body.name,
      username: req.body.username,
      email: req.body.email,
    };

    users.push(user);
    res.json(user);
  } else {
    next(error(400, "Insufficient Data"));
  }
});

router.patch("/:id", (req, res, next) => {
  // Within the PATCH request route, we allow the client
  // to make changes to an existing user in the database.
  const user = users.find((u, i) => {
    if (u.id == req.params.id) {
      // req.body holds the update for the user
      for (const key in req.body) {
        // applying the req.body keys to the existing user keys, overwriting them
        users[i][key] = req.body[key];
      }
      return true;
    }
  });

  if (user) res.json(user);
  else next(error(404, "User not found"));
});

router.delete("/:id", (req, res, next) => {
  const userIndex = users.findIndex((u) => u.id == req.params.id);

  if (userIndex !== -1) {
    const deletedUser = users[userIndex];
    users.splice(userIndex, 1);
    res.json(deletedUser);
  } else {
    next(error(404, "User not found"));
  }
});

router.get("/:id/assignedtasks", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return next(error(404, "User not found"));
  const filteredTasks = tasks.filter((task) => {
    return task.assignedTo == user.id;
  });
  res.json(filteredTasks);
});

router.get("/:id/createdtasks", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return next(error(404, "User not found"));
  const filteredTasks = tasks.filter((task) => {
    return task.createdBy == user.id;
  });
  res.json(filteredTasks);
});

router.get("/:id/comments", (req, res, next) => {
  const user = users.find((u) => u.id == req.params.id);
  if (!user) return next(error(400, "User not found"));
  const filteredComments = comments.filter((c) => c.userId == req.params.id);
  res.json(filteredComments);
});

module.exports = router;
