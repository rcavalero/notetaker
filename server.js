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
// this assignd an Id to the note sent from the client and adds it to the db.json file
app.post("/api/notes", function(req, res) {
  let noteInfo = req.body;
  let newId = 0;
  if (notes.length<1) {
    newId = 1;
  } else {
    newId = notes.sort( 
      function(a, b) {
         return (b['id']) - (a['id']);
      }
      )[0]['id'] +1
    ;
  };

  let newNote = {
      id: newId,
      title: noteInfo.title,
      text: noteInfo.text
    };
  notes.sort(function(a, b) {return (a['id']) - (b['id'])});
  notes.push(newNote);
  fs.writeFile("./db/db.json", JSON.stringify(notes),function(err, data){
  if(err) console.log(err);});
   res.send(newNote);
});

// this deletes a note from the db.json file based on the Id passed over from the client
app.delete("/api/notes/:id", function(req, res) {
  let idToDelete = req.params.id;
  let noteToDelete = notes.find(note => note.id == idToDelete); 
  let indexToDelete = notes.indexOf(noteToDelete); 
  notes.splice(indexToDelete,1);
  fs.writeFile("./db/db.json", JSON.stringify(notes),function(err, data){
    if(err) console.log(err);});
  res.send(notes);
});



app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
