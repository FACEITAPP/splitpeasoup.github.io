'use strict';

const mongoose = require('mongoose');
mongoose.connect(process.env.MONGODB_URI);

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
  // facetoken: {

  // }
});

const User = mongoose.model('User', userSchema);

module.exports = User;
