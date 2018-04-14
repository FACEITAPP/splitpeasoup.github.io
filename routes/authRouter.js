'use strict';

const express = require('express');
const bcrypt = require('bcrypt');
const User = require('../models/userSchema.js');
const jwt = require('jsonwebtoken');
const basicAuth = require('../lib/basic-auth-middleware');
const bearerAuth = require('../lib/bearer-auth-middleware');

const authRouter = new express.Router();

authRouter.route('/signin')

	.get(basicAuth, (req, res) => {
		let user = req.user;
		let payload = { userId: user._id };
		let token = jwt.sign(payload, process.env.SECRET);

    res.send({token}); // save token to local storage
  });

authRouter.route('/panel')
	.get(bearerAuth, (req, res) => {
		if (!req.user) {
			res.status(404); 
			res.send('Not authorized');
			return;
    }
		res.status(200).send({msg:'token works!'});
});

module.exports = authRouter;