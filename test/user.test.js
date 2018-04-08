'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const User = require('../models/userSchema.js');
// const multer = require('multer');
const request = require('superagent');
require('dotenv').config(); 
const APP_KEY = process.env.FACEAPI_KEY;
const APP_SECRET = process.env.FACEAPI_SECRET;
const userRouter = new express.Router();


const superagent = require('superagent');

// const PORT = process.env.PORT;
// const SERVER_URL = 'http://localhost:' + PORT;
// const SIGNUP_URL = SERVER_URL + '/api/signup';
// const SIGNIN_URL = SERVER_URL + '/api/signin';
let imageFile = './default-image.jpg'
function userParams() {
  return {
    username: 'facer' + Math.random(),
    password: 'facerPassword',
    photo = fs.readfile(imgFile)
  }
}

