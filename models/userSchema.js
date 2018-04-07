
'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/face');

const Schema = mongoose.Schema;

const userSchema = Schema({
  username: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  facetoken: {
    type: String
  }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
