'use strict';

const express = require('express');
const mongoose = require('mongoose');
const user = require('/models/user.js');
//require('dotenv').config(); 

//const jwt = require('jsonwebtoken');

//let payload = { username : User, isAdmin: false};
//let token = jwt.sign(payload, process.env.SECRET);

const app = express();

mongoose.connect('mongodb://localhost/face');

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});
