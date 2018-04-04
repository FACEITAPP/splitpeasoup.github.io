'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('..models/userSchema.js');
const jwt = require('jsonwebtoken');

const authRouter = express.Router();

authRouter.router('/signup')
  .get((req, res) => {
    User.find()
    .then(user => res.status(200).send(user))
    .catch(err => res.sendStatus(400).send(err));
  })

  .post((req, res) => {
    new User(req.body)
    .save()
    .then(user => res.status(200).send(user))
    .catch(err => res.status(400).send(err.message));
  })

  authRouter.router('/signin')
    .get((req, res) => {
      let authHeader = req.get('Authorization');
      if (!authHeader) {
        res.status(400).send('Please provide a username/password');
        return;
      }
      let payload = authHeader.split('Basic ')[1];
      let decoded = Buffer.from(payload, 'base64')
      .toString();
      let [username, password] = decoded.split(':');

      User.findOne({username: username})
      .then(user => {
        if (user === null) {
          res.send('user not found');
        };
        user.checkPassword(password)
        .then(isValid => {
          let payload = { userId: user._id };
          let token = jwt.sign(payload, proces.env.SECRET);
          res.send(token);
        })
        .catch(err => res.send(err));
      })
    });

    module.exports = authRouter;