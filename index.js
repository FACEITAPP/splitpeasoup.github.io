'use strict';
require('dotenv').config(); 

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');
console.log(authRouter)

mongoose.connect(process.env.MONGODB_URI);

const app = express();
// app.use(express.static('lib'));

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({extended: true}));

// app.use('/api', authRouter);
// app.use('/api', userRouter);

app.get('/', (req, res) => {
  return res.sendStatus(200);
});

const PORT = process.env.PORT;

app.listen(PORT, () =>{
  console.log(`listening on ${PORT}`);
});
