const express = require("express");
const path = require("path");

const app = express();

// Sets an initial port. We"ll use this later in our listener
var PORT = process.env.PORT || 8080;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("public"));

// HTML routes
app.get("/", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/index.html"));
});

app.get("/note", function(req, res) {
  res.sendFile(path.join(__dirname, "./public/notes.html"));
});

// API routes
// app.get("/api/notes", function(req, res) {
//     res.json("../db/bd.json");
//   });


// this will add a note to the json file
// app.post("/api/tables", function(req, res) {
//     if (tableData.length < 5) {
//       tableData.push(req.body);
//       res.json(true);
//     }
//     else {
//       waitListData.push(req.body);
//       res.json(false);
//     }
//   });




app.listen(PORT, function() {
  console.log("App listening on PORT: " + PORT);
});
