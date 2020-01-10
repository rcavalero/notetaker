const express = require("express");
const path = require("path");
const notes = require("./db/db.json");
const fs = require("fs");

const app = express();

var PORT = process.env.PORT || 8080;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));

});

// API routes
app.get("/api/notes", function(req, res) {
  res.sendFile(path.join(__dirname, "./db/db.json"));

});

// POST Requests
// this adds a note to the db.json file
app.post("/api/notes", function(req, res) {
  let newNote = req.body;
  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes),function(err, data){
  if(err) console.log(err);});
  res.send(newNote);
});


app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
