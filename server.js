const express = require('express');
const fs = require('fs');
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const PORT = process.env.PORT || 3001;

const app = express();

// Middleware for parsing JSON and urlencoded form data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static('public'));

// C - create
// R -- read
// U -- update 
// D -- delete

//create notes using app.post
app.post('/api/notes', (req, res) => {
  fs.readFile('./Develop/db/db.json', (err, data) => {
    if (err) throw err
    var allNotes = JSON.parse(data);
    var userNote = req.body;
    userNote.id = uuidv4();
    allNotes.push(userNote);
    fs.writeFile('./Develop/db/db.json', JSON.stringify(allNotes), (err, data) => {
      res.json(userNote);
    })
  })
})

//read the data
app.get('/api/notes', (req, res) => {
  fs.readFile('./Develop/db/db.json', (err, data) => {
    if (err) throw err
    var notes = JSON.parse(data);
    res.json(notes);
  });
});  

app.get('api/notes/:id', (req, res) =>{
  res.json(notes[req.params.id]);
});

//redirect back to home-page
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/Develop/public/index.html'));
});

app.listen(PORT, () => {
    console.log(`App listening on PORT: ${PORT}`);
});