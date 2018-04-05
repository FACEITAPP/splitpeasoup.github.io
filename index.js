'use strict';

const express = require('express');
const mongoose = require('mongoose');

//require('dotenv').config(); 

//const jwt = require('jsonwebtoken');

//let payload = { username : User, isAdmin: false};
//let token = jwt.sign(payload, process.env.SECRET);

const bodyParser = require('body-parser');
const User = require('./models/userSchema.js');
const userRouter = require('./routes/userRouter.js');

mongoose.connect('mongodb://localhost/face');


const app = express();

app.use(express.static('lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', userRouter);


const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});
