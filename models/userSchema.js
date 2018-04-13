
'use strict';

const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken'); 

mongoose.connect(process.env.MONGODB_URI);

const Schema = mongoose.Schema;

const userSchema = Schema({
	username: {
		type: String,
		required: true,
		unique: true
	},
	password: {
		type: String,
		required: true
	},
	photo: { 
		type: Schema.Types.ObjectId,
		ref: 'Photo'
	},
	facetoken: {
		type: String
  }

});

userSchema.pre('save', function (next) {
	let user = this;
	if (user.isNew) {
		bcrypt.hash(user.password, 10, (err, hash) => {
			if (err) return next(err);
			user.password = hash;
			user.passwordHash = hash;
			next();
		});
	} else {
		console.log('user is not new!')
		next();
	}
});

userSchema.methods.checkPassword = function (password) {
	let user = this;
	return new Promise((resolve, reject) => {
		bcrypt.compare(password, user.password, (err, valid) => {
			if (err) {
				console.log('error', err);
				reject(err);
			}
			if (!valid) {
				console.log('not valid', err);
				reject(err);
			}
			let payload = { userId: user.id };
			let token = jwt.sign(payload, process.env.SECRET);
			resolve(token);
    });
  });
  console.log(token);
  return token;
};

const User = mongoose.model('User', userSchema);

module.exports = User;
