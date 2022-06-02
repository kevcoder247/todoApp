const express = require('express');
// const { param } = require('express/lib/request');
const app = express();
const mongoose = require('mongoose')
// const methodOverride = require("method-override")
const todoTasks = require('./model/tasks')
const PORT = 3000;

//Test database=============================
const tasks = [ { _id:0, title: 'Go to the gym'}];

let count = 0;


// Database configuration
const DATABASE_URL = 'mongodb+srv://admin:abc321@todoapp.21go0yr.mongodb.net/todoApp?retryWrites=true&w=majority'
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
    // res.send({
    //     msg: 'Hello',
    //     user: {}
    // })
})

//DESTROY================================
app.delete('/', (req, res) => {
    //Add a method that removes the item from the database
    res.render('index.ejs', {tasks})
})

//Create========================
app.post('/', (req, res) => {
    const task = req.body;
    tasks.push({...task, _id: ++count})
    console.log(tasks);
    res.render('index.ejs', {tasks})
})

//Update====================================
app.get('/edit/:id', (req, res) => {
    res.render('edit.ejs', {task: tasks[req.params.id]});
})

//SHOW=====================================
app.get('/show/:id', (req, res) => {
    res.render('show.ejs', {task: tasks[req.params.id]})
})

//Make sure we are connected to the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})