const express = require('express');
require('dotenv').config();

const app = express();
const mongoose = require('mongoose')
// const methodOverride = require("method-override")
const Tasks = require('./model/tasks')
const PORT = 3000;

//Link CSS========================================
app.use(express.static(__dirname + '/public'));



//Test database================================================
// const tasks = [ { _id:0, title: 'Go to the gym'}];
//track number of arrays in our test database
// let count = 0;


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

//INDEX==================================================>
app.get('/tasks', (req, res) => {
    Tasks.find({}, (error, allTasks) => {
        res.render('index.ejs', {
            tasks: allTasks,
        });
    });
});

//DESTROY================================
// app.post('/delete/:id', (req, res) => {
//     //Add a method that removes the item from the database
//     tasks.splice(req.params.id, 1)
//     console.log(tasks)
//     if(tasks.length < 1){
//         count = 0
//     }
//     res.redirect('/')
// })

//Create===================================
app.post('/tasks', (req, res) => {
    Tasks.create(req.body, (error, createdTask) => {
        res.redirect('/tasks')
    })
 })

// SAVE===============================
app.post('/edit/:id/save', (req, res) => {
    Tasks.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
          new: true,
        },
        (error, updatedTask) => {
          res.redirect('/tasks')
        }
      )
    })

//Update====================================
app.get('/edit/:id', (req, res) => {
    Tasks.findById(req.params.id,
        (error, task) => {
            res.render(`edit.ejs`, {
                task
            })
        }
    )
})

//SHOW=====================================
// app.get('/show/:id', (req, res) => {
//     res.render('show.ejs', {task: tasks[req.params.id]})
// })

//Make sure we are connected to the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})