'use strict';

const express = require('express');
const User = require('../models/userSchema.js');
// const multer = require('multer');
const request = require('superagent');
require('dotenv').config(); 
const APP_KEY = process.env.FACEAPI_KEY;
const APP_SECRET = process.env.FACEAPI_SECRET;
const userRouter = new express.Router();

// const upload = multer({dest : '/face'})

// const image_url = "https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/09/1442313353nasa-small.jpg";
const FACE_TOKEN = "38df8830320f8aad58cdedb820788665";
const app_url = `https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=https://dab1nmslvvntp.cloudfront.net/wp-content/uploads/2015/09/1442313353nasa-small.jpg`;

userRouter.post('/faces',(req,res)=> {
  console.log(req.body);
  console.log('app_key', APP_KEY === undefined);
  console.log('username', req.body.username);
  console.log('password', req.body.password);

  request.post(app_url)
    .then(results => {
      console.log('hi');
      console.log('facetoken', results.body.faces[0].face_token);
      return results;
    // if (err) {
    //   console.log('err',err);
    // }
    // console.log('res',res);
    // done();then
    })
    .then((results)=> {
      return User.create({username: req.body.username, password: req.body.password, facetoken: results.body.faces[0].face_token});
    })
    .then((user) =>
    {
      console.log('then');
      res.status(200).send(user);
    } )
    .catch(err => {
      console.log('catch');
      res.sendStatus(404).send(err);
    });

});


// then(results => {
//   console.log(results.body)
// })
// 
//   .superagent.post(`https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_ID}&image_url=${results.picture}`
// ).then(result => console.log(result));




// userRouter.route('/facesplusplus').superagent.post(`https://api-us.faceplusplus.com/facepp/v3/face/setuserid?api_key=${APP_KEY}&api_secret=${APP_ID}&face_token=${FACE_TOKEN}&user_id=${USER_ID}`).then(result => res.send(result));


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
  });



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
  });

module.exports = userRouter;