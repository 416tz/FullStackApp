const { Console } = require("console");
var express = require("express");
var app = express();

app.get("/tasks", (req, res) => {
  let tasks = {
    1: "Do dishes",
    2: "Do homework",
    3: "Do laundry",
  };
  res.send(tasks);
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
