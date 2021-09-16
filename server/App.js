const { Console } = require("console");
var express = require("express");
var app = express();
var cors = require("cors");
var mongoose = require("mongoose");
app.use(express.json());

var mongoDB =
  "mongodb+srv://ToDoApp:taisir@cluster0.g4xxb.mongodb.net/ToDoList?retryWrites=true&w=majority";

mongoose
  .connect(mongoDB, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("Connected to DB");
  })
  .catch((err) => {
    console.log(err);
  });
var Schema = mongoose.Schema;
var userDataSchema = new Schema({
  tasks: String,
});

var ToDoList = mongoose.model("ToDoList", userDataSchema, "ToDoList");

//Get the default connection
var db = mongoose.connection;

app.use(cors());

app.get("/tasks", cors(), (req, res, next) => {
  ToDoList.find({}).then((resp) => {
    console.log(resp[0]["tasks"]);
    res.send(resp[0]["tasks"]);
  });
});

app.post("/tasks", async (req, res, next) => {
  console.log(req.body);
  res.send({ message: "successfull" });
  var data = new ToDoList(req.body);
  var doc = await ToDoList.findById("6121294314cd38f696ceafa4");
  doc["tasks"] = JSON.stringify(req.body["tasks"]);
  await doc.save();
  console.log(doc);
});

app.delete("/tasks", async (req, res, next) => {
  let index = parseInt(req.headers.index);
  console.log(index);
  let doc1 = {};
  ToDoList.find({}).then(async (resp) => {
    console.log(resp[0]["tasks"]);
    doc1 = JSON.parse(resp[0]["tasks"]);
    let doc2 = {};

    console.log(delete doc1[index]);
    let arr = Object.values(doc1);
    console.log(arr);
    for (let i = 0; i < arr.length; i++) {
      doc2[i + 1] = arr[i];
    }
    console.log("delete: " + JSON.stringify(doc2));

    var doc = await ToDoList.findById("6121294314cd38f696ceafa4");
    doc["tasks"] = JSON.stringify(doc2);
    await doc.save();
  });
});

app.listen(5000, () => {
  console.log("Listening on port 5000");
});
