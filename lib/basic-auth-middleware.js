'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js');

const basicAuth = function(req, res, next) {
  let authHeader = req.get('Authorization');
  let payload = authHeader.split('Basic ')[1];
  let decoded = Buffer.from(payload, 'base64').toString();
  let [username, password] = decoded.split(':');

  if (!username || !password) {
    res.status(400);
    let msg = 'username and password required to create an account';
    console.log('signin error:', {msg});
    res.send(msg);
    return;
  }
  User.findOne({username: username})
  .then(user => {
    if (user === null) {
      res.send({msg:'user not found'});
      return;
    }
    return user.checkPassword(password)
  })
  .then(user => {
    req.user = user;
    next();
  })
  .catch(err => res.status(401).send({msg:err.message}));
};

module.exports = basicAuth;