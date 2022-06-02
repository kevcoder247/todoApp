const express = require('express');
const app = express();
const mongoose = require('mongoose')
const todoTasks = require('./model/tasks')
const PORT = 3000;



//Routes
app.get('/', (req, res) => {
    res.render('index.ejs')
})



//Make sure we are connected to the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})