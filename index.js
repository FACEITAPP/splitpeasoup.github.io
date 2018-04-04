'use strict';
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const User = require('./models/userSchema.js');
const userRouter = require('./routes/userRouter.js');

mongoose.connect('mongodb://localhost/face');

const app = express();
app.use(express.static('lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use('/api', userRouter);
app.use('/api', authRouter);

// User.create({name:'test'});

// app.get('/', (req, res) => {
//   res.sendFile('index.html');
// });

const PORT = process.env.PORT || 3000;

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});
