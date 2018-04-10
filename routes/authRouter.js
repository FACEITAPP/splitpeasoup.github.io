'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');

const authRouter = new express.Router();

authRouter.route('/signin')

	// .get((req, res) => {
	// 	User.find()
	// 		.then(user => res.status(200).send(user))
	// 		.catch(err => res.sendStatus(400).send(err));
	// })

	.post((req, res) => {
		if (!req.body.username || !req.body.password) {
			res.status(400);
			res.send('username and password required to create an account');
			return;
		}
		new User(req.body)
			.save()
			.then(users => res.status(200).send(users))
			.catch(err => res.status(400).send(err.message));
      
	});

authRouter.route('/panel')
	.get((req, res) => {
		if (!req.user) {
			res.status(404); 
			res.send('Not authorized');
			return;
		}

		let authHeader = req.get('Authorization');
		if (!authHeader) {
			res.status(401);
			res.send('Please provide a username/password');
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
				}
				user.checkPassword(password)
					.then(token => {
						res.send(token);
					})
					.catch(err => res.status(401).send(err.message));
			});
	});

module.exports = authRouter;