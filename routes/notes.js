//refer to https://expressjs.com/en/starter/basic-routing.html
//refer to https://expressjs.com/en/guide/routing.html

const notes = require('express').Router();
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils');
const { v4: uuidv4 } = require('uuid');

//GET Route for retrieving all notes
notes.get('/', (req, res) => {
    console.info(`${req.method} request recieved for notes`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
});

//POST Route for a new note
notes.post('/', (req, res) => {
    console.info(`${req.method} request recieved to add note`);
    console.log(req.body);

    const { title, text} = req.body;

    if (req.body) {
        const newNote = {
            title,
            text,
            id: uuidv4()
        };

        readAndAppend(newNote, './db/db.json');
        res.json('Note added successfully');
    } else {
        res.errored('Error adding note')
    }
});


//DELETE Note
notes.delete('/:id', (req, res) => {
    //get all notes from the db.json
    readFromFile('./db/db.json').then((data) => {
        let parsedData = JSON.parse(data)
        let filteredData = parsedData.filter(note => note.id != req.params.id )
        console.log(filteredData)
        writeToFile('./db/db.json', filteredData)
        res.json('Note deleted successfully');
    });
    //filter out notes not equal to incoming note
});


module.exports = notes;