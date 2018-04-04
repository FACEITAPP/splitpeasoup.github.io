'use strict';

const express = require('express');
const User = require('../models/userSchema.js');
//require('dotenv').config();
//const APP_KEY = process.env.FACEAPI_KEY;
//const APP_ID = process.env.FACEAPI_ID;

const userRouter = express.Router();

//https://api-us.faceplusplus.com/facepp/v3/detect?api_key=`${APP_KEY}`api_secret=`${APP_ID}`image_url=https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/09/1442313353nasa-small.jpg

userRouter.route('/faces')
  .get((req, res) => {
    User.find({userId: req.user})
    .then(users => res.status(200).send(users))
    .catch(err => res.sendStatus(404).send(err));
  })

  .post((req, res) => {
    new User(req.body)
    .save()
    .then(user => res.status(200).send(user))
    .catch(err => res.status(500).send(err.message));
  })

  userRouter.route('/face/:id')
    .get((req, res) => {
      if (req.params.id) {
        return User.findById(req.params.id)
        .then(user => res.status(200).send(user))
        .catch(err => res.status(400).send(err.message));
      };
    })

    .put((req, res) => {
      let id = req.params.id;
      User.findByIdAndUpdate(id, req.body, {
        new: true
      })
      .then(user => res.status(204).send(user))
      .catch(err => res.status(400).send(err.message));
    })

    .delete((req, res) => {
      User.findByIdAndRemove(req.params.id)
      .then(user => {
        if (website.userId.toString() === req.user.id.toString()) {
          return user.remove();
        }
      })
      .then(() => res.status(200))
      .catch(err => res.status(500).send(err.message));
    })

module.exports = userRouter;