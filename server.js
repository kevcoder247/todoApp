const express = require('express');
const app = express();
const mongoose = require('mongoose')
const PORT = 3000;



//Routes
app.get('/', (req, res) => {
    res.send('Index is working')
})



//Make sure we are connected to the server
app.listen(PORT, () => {
    console.log(`listening on ${PORT}`)
})