const express = require("express");
const app = express();
const PORT = 3000;
const tasksRouter = require("./routes/tasks.js");
const usersRouter = require("./routes/users.js");
const commentsRouter = require("./routes/comments.js");
const users = require("./data/users.js");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json({ extended: true }));

// logging middleware to help us keep track of
// requests during testing!
app.use((req, res, next) => {
  const time = new Date();

  console.log(
    `-----
${time.toLocaleTimeString()}: Received a ${req.method} request to ${req.url}.`
  );
  if (Object.keys(req.body).length > 0) {
    console.log("Containing the data:");
    console.log(`${JSON.stringify(req.body)}`);
  }
  next();
});

const fs = require("fs");
app.set("views", "./views"); // specify the views directory
app.set("view engine", "ejs"); // register the template engine
app.use(express.static("./styles"));

app.get("/", (req, res) => {
  const options = { users };
  res.render("index", options);
});

app.use("/api/tasks", tasksRouter);
app.use("/api/users", usersRouter);
app.use("/api/comments", commentsRouter);

// 404 Error Handling Middleware
app.use((req, res, next) => {
  next(error(404, "Resource Not Found"));
});

// Custom 404 (not found) middleware.
// Since we place this last, it will only process
// if no other routes have already sent a response!
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Listening on: http://localhost:${PORT}`);
});
