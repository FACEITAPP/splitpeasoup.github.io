
'use strict';

require('dotenv').config();

const express = require('express');
const superagent = require('superagent');
const User = require('../models/userSchema.js');
const Photo = require('../models/photoSchema.js');
const request = require('superagent');
require('dotenv').config(); 
const APP_KEY = process.env.FACEAPI_KEY;
const APP_SECRET = process.env.FACEAPI_SECRET;
const userRouter = new express.Router();
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
	.post(upload.single('photo'), (req, res) => { // if the upload doesn't return a photo send error
		let ext = path.extname(req.file.originalname);
		let params = {
			ACL: 'public-read',
			Bucket: process.env.AWS_BUCKET,
			Key: `${req.file.filename}${ext}`,
			Body: fs.createReadStream(req.file.path)
		};
		let url;
		let photoDb;
		new Promise((resolve, reject) => {
			s3.upload(params, (err, s3Data) => {
				url = s3Data.Location;
				resolve(Photo.create({ url: url }));
			});
		})
			.then(photo => {
				console.log(photo);
				photoDb = photo;
				let results = superagent.post(`https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=${url}`);
				return results;
			})
			.then(results => {
        	return User.create({
					username: req.body.username,
					password: req.body.password,
					facetoken: results.body.faces[0].face_token,
					photo: photoDb
				});
			})
			.then(user => {
				res.status(200).send(user);
			})
			.catch(err => {
				console.log('Error === ', err.response.body.error_message);
				let msg = apiError(err.response.body);
				console.log('msg === ',msg);
				res.status(msg.status).send(msg.msg);
			});
	});
  // need to add a compare API request after running a find User function in the database and supplying facetoken. 
userRouter.route('/signin').post(upload.single('photo'), (req, res) => { // if the upload doesn't return a photo send error
	let ext = path.extname(req.file.originalname);
	let params = {
		ACL: 'public-read',
		Bucket: process.env.AWS_BUCKET,
		Key: `${req.file.filename}${ext}`,
		Body: fs.createReadStream(req.file.path)
	};
	let url;
	let photoDb;
	new Promise((resolve, reject) => {
		s3.upload(params, (err, s3Data) => {
			url = s3Data.Location;
			resolve(Photo.create({ url: url }));
		});
	})
		.then(photo => {
			console.log(photo);
			photoDb = photo;
			let results = superagent.post(`https://api-us.faceplusplus.com/facepp/v3/detect?api_key=${APP_KEY}&api_secret=${APP_SECRET}&image_url=${url}`);
			return results;
		})
		.then(results => {
      let token = User.methods.checkpassword(req.body.password);
      User.token.push(token);
      User.save();
			return token;
		})
		.then(user => {
			res.status(200).send(user);
		})
		.catch(err => {
			console.log('Error === ', err.response.body.error_message);
			let msg = apiError(err.response.body);
			console.log('msg === ',msg);
			res.status(msg.status).send(msg.msg);
		});
});


userRouter.route('/face/:id')
	.get(bearerAuth, (req, res) => {
		if (req.params.id) {
			return User.findById(req.params.id)
				.then(user => res.status(200).send(user))
				.catch(err => res.status(400).send(err.message));
		}
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