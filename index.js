'use strict';

const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/schema.js');

const PORT = process.env.PORT || 3000;

const app = express();
app.use(express.static('lib'));

mongoose.connect('mongodb://localhost/face');

// User.create({name:'test'});

app.get('/', (req, res) => {
  res.sendFile('index.html');
});

// app.post('/api/face', (req, res) => {

// });

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});
