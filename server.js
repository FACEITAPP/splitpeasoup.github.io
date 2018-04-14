'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');
const photoRouter = require('./routes/photoRouter.js');
const MONGODB_URI = process.env.MONGODB_URI;
const PORT = process.env.PORT;

const app = express();

app.use(express.static('frontendview'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/api', userRouter);
app.use('/api', authRouter);
app.use('/api', photoRouter);

const server = module.exports = {}
server.isOn = false;

server.start = () => {
  return new Promise((resolve, reject) => {
    if(server.isOn) return reject(new Error('Server Error. Server already running.'))
    server.http = app.listen(PORT, () => {
      console.log(`Listening on ${PORT}`)
      server.isOn = true
      mongoose.connect(MONGODB_URI)
      return resolve(server)
    })
  })
}
server.stop = () => {
  return new Promise((resolve, reject) => {
    if(!server.isOn) return reject(new Error('Server Error. Server already stopped.'))
    server.http.close(() => {
      server.isOn = false
      mongoose.disconnect()
      return resolve()
    })
  })
};