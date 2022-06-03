const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose')
// const methodOverride = require("method-override")
const todoTasks = require('./model/tasks')
const PORT = 3000;

//Link CSS========================================
app.use(express.static(__dirname + '/public'));

//Test database=============================
const tasks = [ { _id:0, title: 'Go to the gym'}];
//track number of arrays in our test database
let count = 0;


// Database configuration
const DATABASE_URL = process.env.MONGO_CONNECTION
const db = mongoose.connection;

// Connect to MongoDB Atlas
mongoose.connect(DATABASE_URL, {
	useNewUrlParser: true,
	useUnifiedTopology: true,
});

// Database Connection Error/Success
// Define callback functions for various events
db.on('error', (err) => console.log(err.message + ' is mongod not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

//JSON MIDDLEWARE==============================
app.use(express.json())
//MIDDLEWARE===================================
app.use(express.urlencoded({ extended: false }))


//Mount Routes==============================
//INDEX (list everything)
app.get('/', (req, res) => {
    res.render('index.ejs', {tasks})
})

//DESTROY================================
app.post('/delete/:id', (req, res) => {
    //Add a method that removes the item from the database
    tasks.splice(req.params.id, 1)
    console.log(tasks)
    if(tasks.length < 1){
        count = 0
    }
    res.redirect('/')
})

//Create========================
app.post('/', (req, res) => {
    const task = req.body;
    tasks.push({...task, _id: ++count})
    console.log(tasks);
    res.redirect('/')
 })

//Update====================================
app.get('/edit/:id', (req, res) => {
    res.render('edit.ejs', {task: tasks[req.params.id]});
})

//SAVE===============================
app.post('/edit/:id/save', (req, res) => {
    const task = req.body;
    console.log(task)
    tasks[task._id] = task;
    res.redirect('/')//figure out how to update the array with the given body
    
})

//SHOW=====================================
app.get('/show/:id', (req, res) => {
    res.render('show.ejs', {task: tasks[req.params.id]})
})

//Make sure we are connected to the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})