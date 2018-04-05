'use strict';

const jwt = require('jsonwebtoken');
const User = require('../models/userSchema.js');

const addToken = function(req, res, next){
  let authHeader = req.header.authorization;
  let token = authHeader.split('Bearer ')[1];

  jwt.verify(token, process.env.SECRET, (err, decoded)=>{
    console.log('decoded', decoded);
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