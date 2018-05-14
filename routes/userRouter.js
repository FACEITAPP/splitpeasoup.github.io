
'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const User = require('../models/userSchema.js');
const Photo = require('../models/photoSchema.js');
const request = require('superagent');
const APP_KEY = process.env.FACEAPI_KEY;
const APP_SECRET = process.env.FACEAPI_SECRET;
const userRouter = new express.Router();
const jwt = require('jsonwebtoken');
const bearerAuth = require('../lib/bearer-auth-middleware.js');
const authRouter = require('../routes/authRouter.js');
const apiError = require('../lib/api-error-handler.js')
const path = require('path');
const fs = require('fs');
const multer = require('multer');
const upload = multer({
	dest: './uploads/'
});
const AWS = require('aws-sdk');
const s3 = new AWS.S3();

userRouter.route('/faces')
	.get(bearerAuth, (req, res) => {
		User.find({
			_id: req.user._id
		})
			.then(users => res.status(200).send(users))
			.catch(err => res.sendStatus(404).send(err.message));
  });
  

userRouter.route('/signup')
	.post(upload.single('photo'), (req, res) => { 
    let authHeader = req.get('Authorization');
    let payload = authHeader.split('Basic ')[1];
    let decoded = Buffer.from(payload, 'base64').toString();
    let [username, password] = decoded.split(':');
    console.log('username upper', username);
  
    if (!username || !password) {
      res.status(400);
      let msg = 'username and password required to create an account';
      console.log('signin error:', {msg});
      res.send(msg);
      return;
    }

		// let ext = path.extname(req.file.originalname);
		// let params = {
		// 	ACL: 'public-read',
		// 	Bucket: process.env.AWS_BUCKET,
		// 	Key: `${req.file.filename}${ext}`,
		// 	Body: fs.createReadStream(req.file.path)
		// };
		let url ='https://faceit-app.s3.amazonaws.com/1e1e36df4f1ef0d181640aac64c7f369.jpg';
		let photoDb;
		new Promise((resolve, reject) => {
			// s3.upload(params, (err, s3Data) => {
			// 	console.log('error', err)
			// 	url = s3Data.Location;
			// 	resolve(Photo.create({ url: url }));
			// });
      resolve(Photo.create({ url: url }))

    })
			.then(photo => {
				photoDb = photo;
				console.log('signup photo', photo);
				let results = superagent.post(`https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=${url}`);
				return results;
			})
			.then(results => {
          console.log("signup req body", req.body)
          console.log('username lower', username);
        	return User.create({
					username: username,
					password: password,
					facetoken: results.body.faces[0].face_token,
					photo: photoDb
				});
      })
      .then(success => {
        if(success){
          console.log('success',success);
          let user = req.user;
  
          let payload = { userId: user._id };
          let token = jwt.sign(payload, process.env.SECRET);
          
          res.status(200).send(token);
        }
        else{
          res.status(403).send("Authentication Failure");
        } 
      })
      .catch(err => {
        console.log("error was thrown", err);
        // console.log('Error === ', err.response.body.error_message);
        // let msg = apiError(err.response.body);
        // console.log('msg === ',msg);
        // res.status(msg.status).send(msg.msg);
      });
  });



userRouter.route('/signin').post(upload.single('photo'), (req, res) => {
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
    console.log('sending user not found in auth middleware')
    res.send({msg:'user not found'});
    return;
  }
  return user.checkPassword(password);
})
.then(user =>{
let ext = path.extname(req.file.originalname);
let params = {
  ACL: 'public-read',
  Bucket: process.env.AWS_BUCKET,
  Key: `${req.file.filename}${ext}`,
  Body: fs.createReadStream(req.file.path)
};
let url;
return new Promise((resolve, reject) => {
  s3.upload(params, (err, s3Data) => {
    url = s3Data.Location;
    resolve(Photo.create({ url: url }));
  })
})
.then(() => {
      console.log('heyo');
      let url = req.headers.photo;
      let signedUser = req.user.facetoken;
      superagent.post(`https://api-us.faceplusplus.com/facepp/v3/compare?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url1=${url}&face_token2=${signedUser}`)
		.then(results => {
      console.log('match confidence', results.body.confidence);
      if(results.body.confidence > 95){
       return true;
      }
     return false;
    })
  })
		.then(success => {
      if(success){
        let user = req.user;

        let payload = { userId: user._id };
        let token = jwt.sign(payload, process.env.SECRET);
        
        res.status(200).send(token);
      }
      else{
        res.status(403).send("Authentication Failure");
      } 
		})
		.catch(err => {
      console.log("error was thrown", err);
			// console.log('Error === ', err.response.body.error_message);
			// let msg = apiError(err.response.body);
			// console.log('msg === ',msg);
			// res.status(msg.status).send(msg.msg);
		});
});
});

userRouter.route('/face/person')
	.get(bearerAuth, (req, res) => {
				res.status(200).send(req.user)
	})

	.put(bearerAuth, (req, res) => {
		let id = req.params.id;
		User.findByIdAndUpdate(id, req.body, {
			new: true
		})
			.then(user => res.status(204).send(user))
			.catch(err => res.status(400).send(err.message));
	})

	.delete(bearerAuth, (req, res) => {
    superagent.route('/user').delete(req, res)
      .then(user => {
        User.findByIdAndRemove(req.params.id)
			.then(user => {
				if (website.userId.toString() === req.user.id.toString()) {
					return user.remove();
				}
			})
			.then(() => res.status(200))
			.catch(err => res.status(500).send(err.message));
  });
});

module.exports = userRouter;