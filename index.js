'use strict';
require('dotenv').config();

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const userRouter = require('./routes/userRouter.js');
const authRouter = require('./routes/authRouter.js');

mongoose.connect(process.env.MONGODB_URI);

const app = express();

app.use(express.static('lib'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
	extended: true
}));

app.use('/api', userRouter);
app.use('/api', authRouter);

<<<<<<< HEAD
=======
app.get('/', (req, res) => {
	return res.sendStatus(200);
});
>>>>>>> a578d66bd83c01346b72a5fe9a2d0052bdb5f963

const PORT = process.env.PORT;

app.listen(PORT, () => {
	console.log(`listening on ${PORT}`);
});