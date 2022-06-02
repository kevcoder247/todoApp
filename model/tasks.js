//Require Mongoose inorder to create new schema
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

//Create New Schema
const TasksSchema = new Schema({
    title:{
        type: String,
        required: true
    }
})

const Tasks = mongoose.model('Tasks', TasksSchema);

//export schema so we can use it 
module.exports = Tasks;

