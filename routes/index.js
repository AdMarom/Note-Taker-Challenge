const express = require('express');

//Import modular routers for /notes
const noteRouter = require('./notes');

const app = express();

app.use('/notes', noteRouter);

module.exports = app;