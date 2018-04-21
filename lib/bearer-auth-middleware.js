'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js');

const addToken = function(req, res, next) {
  let authHeader = req.get('Authorization');
  let token = authHeader.split('Bearer ')[1];

  if 
 // // Retrieve the object from storage// is this how we can retrieve the object from local storage?
        // let retrievedObject = localStorage.getItem('savedToken');

        // console.log('retrievedObject: ', JSON.parse(retrievedObject));
  jwt.verify(token, process.env.SECRET, (err, decoded) => {
    if(err) { 
      res.send('bad token');
      return;
    }

    User.findOne({_id: decoded.userId})
      .then(user => {
        req.user = user;
        next();
      })
      .catch(err => res.send(err.message));
  });
};

module.exports = addToken;