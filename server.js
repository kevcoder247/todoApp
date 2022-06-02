const express = require('express');
const app = express();
const mongoose = require('mongoose')
const todoTasks = require('./model/tasks')
const PORT = 3000;

// Database configuration
const DATABASE_URL = 'mongodb+srv://admin:abc321@todoapp.21go0yr.mongodb.net/?retryWrites=true&w=majority'
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



//Routes
app.get('/', (req, res) => {
    res.render('index.ejs')
})



//Make sure we are connected to the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})