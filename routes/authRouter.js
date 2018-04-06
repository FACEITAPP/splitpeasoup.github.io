'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema.js');
let newUser = new User({username: 'Bob', password: 'dogs'});
console.log('newUser', newUser.checkPassword);
const jwt = require('jsonwebtoken');

const authRouter = new express.Router();

authRouter.route('/signup')

  .get((req, res) => {
    User.find()
    .then(user => res.status(200).send(user))
    .catch(err => res.sendStatus(400).send(err));
  })

  .post((req, res) => {
    new User(req.body)
    .save()
    .then(users => res.status(200).send(users))
    .catch(err => res.status(400).send(err.message));
  })

  authRouter.route('/signin')
    .get((req, res) => {
      let authHeader = req.get('Authorization');
      if (!authHeader) {
        res.status(400).send('Please provide a username/password');
        return;
      }
      console.log('header:', authHeader);
      let payload = authHeader.split('Basic ')[1];
      let decoded = Buffer.from(payload, 'base64')
      .toString();
      let [username, password] = decoded.split(':');

      User.findOne({username: username})
      .then(user => {
        console.dir('user', user);
        if (user === null) {
          res.send('user not found');
        };
        user.checkPassword(password)
        .then(token => {
          console.log('new token', token);
          res.send(token);
        })
        .catch(err => res.send(err));
      })
    });

    module.exports = authRouter;