'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');
const bearer= require('../lib/bearer-auth-middleware');

const authRouter = new express.Router();

authRouter.route('/signin')

	// .get((req, res) => {
	// 	User.find()
	// 		.then(user => res.status(200).send(user))
	// 		.catch(err => res.sendStatus(400).send(err));
  // })

	.get((req, res) => {
		console.log('signing in', req.body);
		let authHeader = req.get('Authorization');
		let payload = authHeader.split('Basic ')[1];
		let decoded = Buffer.from(payload, 'base64').toString();
		let [username, password] = decoded.split(':');
		console.log('auth info', username, password);

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
			}
			user.checkPassword(password)
				.then(token => {
          let savedToken = { 'savedToken': token};

        // Put the object into storage
        localStorage.setItem('savedToken', JSON.stringify(savedToken));
          res.send({token});// save token to local storage
        // var testObject = { 'one': 1, 'two': 2, 'three': 3 };

        // // Put the object into storage
        // localStorage.setItem('testObject', JSON.stringify(testObject));
				})
				.catch(err => res.status(401).send({msg:err.message}));
		});
	});

// authRouter.route('/panel')
// 	.get((req, res) => {
// 		if (!req.user) {
// 			res.status(404); 
// 			res.send('Not authorized');
// 			return;
//     }
    
// 		// let authHeader = req.get('Authorization');
// 		// if (!authHeader) {
// 		// 	res.status(401);
// 		// 	res.send('Please provide a username/password');
// 		// 	return;
// 		// }
// 		// let payload = authHeader.split('Basic ')[1];
// 		// let decoded = Buffer.from(payload, 'base64')
// 		// 	.toString();
// 		// let [username, password] = decoded.split(':');

// 		// User.findOne({username: username})
// 		// 	.then(user => {
// 		// 		if (user === null) {
// 		// 			res.send('user not found');
// 		// 		}
// 		// 		user.checkPassword(password)
// 		// 			.then(token => {
// 		// 				res.send(token);
// 		// 			})
// 		// 			.catch(err => res.status(401).send(err.message));
//     // 	});
  
// 	});

module.exports = authRouter;