'use strict';

const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/face');

const Schema = mongoose.Schema;

const userSchema = Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: true
  },
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
